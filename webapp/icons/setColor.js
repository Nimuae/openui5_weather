var fs = require("fs");

console.log("Change SVG Color");
var defaultColor = "black";

function changeFile(fileName, newColor){
	if(!newColor){
		newColor = defaultColor;
	}
	var content = fs.readFileSync(fileName, { encoding: "utf8" });
	content = content.replace(/fill\:[^\;]*;/gi, "fill: " + newColor + ";");

	fs.writeFileSync(fileName, content, "utf8");
}

var color = process.argv.indexOf("-c") !== -1 ? process.argv[process.argv.indexOf("-c") + 1] : null;
var dir = process.argv.indexOf("-d") !== -1 ? process.argv[process.argv.indexOf("-d") + 1] : null;
var file = process.argv.indexOf("-f") !== -1 ? process.argv[process.argv.indexOf("-f") + 1] : null;

if(!color){
	console.log("No new color chosen. Continuing with \"" + defaultColor + "\"...");
}

if(dir){
	var aFiles = fs.readdirSync(dir);
	for(var i = 0; i < aFiles.length; i++){
		if(fs.statSync(dir + "/" + aFiles[i]).isFile()){
			changeFile(dir + "/" + aFiles[i], color);
		}
	}
	process.exit(0);
}

if(file){
	changeFile(file, color);
	process.exit(0);
}