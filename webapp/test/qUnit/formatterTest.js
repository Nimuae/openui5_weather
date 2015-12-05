jQuery.sap.require("hss.weather.view.Formatter");

QUnit.test( "Formatter - WeatherIcon: Should return the correct path of the svg file", function( assert) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the WeatherIcon function return the correct svg paths.
	assert.equal( Formatter.WeatherIcon("chanceflurries"), "./icons/SVG/sw-24.svg", "The path for the image chanceflurries is correct.");
	assert.equal( Formatter.WeatherIcon("chancerain"), "./icons/SVG/sw-21.svg", "The path for the image chancerain is correct.");
	assert.equal( Formatter.WeatherIcon("chancesleet"), "./icons/SVG/sw-21.svg", "The path for the image chancesleet is correct.");
	assert.equal( Formatter.WeatherIcon("chancesnow"), "./icons/SVG/sw-25.svg", "The path for the image chancesnow is correct.");
	assert.equal( Formatter.WeatherIcon("chancetstorms"), "./icons/SVG/sw-27.svg", "The path for the image chancetstorms is correct.");
	assert.equal( Formatter.WeatherIcon("clear"), "./icons/SVG/sw-01.svg", "The path for the image clear is correct.");
	assert.equal( Formatter.WeatherIcon("cloudy"), "./icons/SVG/sw-04.svg", "The path for the image cloudy is correct.");
	assert.equal( Formatter.WeatherIcon("flurries"), "./icons/SVG/sw-24.svg", "The path for the image flurries is correct.");
	assert.equal( Formatter.WeatherIcon("fog"), "./icons/SVG/sw-09.svg", "The path for the image fog is correct.");
	assert.equal( Formatter.WeatherIcon("hazy"), "./icons/SVG/sw-08.svg", "The path for the image hazy is correct.");
	assert.equal( Formatter.WeatherIcon("mostlycloudy"), "./icons/SVG/sw-03.svg", "The path for the image mostlycloudy is correct.");
	assert.equal( Formatter.WeatherIcon("mostlysunny"), "./icons/SVG/sw-03.svg", "The path for the image mostlysunny is correct.");
	assert.equal( Formatter.WeatherIcon("partlycloudy"), "./icons/SVG/sw-03.svg", "The path for the image partlycloudy is correct.");
	assert.equal( Formatter.WeatherIcon("partlysunny"), "./icons/SVG/sw-03.svg", "The path for the image partlysunny is correct.");
	assert.equal( Formatter.WeatherIcon("sleet"), "./icons/SVG/sw-21.svg", "The path for the image sleet is correct.");
	assert.equal( Formatter.WeatherIcon("rain"), "./icons/SVG/sw-23.svg", "The path for the image rain is correct.");
	assert.equal( Formatter.WeatherIcon("snow"), "./icons/SVG/sw-25.svg", "The path for the image snow is correct.");
	assert.equal( Formatter.WeatherIcon("sunny"), "./icons/SVG/sw-01.svg", "The path for the image sunny is correct.");
	assert.equal( Formatter.WeatherIcon("tstorms"), "./icons/SVG/sw-27.svg", "The path for the image tstorms is correct.");
	assert.equal( Formatter.WeatherIcon("nt_chanceflurries"), "./icons/SVG/sw-34.svg", "The path for the image nt_chanceflurries is correct.");
	assert.equal( Formatter.WeatherIcon("nt_flurries"), "./icons/SVG/sw-34.svg", "The path for the image nt_flurries is correct.");
	assert.equal( Formatter.WeatherIcon("nt_chancesnow"), "./icons/SVG/sw-35.svg", "The path for the image nt_chancesnow is correct.");
	assert.equal( Formatter.WeatherIcon("nt_snow"), "./icons/SVG/sw-35.svg", "The path for the image nt_snow is correct.");
	assert.equal( Formatter.WeatherIcon("nt_chancerain"), "./icons/SVG/sw-33.svg", "The path for the image nt_chancerain is correct.");
	assert.equal( Formatter.WeatherIcon("nt_rain"), "./icons/SVG/sw-31.svg", "The path for the image nt_rain is correct.");
	assert.equal( Formatter.WeatherIcon("nt_chancesleet"), "./icons/SVG/sw-31.svg", "The path for the image nt_chancesleet is correct.");
	assert.equal( Formatter.WeatherIcon("nt_sleet"), "./icons/SVG/sw-31.svg", "The path for the image nt_sleet is correct.");
	assert.equal( Formatter.WeatherIcon("nt_chancetstorms"), "./icons/SVG/sw-37.svg", "The path for the image nt_chancetstorms is correct.");
	assert.equal( Formatter.WeatherIcon("nt_tstorms"), "./icons/SVG/sw-37.svg", "The path for the image nt_tstorms is correct.");
	assert.equal( Formatter.WeatherIcon("nt_clear"), "./icons/SVG/sw-02.svg", "The path for the image nt_clear is correct.");
	assert.equal( Formatter.WeatherIcon("nt_sunny"), "./icons/SVG/sw-02.svg", "The path for the image nt_sunny is correct.");
	assert.equal( Formatter.WeatherIcon("nt_cloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_cloudy is correct.");
	assert.equal( Formatter.WeatherIcon("nt_fog"), "./icons/SVG/sw-10.svg", "The path for the image nt_fog is correct.");
	assert.equal( Formatter.WeatherIcon("nt_hazy"), "./icons/SVG/sw-07.svg", "The path for the image nt_hazy is correct.");
	assert.equal( Formatter.WeatherIcon("nt_mostlycloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_mostlycloudy is correct.");
	assert.equal( Formatter.WeatherIcon("nt_partlycloudy"), "./icons/SVG/sw-07.svg", "The path for the image nt_partlycloudy is correct.");
	assert.equal( Formatter.WeatherIcon("nt_mostlysunny"), "./icons/SVG/sw-07.svg", "The path for the image nt_mostlysunny is correct.");
	assert.equal( Formatter.WeatherIcon("nt_partlysunny"), "./icons/SVG/sw-07.svg", "The path for the image nt_partlysunny is correct.");
});

QUnit.test( "Formatter - RoundTemp: Should return the correct rounded temperature.",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the RoundTemp function converts the string into a number and rounds it correctly.
	assert.equal( Formatter.RoundTemp("-15.6"), -16, "The negative double digit number -15.6 rounds up to -16.");
	assert.equal( Formatter.RoundTemp("-15.4"), -15, "The negative double digit number -15.4 rounds down to -15.4.");
	assert.equal( Formatter.RoundTemp("-5.6"), -6, "The negative single digit number -5.6 rounds up to -6.");
	assert.equal( Formatter.RoundTemp("-5.4"), -5, "The negative single digit number -5.4 rounds down to -5.");
	assert.equal( Formatter.RoundTemp("5.6"), 6, "The positive single digit number 5.6 rounds up to 6.");
	assert.equal( Formatter.RoundTemp("5.4"), 5, "The positive single digit number 5.4 rounds down to 5.");
	assert.equal( Formatter.RoundTemp("15.6"), 16, "The positive double digit number 15.6 round up to 16.");
	assert.equal( Formatter.RoundTemp("15.4"), 15, "The positive double digit number 15.4 rounds down to 15.");
});

QUnit.test( "Formatter - InvertWindDir: Should return the inverted wind direction.",  function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the InvertWindDir function returns the inverted direction.
	assert.equal( Formatter.InvertWindDir(10), 190, "10, a number smaller than 180°, returns 190.");
	assert.equal( Formatter.InvertWindDir(190), 10, "190, a number bigger than 180°, returns 10.");
	assert.equal( Formatter.InvertWindDir(0), 180, "0 returns 180.");
	assert.equal( Formatter.InvertWindDir(180), 0, "180 returns 0 and NOT 360.");
	assert.equal( Formatter.InvertWindDir(360), 180, "360 returns 180."); //Normally this shouldn't be returned by the weather API (only 0 - 359°).
	
});
QUnit.test( "Formatter - MakeTimeFromInterval: Should return the converted time.", function( assert ) {
	var Formatter = hss.weather.view.Formatter;
	// Check that the MakeTimeFromInterval returns a correct formatted string.
	assert.equal( Formatter.MakeTimeFromInterval(0), "00:00", "0ms returns the correct formatted string.");
	assert.equal( Formatter.MakeTimeFromInterval(240000), "00:04", "A single digit minute time returns the correct formatted string.");
	assert.equal( Formatter.MakeTimeFromInterval(3060000), "00:51", "A double digit minute time returns the correct formatted string.");
	assert.equal( Formatter.MakeTimeFromInterval(18300000), "05:05", "A single digit hour time returns the correct formatted string.");
	assert.equal( Formatter.MakeTimeFromInterval(54900000), "15:15", "A double digit hour time returns the correct formatted string.");
});