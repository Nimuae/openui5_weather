jQuery.sap.require("hss.weather.view.Formatter");

QUnit.test( "Formatter - wind direction svg-path",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	//Check that the windDir formatter function returns the correct svg paths.
	assert.equal( Formatter.windDir("nord"),"./icons/weather/north.svg", "nord" );
	assert.equal( Formatter.windDir("ost"),"./icons/weather/east.svg", "ost" );
	assert.equal( Formatter.windDir("süd"),"./icons/weather/south.svg", "süd" );
	assert.equal( Formatter.windDir("west"),"./icons/weather/west.svg", "west" );
	assert.equal( Formatter.windDir("südost"),"./icons/weather/south-east.svg", "südost" );
	assert.equal( Formatter.windDir("südwest"),"./icons/weather/south-west.svg", "südwest" );
	assert.equal( Formatter.windDir("nordost"),"./icons/weather/north-east.svg", "nordost" );
	assert.equal( Formatter.windDir("nordwest"),"./icons/weather/north-west.svg", "nordwest" );
	assert.equal( Formatter.windDir("nord-nordost"),"./icons/weather/north.svg", "nord-nordost" );
	assert.equal( Formatter.windDir("süd-südwest"),"./icons/weather/south.svg", "süd-südwest" );
	assert.equal( Formatter.windDir("nord-nordwest"),"./icons/weather/north.svg", "nord-nordwest" );
	assert.equal( Formatter.windDir("süd-südost"),"./icons/weather/south.svg", "süd-südost" );
	assert.equal( Formatter.windDir("ost-nordost"),"./icons/weather/east.svg", "ost-nordost" );
	assert.equal( Formatter.windDir("ost-südost"),"./icons/weather/east.svg", "ost-südost" );
	assert.equal( Formatter.windDir("west-nordwest"),"./icons/weather/west.svg", "west-nordwest" );
	assert.equal( Formatter.windDir("west-südwest"),"./icons/weather/west.svg", "west-südwest" );
});

QUnit.test( "Formatter - image svg-path", function( assert) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the image formatter function return the correct svg paths.
	assert.equal( Formatter.image("chanceflurries"), "./icons/SVG/sw-24.svg", "chanceflurries");
	assert.equal( Formatter.image("chancerain"), "./icons/SVG/sw-21.svg", "chancerain");
	assert.equal( Formatter.image("chancesleet"), "./icons/SVG/sw-21.svg", "chancesleet");
	assert.equal( Formatter.image("chancesnow"), "./icons/SVG/sw-25.svg", "chancesnow");
	assert.equal( Formatter.image("chancetstorms"), "./icons/SVG/sw-27.svg", "chancetstorms");
	assert.equal( Formatter.image("clear"), "./icons/SVG/sw-01.svg", "clear");
	assert.equal( Formatter.image("cloudy"), "./icons/SVG/sw-04.svg", "cloudy");
	assert.equal( Formatter.image("flurries"), "./icons/SVG/sw-24.svg", "flurries");
	assert.equal( Formatter.image("fog"), "./icons/SVG/sw-09.svg", "fog");
	assert.equal( Formatter.image("hazy"), "./icons/SVG/sw-08.svg", "hazy");
	assert.equal( Formatter.image("mostlycloudy"), "./icons/SVG/sw-03.svg", "mostlycloudy");
	assert.equal( Formatter.image("mostlysunny"), "./icons/SVG/sw-03.svg", "mostlysunny");
	assert.equal( Formatter.image("partlycloudy"), "./icons/SVG/sw-03.svg", "partlycloudy");
	assert.equal( Formatter.image("partlysunny"), "./icons/SVG/sw-03.svg", "partlysunny");
	assert.equal( Formatter.image("sleet"), "./icons/SVG/sw-21.svg", "sleet");
	assert.equal( Formatter.image("rain"), "./icons/SVG/sw-23.svg", "rain");
	assert.equal( Formatter.image("snow"), "./icons/SVG/sw-25.svg", "snow");
	assert.equal( Formatter.image("sunny"), "./icons/SVG/sw-01.svg", "sunny");
	assert.equal( Formatter.image("tstorms"), "./icons/SVG/sw-27.svg", "tstorms");
	assert.equal( Formatter.image("nt_chanceflurries"), "./icons/SVG/sw-34.svg", "nt_chanceflurries");
	assert.equal( Formatter.image("nt_flurries"), "./icons/SVG/sw-34.svg", "nt_flurries");
	assert.equal( Formatter.image("nt_chancesnow"), "./icons/SVG/sw-35.svg", "nt_chancesnow");
	assert.equal( Formatter.image("nt_snow"), "./icons/SVG/sw-35.svg", "nt_snow");
	assert.equal( Formatter.image("nt_chancerain"), "./icons/SVG/sw-33.svg", "nt_chancerain");
	assert.equal( Formatter.image("nt_rain"), "./icons/SVG/sw-31.svg", "nt_rain");
	assert.equal( Formatter.image("nt_chancesleet"), "./icons/SVG/sw-31.svg", "nt_chancesleet");
	assert.equal( Formatter.image("nt_sleet"), "./icons/SVG/sw-31.svg", "nt_sleet");
	assert.equal( Formatter.image("nt_chancetstorms"), "./icons/SVG/sw-37.svg", "nt_chancetstorms");
	assert.equal( Formatter.image("nt_tstorms"), "./icons/SVG/sw-37.svg", "nt_tstorms");
	assert.equal( Formatter.image("nt_clear"), "./icons/SVG/sw-02.svg", "nt_clear");
	assert.equal( Formatter.image("nt_sunny"), "./icons/SVG/sw-02.svg", "nt_sunny");
	assert.equal( Formatter.image("nt_cloudy"), "./icons/SVG/sw-07.svg", "nt_cloudy");
	assert.equal( Formatter.image("nt_fog"), "./icons/SVG/sw-10.svg", "nt_fog");
	assert.equal( Formatter.image("nt_hazy"), "./icons/SVG/sw-07.svg", "nt_hazy");
	assert.equal( Formatter.image("nt_mostlycloudy"), "./icons/SVG/sw-07.svg", "nt_mostlycloudy");
	assert.equal( Formatter.image("nt_partlycloudy"), "./icons/SVG/sw-07.svg", "nt_partlycloudy");
	assert.equal( Formatter.image("nt_mostlysunny"), "./icons/SVG/sw-07.svg", "nt_mostlysunny");
	assert.equal( Formatter.image("nt_partlysunny"), "./icons/SVG/sw-07.svg", "nt_partlysunny");
});

QUnit.test( "Formatter - round temperature",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the roundTemp function converts the string into a number and rounds it correctly.
	assert.equal( Formatter.roundTemp("-15.6"), -16, "round up - negative double digit number");
	assert.equal( Formatter.roundTemp("-15.4"), -15, "round down - negative double digit number");
	assert.equal( Formatter.roundTemp("-5.6"), -6, "round up - negative single digit number");
	assert.equal( Formatter.roundTemp("-5.4"), -5, "round down - negative single digit number");
	assert.equal( Formatter.roundTemp("5.6"), 6, "round up - positive single digit number");
	assert.equal( Formatter.roundTemp("5.4"), 5, "round down - positive single digit number");
	assert.equal( Formatter.roundTemp("15.6"), 16, "round up - positive double digit number");
	assert.equal( Formatter.roundTemp("15.4"), 15, "round down - positive double digit number");
});

QUnit.test( "Formatter - invert wind direction",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the invertWindDir function returns the inverted direction
	assert.equal( Formatter.invertWindDir(10), 190, "number smaller than 180°");
	assert.equal( Formatter.invertWindDir(190), 10, "number bigger than 180°");
	assert.equal( Formatter.invertWindDir(0), 180, "exactly 0°");
	assert.equal( Formatter.invertWindDir(180), 0, "exactly 180°");
	assert.equal( Formatter.invertWindDir(360), 180, "exactly 360°"); //Normally this shouldn't be returned by the weather API.
	
});