/* @author Dominic Holzwarth */

module.exports = function(){
	var self = this;
	
	this.stack = {};
	this.fields = {
		"temp_c": [-20.0, 40.0], //between -20 and 40
		"relative_humidity": {
			range: [0, 99],
			suffix: "%"
		},
		"wind_degrees": [0, 360],
		"wind_dir": {
			depends: {
				field: "wind_degrees",
				fn: function(k, v){
					var dirs = [
						"Nord", "Nord-Nordost", "Nordost", "Ost-Nordost", "Ost",
						"Ost-Südost", "Südost", "Süd-Südost", "Süd",
						"Süd-Südwest", "Südwest", "Südwest-West", "West",
						"West-Nordwest", "Nordwest", "Nord-Nordwest"
					];
					if(typeof v !== "undefined"){
						return dirs[Math.min(dirs.length - 1, Math.round(v / (360 / dirs.length)))];
					}else{
						return dirs[0];
					}
					
				}
			}
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
		"precip_today_metric": [0, 300],
		"celsius": [-20.0, 40.0],
		"mm": [0, 300]
	};

	this.rand = function(min, max) {
		if (!max) {
			max = min;
			min = 0;
		}
		return min + Math.floor((max - min) * Math.random());
	};

	this.__evaluate = function(field, o) {
		if (!o) {
			return;
		}

		var result = "";
		if (o.length === 2) { //contains two boundaries
			result = self.rand(o[0], o[1]);
		} else { //expect an object
			if(!!o.depends && o.depends.field){
				//resolve dependency if it does not exist yet:
				if(!self.stack[o.depends.field]){
					self.__evaluate(o.depends.field, self.fields[o.depends.field]);
				}

				//has a dependency
				if(o.depends.fn){
					result = o.depends.fn(o.depends.field, self.stack[o.depends.field]);
				}else{
					result = self.stack[o.depends.field];
				}
			}else{
				var range = o.range;
				var select = o.select;
				var prefix = o.prefix || "";
				var suffix = o.suffix || "";

				result += prefix;
				result += range ? self.rand(range[0], range[1]) : "";
				result += select ? select[self.rand(select.length-1)] : "";
				result += suffix;
			}
		}

		//add to stack
		self.stack[field] = result;

		return result;
	};
	
	this.randomize = function(k, v) {
		if (k === "") {
			return v;
		}
		var val = null;
		if (self.fields.hasOwnProperty(k)) {
			val = self.__evaluate(k, self.fields[k]);
		}
		return val || v;
	};
};