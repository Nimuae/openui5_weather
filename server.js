/* @author Dominic Holzwarth */

var express = require("express");

var Service = require("./service.js");
var service = new Service();

//check for debug switch:
DEBUG = process.argv.indexOf("debug") >= 0;

var app = express();

var router = express.Router();

service.setup(router, DEBUG);
//add router to app as middleware for data requests
app.use(router);
//add static webapp-Folder to app as middleware
app.use("/", express.static(__dirname + "/webapp"));

var server = app.listen(3000, function(){
	var port = server.address().port;
	
	console.log('Server listening on port %s', port);
});