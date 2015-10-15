var express = require("express");
var http = require("http");
var fs = require("fs");
var path = require("path");

//type: forecast,conditions|options: lang:DL
//http://api.wunderground.com/api/{API}/{type}/{options}/q/Germany/Wiesloch.json
//http://localhost:3000/conditions.json?api={API}&type={type}
SERVICE_URL = "http://api.wunderground.com/api/{API}/{type}/{options}/q/Germany/Wiesloch.json";
API = "19420d53f811294e";
DATA = {
	conditions: {},
	forecast: {}
};
LOGS = "log";
HISTORY = "history";

var app = express();
var router = express.Router();

//create routes for retrieval of stored data
router.get("/data/conditions", function(req, res, next){
	res.send(DATA.conditions);
});
router.get("/data/forecast", function(req, res, next){
	res.send(DATA.forecast);
});

//add static webapp-Folder to app as middleware
app.use(express.static("webapp"));
//add router to app as middleware
app.use(router);

var server = app.listen(3000, function(){
	var port = server.address().port;

	getWeatherData("conditions");
	getWeatherData("forecast");
	console.log('Server listening on port %s', port);
});

function getWeatherData(type, options){
	var reqURI = buildRequestURI(type, options || {});
	http.get(reqURI, function(res){

		//set encoding and read data from body
		res.setEncoding('utf8');
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function (chunk) {
			DATA[type] = JSON.parse(data);
			log(
				(new Date().toUTCString()) + "\n" +
				data +
				"\n---------------------------------------\n\n",
				"history.log"
			);
		});

	}).on("error", function(e){
		var d = new Date().toUTCString();
		
		console.error("[" + d + "] " + e.code + ": " + e.hostname);
		log("[" + d + "] " + e.code + ": " + e.hostname);
	});
}

function buildRequestURI(type, options){
	var sOptions = "lang:DL";
	var uri = SERVICE_URL.replace("{type}", type).replace("{API}", API).replace("{options}", sOptions);

	return uri;
}

function log(msg, file){
	if(!fs.existsSync(LOGS)){
		fs.mkdirSync(LOGS);
	}
	file = file || "server.log";

	fs.appendFileSync(LOGS + path.sep + file, msg + "\n", function (err) {
		if(err){
			console.error(err);
		}
	});
}

//persist current data!

//set an interval to update weather data from the web service and store it
var intv = 1000 * 60 * 30; //update every 30 minutes
setInterval(function(){
	var d = new Date().toUTCString();

	var msg = "[" + d + "] Fetching weather data from Service...";
	console.log(msg);
	log(msg);
	getWeatherData("conditions");
	getWeatherData("forecast");
}, intv);