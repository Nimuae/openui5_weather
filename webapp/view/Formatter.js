/* @author Dominic Holzwarth, Max Krupp, Tanja Weiser */

jQuery.sap.includeScript("./resources/jquery-ui/jquery-ui.js");

jQuery.sap.declare("hss.weather.view.Formatter");

hss.weather.view.Formatter = {
	
	/**
	 * Object for mapping German direction names with technical names
	 * @type {Object}
	 */
	dirMap: {
		"nord": "north",
		"ost": "east",
		"süd": "south",
		"west": "west",
		"südost": "south-east",
		"südwest": "south-west",
		"nordost": "north-east",
		"nordwest": "north-west",
		"nord-nordost": "north",
		"süd-südwest": "south",
		"nord-nordwest": "north",
		"süd-südost": "south",
		"ost-nordost": "east",
		"ost-südost": "east",
		"west-nordwest": "west",
		"west-südwest": "west"
	},

	/**
	 * Object for mapping technical weather icon names from the requests with file name numbers
	 * @type {Object}
	 */
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
	
	/**
	 * Formatter for weather icons
	 * @param {String} weather Weather icon string from requests
	 * @return {String} Returns the corresponding icon file
	 */
	WeatherIcon: function(weather){
		if(!weather){
			return "";
		}
		
		var imagePath = "./icons/SVG/sw-" + hss.weather.view.Formatter.iconMap[weather.toLowerCase()];
		return imagePath + ".svg";
	},
	
	/**
	 * Formatter for temperatures
	 * @param {Float} temp Temperature number from requests
	 * @return {Int} Rounded temperature
	 */
	RoundTemp: function(temp){
		if(!temp){
			return "";
		}
		return Math.round(Number(temp));
	},

	// animateLabel: function(){
	// 	var $elements = this.$().find("span label").andSelf();
	// 	var color = this.$().css("color");
	// 	$elements.animate({
	// 		color: "#007cc0"
	// 	}, 100, "swing").animate({
	// 		color: color
	// 	}, 400, "swing");

	// 	return true;
	// },
	
	/**
	 * Formatter for Compass' wind direction, angle has to be turned by 180°
	 * Needed because requests return the source direction, a compass shows the direction the wind blows in
	 * @param {Int} deg The inverted wind direction
	 */
	InvertWindDir: function(deg){
		if(typeof deg === "undefined" || Number.isNaN(deg)){
			return 0;
		}

		var a = (deg + 180);
		return parseInt((a >= 360) ? a - 360 : a, 10);
	},

	/**
	 * Formatter for PrecipText to check whether relative humidity is visible
	 * @param {Boolean} showHumidity From data model: is humidity visible?
	 * @return {Boolean} Always returns true, bcause it's employed as a formatter for the 'visible' property
	 */
	PrecipTextStyle: function(showHumidity){
		if(showHumidity){
			this.removeStyleClass("HumidityHidden");
		}else{
			this.addStyleClass("HumidityHidden");
		}

		return true;
	},

	/**
	 * @param {int} t Timestamp to be converted to format HH:mm
	 */
	MakeTimeFromInterval: function(t){
		var h = Math.floor(t / (60 * 60 * 1000));
		var m = Math.floor((t - (h * (60 * 60 * 1000))) / (60 * 1000));

		function padDateNumber(num){
		    if(num < 10){
		        return "0" + num;
		    }
		    return String(num);
		}

		return padDateNumber(h) + ":" + padDateNumber(m);
	},

	/**
	 * Make overlay from current weather icon
	 * @param {String} icon The icon retrieved from the service
	 */
	RainometerOverlay: function(icon){
		if(!icon){
			return "";
		}
		var snow_icons = [
			"chanceflurries", "flurries", "chancesnow", "snow",
			"nt_chanceflurries", "nt_flurries", "nt_chancesnow", "nt_snow"
		];
		var overlay = "icons/raindrop.svg";
		if(snow_icons.indexOf(icon) !== -1){
			overlay = "icons/snowflake.svg";
		}
		return overlay;
	},

	/**
	 * Get highest value from all the function's arguments and fall back to 100
	 * @param {...Number} num A list of numbers of which the highest one is to be retrieved
	 */
	MaxPrecipValueMM: function(){
		var iMax = Math.max.apply(null, arguments);
		return Number.isNaN(iMax) ? 100 : Math.max(100, iMax);
	}
};
