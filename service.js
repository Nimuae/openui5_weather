var fs = require("fs");
var path = require("path");
var http = require("http");

var Randomizer = require("./randomizer.js");
var randomizer = new Randomizer();

/**
 * Create a new function that can be instantiated and that holds all necessary functions for the web
 * service for the weather app to work
 * @return {void} Nothing
 */
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

	/**
	 * Set up all routes for requests
	 * @param  {express.Router} router The router all routes are to be added to
	 * @param  {Boolean} bDbg   Determines whether the server is in debug mode or not, done by adding the option "debug" to the command-line
	 * @return {void}        Nothing
	 */
	self.setup = function(router, bDbg){
		self.setDebug(bDbg);
		self.log("Sending Requests to \"" + self.buildRequestURI() + "\"");

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
				interval: settings.interval || 30 * 60 * 1000
			});
		});
		router.post("/service/settings", require("body-parser").json(), function(req, res, next){
			if(req.query.test){
				res.send({});
				return;
			}

			var cityOld = self.readSettings().city;
			var settings = {
				city: req.body.city,
				temp_unit: req.body.temp_unit,
				show_forecast: req.body.show_forecast,
				show_precip: req.body.show_precip,
				show_humidity: req.body.show_humidity,
				interval: req.body.interval
			};
			
			self.writeSettings(settings);

			//did the city name change?
			if(cityOld !== req.body.city){
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
		var settings = self.readSettings();

		self.oInterval = setInterval(function(){
			self.getWeatherData(null, function(d){
				self.DATA = d;
			});
		}, settings.interval || 1000 * 60 * 30);

		self.getWeatherData(null, function(d){
			self.DATA = d;
		});
	};

	/**
	 * Set DEBUG switch for the service
	 * @param {Boolean} dbg A variable determining the debug state of the service
	 */
	self.setDebug = function(dbg){
		self.DEBUG = !!dbg;
	};

	/**
	 * Perform an HTTP-Request to the webservice and save retrieved data or pass it to a callback function
	 * @param  {Object}   options       Some request options, e.g. response language
	 * @param  {Function} callback      A success callback
	 * @param  {Function}   errorCallback An error callback
	 * @return {void}                 Nothing
	 */
	self.getWeatherData = function(options, callback, errorCallback){
		var reqURI = self.buildRequestURI(options || {});

		self.log("[" + (new Date().toUTCString()) + "] Fetching weather data from \"" + reqURI + "\"");

		http.get(reqURI, function(res){

			//set encoding and read data from body
			res.setEncoding('utf8');
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on('end', function () {
				try{
					randomizer = new Randomizer();
					var d = JSON.parse(data, self.DEBUG ? randomizer.randomize : function(k, v) { return v; });
					if(callback){
						callback(d);
					}
				}catch(e){
					self.log(e);
					if(errorCallback){
						errorCallback(e);
					}
				}
			});

		}).on("error", function(e){
			var d = new Date().toUTCString();

			self.log(e.code + ": " + e.hostname);

			if(errorCallback){
				errorCallback(e);
			}
		});
	};

	/**
	 * Build the URI for the request inserting options and city for placeholders
	 * @param  {Object} options An options object containing a key-value-mapping of options
	 * @return {String}         The resulting URI depending on DEBUG switch
	 */
	self.buildRequestURI = function(options){
		var sOptions = "lang:DL";
		var city = self.readSettings().city || "Wiesloch";

		var uri = self.SERVICE_URL;
		
		//special case for best data for Wiesloch
		if(city === "Wiesloch"){
			uri = "http://api.wunderground.com/api/{API}/{options}/conditions/forecast/q/pws:IWIESLOC4.json";
		}

		if(self.DEBUG){
			uri = self.DEBUG_SERVICE_URL;
		}

		uri = uri.replace("{API}", self.API).replace("{city}", city).replace("{options}", sOptions);

		return uri;
	};

	/**
	 * Log and output to console with current datetime prepended
	 * @param  {String} msg  The message to be logged
	 * @param  {String} file An optional file name
	 * @return {void}      Nothing
	 */
	self.log = function(msg, file){
		if(!fs.existsSync(self.LOGS)){
			fs.mkdirSync(self.LOGS);
		}
		file = file || "server.log";

		var d = new Date().toUTCString();
		fs.appendFileSync(self.LOGS + path.sep + file, "[" + d + "] " + msg + "\n");
		console.log(msg);
	};

	/**
	 * Read settings from file system
	 * @return {Object} An object containing key-value-pairs for settings
	 */
	self.readSettings = function(){
		var settings;
		try{
			settings = JSON.parse(fs.readFileSync(self.SETTINGS_FILE, { encoding: "utf-8" }) || "{}");
		}catch(e){
			settings = {
				show_forecast: true,
				show_precip: true,
				show_humidity: true
			};
		}

		return {
			city: settings.city || "Wiesloch",
			temp_unit: settings.temp_unit || "C",
			show_forecast: settings.show_forecast,
			show_precip: settings.show_precip,
			show_humidity: settings.show_humidity,
			interval: settings.interval || 1000 * 60 * 30
		};
	};

	/**
	 * Write Settings to file system setting default values
	 * @param  {Object} o The settings to be written
	 * @return {void}   Nothing
	 */
	self.writeSettings = function(o){
		var settings;
		if(!o){
			settings = {
				city: "Wiesloch",
				temp_unit: "C",
				show_forecast: true,
				show_precip: true,
				show_humidity: true,
				interval: 1000 * 60 * 30
			};
		}else{
			settings = {
				city: o.city || "Wiesloch",
				temp_unit: o.temp_unit || "C",
				show_forecast: o.show_forecast,
				show_precip: o.show_precip,
				show_humidity: o.show_humidity,
				interval: o.interval || 1000 * 60 * 30
			};
		}

		clearInterval(self.oInterval);
		self.oInterval = setInterval(function(){
			self.getWeatherData(null, function(d){
				self.DATA = d;
			});
		}, settings.interval);

		fs.writeFileSync(self.SETTINGS_FILE, JSON.stringify(settings));
	};
};