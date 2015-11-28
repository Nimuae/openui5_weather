jQuery.sap.require("hss.weather.view.Formatter");

QUnit.test( "Formatter - windDir: Should return the correct path of the svg file.",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	//Check that the windDir formatter function returns the correct svg paths.
	assert.equal( Formatter.windDir("nord"),"./icons/weather/north.svg", "The path for the direction nord is correct." );
	assert.equal( Formatter.windDir("ost"),"./icons/weather/east.svg", "The path for the direction ost is correct." );
	assert.equal( Formatter.windDir("süd"),"./icons/weather/south.svg", "The path for the direction süd is correct." );
	assert.equal( Formatter.windDir("west"),"./icons/weather/west.svg", "The path for the direction west is correct." );
	assert.equal( Formatter.windDir("südost"),"./icons/weather/south-east.svg", "The path for the direction südost is correct." );
	assert.equal( Formatter.windDir("südwest"),"./icons/weather/south-west.svg", "The path for the direction südwest is correct." );
	assert.equal( Formatter.windDir("nordost"),"./icons/weather/north-east.svg", "The path for the direction nordost is correct." );
	assert.equal( Formatter.windDir("nordwest"),"./icons/weather/north-west.svg", "The path for the direction nordwest is correct." );
	assert.equal( Formatter.windDir("nord-nordost"),"./icons/weather/north.svg", "The path for the direction nord-nordost is correct." );
	assert.equal( Formatter.windDir("süd-südwest"),"./icons/weather/south.svg", "The path for the direction süd-südwest is correct." );
	assert.equal( Formatter.windDir("nord-nordwest"),"./icons/weather/north.svg", "The path for the direction nord-nordwest is correct." );
	assert.equal( Formatter.windDir("süd-südost"),"./icons/weather/south.svg", "The path for the direction süd-südost is correct." );
	assert.equal( Formatter.windDir("ost-nordost"),"./icons/weather/east.svg", "The path for the direction ost-nordost is correct." );
	assert.equal( Formatter.windDir("ost-südost"),"./icons/weather/east.svg", "The path for the direction ost-südost is correct." );
	assert.equal( Formatter.windDir("west-nordwest"),"./icons/weather/west.svg", "The path for the direction west-nordwest is correct." );
	assert.equal( Formatter.windDir("west-südwest"),"./icons/weather/west.svg", "The path for the direction west-südwest is correct." );
});

QUnit.test( "Formatter - image: Should return the correct path of the svg file", function( assert) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the image formatter function return the correct svg paths.
	assert.equal( Formatter.image("chanceflurries"), "./icons/SVG/sw-24.svg", "The path for the image chanceflurries is correct.");
	assert.equal( Formatter.image("chancerain"), "./icons/SVG/sw-21.svg", "The path for the image chancerain is correct.");
	assert.equal( Formatter.image("chancesleet"), "./icons/SVG/sw-21.svg", "The path for the image chancesleet is correct.");
	assert.equal( Formatter.image("chancesnow"), "./icons/SVG/sw-25.svg", "The path for the image chancesnow is correct.");
	assert.equal( Formatter.image("chancetstorms"), "./icons/SVG/sw-27.svg", "The path for the image chancetstorms is correct.");
	assert.equal( Formatter.image("clear"), "./icons/SVG/sw-01.svg", "The path for the image clear is correct.");
	assert.equal( Formatter.image("cloudy"), "./icons/SVG/sw-04.svg", "The path for the image cloudy is correct.");
	assert.equal( Formatter.image("flurries"), "./icons/SVG/sw-24.svg", "The path for the image flurries is correct.");
	assert.equal( Formatter.image("fog"), "./icons/SVG/sw-09.svg", "The path for the image fog is correct.");
	assert.equal( Formatter.image("hazy"), "./icons/SVG/sw-08.svg", "The path for the image hazy is correct.");
	assert.equal( Formatter.image("mostlycloudy"), "./icons/SVG/sw-03.svg", "The path for the image mostlycloudy is correct.");
	assert.equal( Formatter.image("mostlysunny"), "./icons/SVG/sw-03.svg", "The path for the image mostlysunny is correct.");
	assert.equal( Formatter.image("partlycloudy"), "./icons/SVG/sw-03.svg", "The path for the image partlycloudy is correct.");
	assert.equal( Formatter.image("partlysunny"), "./icons/SVG/sw-03.svg", "The path for the image partlysunny is correct.");
	assert.equal( Formatter.image("sleet"), "./icons/SVG/sw-21.svg", "The path for the image sleet is correct.");
	assert.equal( Formatter.image("rain"), "./icons/SVG/sw-23.svg", "The path for the image rain is correct.");
	assert.equal( Formatter.image("snow"), "./icons/SVG/sw-25.svg", "The path for the image snow is correct.");
	assert.equal( Formatter.image("sunny"), "./icons/SVG/sw-01.svg", "The path for the image sunny is correct.");
	assert.equal( Formatter.image("tstorms"), "./icons/SVG/sw-27.svg", "The path for the image tstorms is correct.");
	assert.equal( Formatter.image("nt_chanceflurries"), "./icons/SVG/sw-34.svg", "The path for the image nt_chanceflurries is correct.");
	assert.equal( Formatter.image("nt_flurries"), "./icons/SVG/sw-34.svg", "The path for the image nt_flurries is correct.");
	assert.equal( Formatter.image("nt_chancesnow"), "./icons/SVG/sw-35.svg", "The path for the image nt_chancesnow is correct.");
	assert.equal( Formatter.image("nt_snow"), "./icons/SVG/sw-35.svg", "The path for the image nt_snow is correct.");
	assert.equal( Formatter.image("nt_chancerain"), "./icons/SVG/sw-33.svg", "The path for the image nt_chancerain is correct.");
	assert.equal( Formatter.image("nt_rain"), "./icons/SVG/sw-31.svg", "The path for the image nt_rain is correct.");
	assert.equal( Formatter.image("nt_chancesleet"), "./icons/SVG/sw-31.svg", "The path for the image nt_chancesleet is correct.");
	assert.equal( Formatter.image("nt_sleet"), "./icons/SVG/sw-31.svg", "The path for the image nt_sleet is correct.");
	assert.equal( Formatter.image("nt_chancetstorms"), "./icons/SVG/sw-37.svg", "The path for the image nt_chancetstorms is correct.");
	assert.equal( Formatter.image("nt_tstorms"), "./icons/SVG/sw-37.svg", "The path for the image nt_tstorms is correct.");
	assert.equal( Formatter.image("nt_clear"), "./icons/SVG/sw-02.svg", "The path for the image nt_clear is correct.");
	assert.equal( Formatter.image("nt_sunny"), "./icons/SVG/sw-02.svg", "The path for the image nt_sunny is correct.");
	assert.equal( Formatter.image("nt_cloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_cloudy is correct.");
	assert.equal( Formatter.image("nt_fog"), "./icons/SVG/sw-10.svg", "The path for the image nt_fog is correct.");
	assert.equal( Formatter.image("nt_hazy"), "./icons/SVG/sw-07.svg", "The path for the image nt_hazy is correct.");
	assert.equal( Formatter.image("nt_mostlycloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_mostlycloudy is correct.");
	assert.equal( Formatter.image("nt_partlycloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_partlycloudy is correct.");
	assert.equal( Formatter.image("nt_mostlysunny"), "./icons/SVG/sw-07.svg", "The path for the image nt_mostlysunny is correct.");
	assert.equal( Formatter.image("nt_partlysunny"), "./icons/SVG/sw-07.svg", "The path for the image nt_partlysunny is correct.");
});

QUnit.test( "Formatter - roundTemp: Should return the correct rounded temperature.",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the roundTemp function converts the string into a number and rounds it correctly.
	assert.equal( Formatter.roundTemp("-15.6"), -16, "The negative double digit number -15.6 rounds up to -16.");
	assert.equal( Formatter.roundTemp("-15.4"), -15, "The negative double digit number -15.4 rounds down to -15.4.");
	assert.equal( Formatter.roundTemp("-5.6"), -6, "The negative single digit number -5.6 rounds up to -6.");
	assert.equal( Formatter.roundTemp("-5.4"), -5, "The negative single digit number -5.4 rounds down to -5.");
	assert.equal( Formatter.roundTemp("5.6"), 6, "The positive single digit number 5.6 rounds up to 6.");
	assert.equal( Formatter.roundTemp("5.4"), 5, "The positive single digit number 5.4 rounds down to 5.");
	assert.equal( Formatter.roundTemp("15.6"), 16, "The positive double digit number 15.6 round up to 16.");
	assert.equal( Formatter.roundTemp("15.4"), 15, "The positive double digit number 15.4 rounds down to 15.");
});

QUnit.test( "Formatter - invertWindDir: Should return the inverted wind direction.",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the invertWindDir function returns the inverted direction
	assert.equal( Formatter.invertWindDir(10), 190, "10, a number smaller than 180°, returns 190.");
	assert.equal( Formatter.invertWindDir(190), 10, "190, a number bigger than 180°, returns 10.");
	assert.equal( Formatter.invertWindDir(0), 180, "0 returns 180.");
	assert.equal( Formatter.invertWindDir(180), 0, "180 returns 0 and NOT 360.");
	assert.equal( Formatter.invertWindDir(360), 180, "360 returns 180."); //Normally this shouldn't be returned by the weather API (only 0 - 359°).
	
});