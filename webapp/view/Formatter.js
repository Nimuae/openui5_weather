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
	iconMap: {
		"chanceflurries": "24",
		"chancerain": "21",
		"chancesleet": "21",
		"chancesnow": "25",
		"chancetstorms": "27",
		"clear": "01",
		"cloudy": "04",
		"flurries": "24",
		"fog": "09",
		"hazy": "08",
		"mostlycloudy": "03",
		"mostlysunny": "03",
		"partlycloudy": "03",
		"partlysunny": "03",
		"sleet": "21",
		"rain": "23",
		"snow": "25",
		"sunny": "01",
		"tstorms": "27",
		"nt_chanceflurries": "34",
		"nt_flurries": "34",
		"nt_chancesnow": "35",
		"nt_snow": "35",
		"nt_chancerain": "33",
		"nt_rain": "31",
		"nt_chancesleet": "31",
		"nt_sleet": "31",
		"nt_chancetstorms": "37",
		"nt_tstorms": "37",
		"nt_clear": "02",
		"nt_sunny": "02",
		"nt_cloudy": "07",
		"nt_fog": "10",
		"nt_hazy": "07",
		"nt_mostlycloudy": "07",
		"nt_partlycloudy": "07",
		"nt_mostlysunny": "07",
		"nt_partlysunny": "07"	
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
	},
	
	image: function(weather){
		if(!weather){
			return "";
		}
		
		var imagePath = "./icons/SVG/sw-" + hss.weather.view.Formatter.iconMap[weather.toLowerCase()];
		return imagePath + ".svg";
	},
	
	roundTemp: function(temp){
		if(!temp){
			return "";
		}
		return Math.round(Number(temp));
	}
};