var fields = {
	"temp_c": [-20.0, 40.0], //between -20 and 40
	"relative_humidity": {
		range: [0, 99],
		suffix: "%"
	},
	"wind_dir": {
		select: [
			"Nord", "Nord-Nordost", "Nordost", "Ost-Nordost", "Ost",
			"Ost-Südost", "Südost", "Süd-Südost", "Süd",
			"Süd-Südwest", "Südwest", "Südwest-West", "West",
			"West-Nordwest", "Nordwest", "Nord-Nordwest"
		]
	},
	"icon": {
		select: [
			"chanceflurries", "chancerain",
			"chancesleet", "chancesnow",
			"chancetstorms", "clear", "cloudy",
			"flurries", "fog",
			"hazy", "mostlycloudy", "mostlysunny",
			"partlycloudy", "partlysunny",
			"sleet", "rain", "snow",
			"sunny", "tstorms",
			"nt_chanceflurries", "nt_flurries", "nt_chancesnow",
			"nt_snow", "nt_chancerain",
			"nt_rain", "nt_chancesleet", "nt_sleet",
			"nt_chancetstorms", "nt_tstorms",
			"nt_clear", "nt_sunny", "nt_cloudy",
			"nt_fog", "nt_hazy",
			"nt_mostlycloudy", "nt_partlycloudy",
			"nt_mostlysunny", "nt_partlysunny"
		]
	},
	"wind_kph": [0, 15],
	"feelslike_c": [-30, 50],
	"precip_today_metric": [0, 100],
	"celsius": [-20.0, 40.0]
};

var rand = function(min, max) {
	if (!max) {
		max = min;
		min = 0;
	}
	return min + Math.floor((max - min) * Math.random());
};

var __evaluate = function(o) {
	if (!o) {
		return;
	}

	if (o.length === 2) { //contains two boundaries
		return rand(o[0], o[1]);
	} else { //expect an object
		var range = o.range;
		var select = o.select;
		var prefix = o.prefix || "";
		var suffix = o.suffix || "";

		var result = "";

		result += prefix;
		result += range ? rand(range[0], range[1]) : "";
		result += select ? select[rand(select.length-1)] : "";
		result += suffix;
		return result;
	}
};

module.exports = function(k, v) {
	if (k === "") {
		return v;
	}
	var val = null;
	if (fields.hasOwnProperty(k)) {
		val = __evaluate(fields[k]);
	}
	return val || v;
};