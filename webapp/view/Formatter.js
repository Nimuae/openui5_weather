jQuery.sap.declare("hss.weather.view.Formatter");

hss.weather.view.Formatter = {
	dirMap: {
		"N": "north",
		"E": "east",
		"S": "south",
		"W": "west"
	},
	dirMapGerman: {
		"N": "Nord",
		"E": "Ost",
		"S": "Süd",
		"W": "West"
	},

	windDir: function(dir){
		if(!dir){
			return "";
		}
		
		var imagePath = "./icons/weather/";

		var parts = dir.split("");
		var primary = parts[0];
		var secondary = parts[1] || "";

		var image = hss.weather.view.Formatter.dirMap[primary] + (secondary ? "-" + hss.weather.view.Formatter.dirMap[secondary] : "");
		return imagePath + image + ".svg";
	},

	windDirString: function(dir){
		if(!dir){
			return "";
		}

		var parts = dir.split("");
		var primary = parts[0];
		var secondary = parts[1] || "";

		return hss.weather.view.Formatter.dirMapGerman[primary] + (secondary ? "-" + hss.weather.view.Formatter.dirMapGerman[secondary] : "");
	}
};