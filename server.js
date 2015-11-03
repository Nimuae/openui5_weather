var express = require("express");
var http = require("http");
var fs = require("fs");
var path = require("path");
var randomizer = require("./randomizer.js");

SERVICE_URL = "http://localhost:3000/request.json?api={API}";
//SERVICE_URL = "http://api.wunderground.com/api/{API}/{options}/conditions/forecast/q/Germany/Wiesloch.json";
API = "19420d53f811294e";
DATA = {};
LOGS = __dirname + "/log";
HISTORY = __dirname + "/history";
DATA_DIR = __dirname + "/data";

var app = express();
var router = express.Router();

console.log("Sending Requests to \"" + buildRequestURI("conditions") + "\"");

//create routes for retrieval of stored data
router.get("/service", function(req, res, next){
	res.send(DATA);
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


function getWeatherData(options){
	var reqURI = buildRequestURI(options || {});
	//log(reqURI);
	//console.log(reqURI);
	http.get(reqURI, function(res){

		//set encoding and read data from body
		res.setEncoding('utf8');
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on('end', function (chunk) {
			try{
				DATA = JSON.parse(data, DEBUG ? randomizer : function(k, v) { return v; });
				log("\n" +
					JSON.stringify(DATA) +
					"\n---------------------------------------\n\n",
					"history.log"
				);
			}catch(e){
				console.error(e);
				log(e);
			}
		});

	}).on("error", function(e){
		var d = new Date().toUTCString();
		
		console.error("[" + d + "] " + e.code + ": " + e.hostname);
		log(e.code + ": " + e.hostname);
	});
}

function buildRequestURI(options){
	var sOptions = "lang:DL";
	var uri = SERVICE_URL.replace("{API}", API).replace("{options}", sOptions);

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

//persist current data!
function saveCurrentData(){
	var file = "requests.json";

	if(!fs.existsSync(DATA_DIR)){
		fs.mkdirSync(DATA_DIR);
	}

	fs.writeFileSync(DATA_DIR + path.sep + file, JSON.stringify(DATA));
}

function loadData(){
	var file = "requests.json";

	var d = fs.readFileSync(DATA_DIR + path.sep + file, { encoding: "utf8" });
	if(d){
		DATA = JSON.parse(d);
	}
}

//set an interval to update weather data from the web service and store it
var intv = 1000 * 60 * 30; //update every 30 minutes
//check for debug switch:
DEBUG = process.argv.indexOf("debug") >= 0;
setInterval(function(){
	var msg = "Fetching weather data from Service...";
	console.log(msg);
	log(msg);
	getWeatherData("conditions");
	getWeatherData("forecast");
}, DEBUG ? 2000 : intv);