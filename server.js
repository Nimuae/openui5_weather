var express = require("express");
var http = require("http");
var fs = require("fs");
var path = require("path");

var Randomizer = require("./randomizer.js");
var randomizer = new Randomizer();

//check for debug switch:
DEBUG = process.argv.indexOf("debug") >= 0;
if(DEBUG){
	SERVICE_URL = "http://localhost:3000/test/request.json?api={API}&city={city}";
}else{
	SERVICE_URL = "http://api.wunderground.com/api/{API}/{options}/conditions/forecast/q/Germany/{city}.json";
}
TESTDATA_URL = "http://localhost:3000/test/request.json";

API = "19420d53f811294e";
DATA = undefined;
LOGS = __dirname + "/log";
HISTORY = __dirname + "/history";
DATA_DIR = __dirname + "/data";
SETTINGS_FILE = DATA_DIR + "/settings.json";

var app = express();

var router = express.Router();

console.log("Sending Requests to \"" + buildRequestURI() + "\"");

//create routes for retrieval of stored data
router.get("/service", function(req, res, next){
	if(req.query.debug && req.query.noData){
		res.send({ errorMessage: "Keine Daten vorhanden." });
		return;
	}

	if(!DATA){
		res.status(500).send({ errorMessage: "Keine Daten vorhanden." });
	}else{
		res.send(DATA);
	}
});
router.get("/service/settings", function(req, res, next){
	var settings = readSettings();

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
	var settings = readSettings();


	writeSettings({
		city: req.body.city,
		temp_unit: req.body.temp_unit,
		show_forecast: req.body.show_forecast,
		show_precip: req.body.show_precip,
		show_humidity: req.body.show_humidity,
		interval: req.body.interval
	});

	//did the city name change?
	if((settings.city || "Wiesloch") !== (req.body.city || "Wiesloch")){
		getWeatherData(null, function(d){
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

//add router to app as middleware for data requests
app.use(router);
//add static webapp-Folder to app as middleware
app.use("/", express.static(__dirname + "/webapp"));

var server = app.listen(3000, function(){
	var port = server.address().port;

	getWeatherData();
	console.log('Server listening on port %s', port);
});


function getWeatherData(options, callback, errorCallback){
	var reqURI = buildRequestURI(options || {});

	var msg = "[" + (new Date().toUTCString()) + "] Fetching weather data from \"" + reqURI + "\"";
	console.log(msg);
	log(msg);

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
				log(e);
				if(errorCallback){
					errorCallback(e);
				}
			}
		});

	}).on("error", function(e){
		var d = new Date().toUTCString();
		
		console.error("[" + d + "] " + e.code + ": ", e);
		log(e.code + ": " + e.hostname);

		if(errorCallback){
			errorCallback(e);
		}
	});
}

function buildRequestURI(options){
	var sOptions = "lang:DL";
	var city = readSettings().city || "Wiesloch";
	var uri = SERVICE_URL.replace("{API}", API).replace("{city}", city).replace("{options}", sOptions);

	return uri;
}

function log(msg, file){
	if(!fs.existsSync(LOGS)){
		fs.mkdirSync(LOGS);
	}
	file = file || "server.log";

	var d = new Date().toUTCString();
	fs.appendFileSync(LOGS + path.sep + file, "[" + d + "] " + msg + "\n");
}

function readSettings(){
	if(!fs.existsSync(SETTINGS_FILE)){
		return {};
	}
	return JSON.parse(fs.readFileSync(SETTINGS_FILE, { encoding: "utf-8" }) || "{}");
}

function writeSettings(o){
	clearInterval(oInterval);
	oInterval = setInterval(function(){
		getWeatherData();
	}, DEBUG ? INTERVAL : (o ? o.interval || 1000 * 60 * 30 : 1000 * 60 * 30));

	fs.writeFileSync(SETTINGS_FILE, JSON.stringify(o));
}

//set an interval to update weather data from the web service and store it
INTERVAL = (process.argv.indexOf("-i") !== -1) ? parseInt(process.argv[process.argv.indexOf("-i") + 1], 10) : 2000; //take argument or update every 30 minutes
console.log("Updating every", INTERVAL, "ms", "(DEBUG)", DEBUG);
var settings = readSettings();

var oInterval = setInterval(function(){
	getWeatherData(null, function(d){
		DATA = d;
	});
}, DEBUG ? INTERVAL : (settings ? settings.interval || 1000 * 60 * 30 : 1000 * 60 * 30));