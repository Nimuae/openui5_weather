var express = require("express");

API = "19420d53f811294e";

var app = express();
var router = express.Router();

router.get("/conditions", function(req, res, next){
	res.send("Giving you all the conditions, baby.");
});
router.get("/forecast", function(req, res, next){
	res.send("Giving you a thorough forecast, sweetheart.");
});

app.use(router);

var server = app.listen(3000, function(){
	var port = server.address().port;

	console.log('Server listening on port %s', port);
});


//set an interval to update weather data from the web service and store it
var intv = 1000 * 60 * 60; //update every hour
setInterval(function(){
	console.log("Hello!");
}, intv);