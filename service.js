var fs = require("fs");
var path = require("path");
var http = require("http");

var Randomizer = require("./randomizer.js");
var randomizer = new Randomizer();

module.exports = function(){
	var self = this;

	self.SERVICE_URL = "http://api.wunderground.com/api/{API}/{options}/conditions/forecast/q/Germany/{city}.json";
	self.DEBUG_SERVICE_URL = "http://localhost:3000/test/request.json?api={API}&city={city}";

	self.API = "19420d53f811294e";
	self.DATA = undefined;
	self.LOGS = __dirname + "/log";
	self.HISTORY = __dirname + "/history";
	self.DATA_DIR = __dirname + "/data";
	self.SETTINGS_FILE = self.DATA_DIR + "/settings.json";

	self.DEBUG = false;
	self.oInterval = undefined;

	self.setData = function(data){
		self.DATA = data;
	};

	self.setup = function(router, bDbg){
		self.setDebug(bDbg);
		console.log("Sending Requests to \"" + self.buildRequestURI() + "\"");

		router.get("/service", function(req, res, next){
			if(req.query.debug && req.query.noData){
				res.send({ errorMessage: "Keine Daten vorhanden." });
				return;
			}

			if(!self.DATA){
				res.status(500).send({ errorMessage: "Keine Daten vorhanden." });
			}else{
				res.send(self.DATA);
			}
		});

		router.get("/service/settings", function(req, res, next){
			var settings = self.readSettings();

			res.send({
				city: settings.city || "Wiesloch",
				temp_unit: settings.temp_unit || "C",
				show_forecast: !!settings.show_forecast,
				show_precip: !!settings.show_precip,
				show_humidity: !!settings.show_humidity,
				interval: settings.interval || 0
			});
		});
		router.post("/service/settings", require("body-parser").json(), function(req, res, next){
			var settings = self.readSettings();

			self.writeSettings({
				city: req.body.city,
				temp_unit: req.body.temp_unit,
				show_forecast: req.body.show_forecast,
				show_precip: req.body.show_precip,
				show_humidity: req.body.show_humidity,
				interval: req.body.interval
			});

			//did the city name change?
			if((settings.city || "Wiesloch") !== (req.body.city || "Wiesloch")){
				self.getWeatherData(null, function(d){
					DATA = d;
					res.send({ city: true });
				}, function(e){
					res.status(404).send({
						errorMessage: "Stadt wurde nicht gefunden."
					});
				});
			}else{
				res.send({});
			}
		});

		//set an interval to update weather data from the web service and store it
		INTERVAL = (process.argv.indexOf("-i") !== -1) ? parseInt(process.argv[process.argv.indexOf("-i") + 1], 10) : 2000;
		var settings = self.readSettings();

		self.oInterval = setInterval(function(){
			self.getWeatherData(null, function(d){
				self.DATA = d;
			});
		}, DEBUG ? INTERVAL : (settings ? settings.interval || 1000 * 60 * 30 : 1000 * 60 * 30));

		self.getWeatherData(null, function(d){
			self.DATA = d;
		});
	};

	self.setDebug = function(dbg){
		self.DEBUG = !!dbg;
	};

	self.getWeatherData = function(options, callback, errorCallback){
		var reqURI = self.buildRequestURI(options || {});

		var msg = "[" + (new Date().toUTCString()) + "] Fetching weather data from \"" + reqURI + "\"";
		console.log(msg);
		self.log(msg);

		http.get(reqURI, function(res){

			//set encoding and read data from body
			res.setEncoding('utf8');
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				console.log("Received all data.");
				try{
					randomizer = new Randomizer();
					var d = JSON.parse(data, DEBUG ? randomizer.randomize : function(k, v) { return v; });
					if(callback){
						callback(d);
					}
				}catch(e){
					console.error("Error", e);
					self.log(e);
					if(errorCallback){
						errorCallback(e);
					}
				}
			});

		}).on("error", function(e){
			var d = new Date().toUTCString();
			
			console.error("[" + d + "] " + e.code + ": ", e);
			self.log(e.code + ": " + e.hostname);

			if(errorCallback){
				errorCallback(e);
			}
		});
	};

	self.buildRequestURI = function(options){
		var sOptions = "lang:DL";
		var city = self.readSettings().city || "Wiesloch";

		var uri = self.SERVICE_URL;

		if(self.DEBUG){
			uri = self.DEBUG_SERVICE_URL;
		}

		uri = uri.replace("{API}", self.API).replace("{city}", city).replace("{options}", sOptions);

		return uri;
	};

	self.log = function(msg, file){
		if(!fs.existsSync(self.LOGS)){
			fs.mkdirSync(self.LOGS);
		}
		file = file || "server.log";

		var d = new Date().toUTCString();
		fs.appendFileSync(self.LOGS + path.sep + file, "[" + d + "] " + msg + "\n");
	};

	self.readSettings = function(){
		if(!fs.existsSync(self.SETTINGS_FILE)){
			return {};
		}
		return JSON.parse(fs.readFileSync(self.SETTINGS_FILE, { encoding: "utf-8" }) || "{}");
	};

	self.writeSettings = function(o){
		clearInterval(self.oInterval);
		self.oInterval = setInterval(function(){
			self.getWeatherData();
		}, DEBUG ? INTERVAL : (o ? o.interval || 1000 * 60 * 30 : 1000 * 60 * 30));

		fs.writeFileSync(self.SETTINGS_FILE, JSON.stringify(o));
	};
};