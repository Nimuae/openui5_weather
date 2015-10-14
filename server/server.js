var express = require("express");
var http = require("http");

//type: forecast,conditions|options: lang:DL
//http://api.wunderground.com/api/{API}/{type}/{options}/q/Germany/Wiesloch.json
SERVICE_URL = "http://localhost/git/openui5_weather/webapp/conditions.json?api={API}&type={type}";
API = "19420d53f811294e";
DATA = {
	conditions: {},
	forecast: {}
};

var app = express();
var router = express.Router();

router.get("/conditions", function(req, res, next){
	//res.send("Giving you all the conditions, baby.");
	res.send(DATA.conditions);
});
router.get("/forecast", function(req, res, next){
	//res.send("Giving you a thorough forecast, sweetheart.");
	res.send(DATA.forecast);
});

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
		});

	}).on("error", function(e){
		console.error(e);
	});
}

function buildRequestURI(type, options){
	var sOptions = "lang:DL";
	var uri = SERVICE_URL.replace("{type}", type).replace("{API}", API).replace("{options}", sOptions);

	return uri;
}

//set an interval to update weather data from the web service and store it
var intv = 1000 * 60 * 60; //update every hour
setInterval(function(){
	console.log("Hello!");
}, intv);