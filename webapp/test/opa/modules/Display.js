jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.modules.Display");

hss.weather.test.opa.modules.Display = function () {
	//All OPA5 tests regarding the current weather tile
	// module("Weather Tile");

	// /** 1
	// * Opa Test "TOWN - Find of town and see matching town"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'town'
	// * Expected value: 'Wiesloch'
	// **/

	// opaTest("TOWN - Find of town and see matching town", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true"); 

	// 	//Actions
	// 	When.iSearchById("town");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("town", "text", "Wiesloch");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 2
	// * Opa Test "CURRENT TEMP - Find current temperature and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'CurTemp'
	// * Expected value: '4°C'
	// **/

	// opaTest("CURRENT TEMP - Find current temperature and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("CurTemp");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("CurTemp", "text", "4°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 3
	// * Opa Test "FELT TEMP - Find felt temperature and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'FeltTemp'
	// * Expected value: Gefühlt: '2°C'
	// **/

	// opaTest("FELT TEMP - Find felt temperature and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("FeltTemp");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("FeltTemp", "text", "Gefühlt: 2°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 4
	// * Opa Test "LOW TEMP - Find low temperature and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'ForecastTempLow'
	// * Expected value: Gefühlt: '-3°C'
	// **/

	// opaTest("LOW TEMP - Find low temperature and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("ForecastTempLow");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("ForecastTempLow", "text", "-3°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 5
	// * Opa Test "HIGH TEMP - Find high temperature and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'ForecastTempHigh'
	// * Expected value: Gefühlt: '3°C'
	// **/

	// opaTest("HIGH TEMP - Find high temperature and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("ForecastTempHigh");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("ForecastTempHigh", "text", "3°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 6
	// * Opa Test "CURRENT WEATHER ICON: Find icon and check image name"
	// * Searches for image by id and checks the image name
	// * Search for: image with id 'WeatherIcon'
	// * Expected value: './icons/SVG/sw-03.svg'
	// **/

	// opaTest("CURRENT WEATHER ICON: Find icon and check image name", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("WeatherIcon");

	// 	//Assertions
	// 	// Then.iSeeMatchingProperty("ForecastTempHigh", "text", "3°C");
	// 	Then.iFindMatchingImageSource("WeatherIcon", "src", "./icons/SVG/sw-03.svg");
	// 	Then.iTeardownMyAppFrame();
	// });

	// // All OPA5 tests regarding the gust tile
	// module("Gust Tile");

	// /** 7
	// * Opa Test "GUST STRENGTH - Find high gust strengh label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'LabelGustStrength'
	// * Expected value: '7.2 km/h'
	// **/

	// opaTest("GUST STRENGTH - Find gust strengh label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("LabelGustStrength");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("LabelGustStrength", "text", "7.2 km/h");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 8
	// * Opa Test "GUST STRENGTH - Find high gust strengh label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'LabelGustDir'
	// * Expected value: 'Süd'
	// **/

	// opaTest("GUST DIRECTION - Find gust direction label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("LabelGustDir");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("LabelGustDir", "text", "Süd");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "GUST COMPASS - Find compass"
	// * Searches for compass by id and checks the visibility
	// * Search for: label with id 'Compass'
	// * Expected value: 'true'
	// **/

	// opaTest("GUST COMPASS - Find compass", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("Compass");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("Compass", "visible", true);
	// 	Then.iTeardownMyAppFrame();
	// });

	// // All OPA5 tests regarding the gust tile
	// module("Precip/Humidity Tile");

	// /**
	// * Opa Test "PRECIPT - Find precipt label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'PrecipText'
	// * Expected value: 'Niederschlag (1h)'
	// **/

	// opaTest("PRECIPT - Find precipt label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("PrecipText");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("PrecipText", "text", "Niederschlag (1h)");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "HUMIDITY - Find humidity label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'HumidityText'
	// * Expected value: 'Luftfeuchtigkeit'
	// **/

	// opaTest("HUMIDITY - Find humidity label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("HumidityText");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("HumidityText", "text", "Luftfeuchtigkeit");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "HUMIDITY - Find humidity circle progress"
	// * Searches for circle progress by id and checks the value
	// * Search for: label with id 'HumidityText'
	// * Expected value: '0.99'
	// **/

	// opaTest("HUMIDITY - Find humidity circle progress", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("CircleProgressHumidity");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("CircleProgressHumidity", "visible", true);
	// 	Then.iSeeMatchingProperty("CircleProgressHumidity", "value", 0.99);
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "RAINOMETER - Find rainometer"
	// * Searches for rainometer by id and checks value and unit
	// * Search for: label with id 'RainometerPrecip'
	// * Expected value: '0.0', unit: 'mm'
	// **/

	// opaTest("RAINOMETER - Find rainometer", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("RainometerPrecip");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("RainometerPrecip", "visible", true);
	// 	Then.iSeeMatchingProperty("RainometerPrecip", "value", 0.0);
	// 	Then.iSeeMatchingProperty("RainometerPrecip", "unit", "mm");
	// 	Then.iTeardownMyAppFrame();
	// });

	
	// // All OPA5 tests regarding forcast Tile 1
	// module("Forcast Tile 1");

	// /**
	// * Opa Test "FORECAST DAY - Find day label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'DateForcast1'
	// * Expected value: 'Dienstag 24.11.2015'
	// **/

	// opaTest("FORECAST DAY - Find day label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("DateForcast1");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("DateForcast1", "text", "Dienstag 24.11.2015");
	// 	Then.iTeardownMyAppFrame();
	// });

	// * 
	// * Opa Test "FORCAST WEATHER ICON: Find icon and check image name"
	// * Searches for image by id and checks the image name
	// * Search for: image with id 'IconForcast1'
	// * Expected value: './icons/SVG/sw-03.svg'
	// *

	// opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("IconForcast1");

	// 	//Assertions
	// 	Then.iFindMatchingImageSource("IconForcast1", "src", "./icons/SVG/sw-03.svg");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST LOW TEMP - Find low temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempLowForcast1'
	// * Expected value: '1°C'
	// **/

	// opaTest("FORECAST LOW TEMP - Find low temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempLowForcast1");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempLowForcast1", "text", "1°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST HIGH TEMP - Find high temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempHighForcast1'
	// * Expected value: '4°C'
	// **/

	// opaTest("FORECAST HIGH TEMP - Find high temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempHighForcast1");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempHighForcast1", "text", "4°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// // All OPA5 tests regarding forcast Tile 2
	// module("Forcast Tile 2");

	// /**
	// * Opa Test "FORECAST DAY - Find day label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'DateForcast2'
	// * Expected value: 'Mittwoch 25.11.2015'
	// **/

	// opaTest("FORECAST DAY - Find day label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("DateForcast2");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("DateForcast2", "text", "Mittwoch 25.11.2015");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 
	// * Opa Test "FORCAST WEATHER ICON: Find icon and check image name"
	// * Searches for image by id and checks the image name
	// * Search for: image with id 'IconForcast2'
	// * Expected value: './icons/SVG/sw-21.svg'
	// **/

	// opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("IconForcast2");

	// 	//Assertions
	// 	Then.iFindMatchingImageSource("IconForcast2", "src", "./icons/SVG/sw-21.svg");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST LOW TEMP - Find low temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempLowForcast2'
	// * Expected value: '2°C'
	// **/

	// opaTest("FORECAST LOW TEMP - Find low temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempLowForcast2");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempLowForcast2", "text", "2°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST HIGH TEMP - Find high temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempHighForcast2'
	// * Expected value: '5°C'
	// **/

	// opaTest("FORECAST HIGH TEMP - Find high temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempHighForcast2");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempHighForcast2", "text", "5°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// // All OPA5 tests regarding the forcast Tile 3
	// module("Forcast Tile 3");

	// /**
	// * Opa Test "FORECAST DAY - Find day label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'DateForcast3'
	// * Expected value: 'Donnerstag 26.11.2015'
	// **/

	// opaTest("FORECAST DAY - Find day label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("DateForcast3");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("DateForcast3", "text", "Donnerstag 26.11.2015");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /** 
	// * Opa Test "FORCAST WEATHER ICON: Find icon and check image name"
	// * Searches for image by id and checks the image name
	// * Search for: image with id 'IconForcast3'
	// * Expected value: './icons/SVG/sw-10.svg'
	// **/

	// opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("IconForcast3");

	// 	//Assertions
	// 	Then.iFindMatchingImageSource("IconForcast3", "src", "./icons/SVG/sw-10.svg")
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST LOW TEMP - Find low temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempLowForcast3'
	// * Expected value: '1°C'
	// **/

	// opaTest("FORECAST LOW TEMP - Find low temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempLowForcast3");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempLowForcast3", "text", "1°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// /**
	// * Opa Test "FORECAST HIGH TEMP - Find high temp label and see matching property"
	// * Searches for label by id and checks the text
	// * Search for: label with id 'TempHighForcast3'
	// * Expected value: '6°C'
	// **/

	// opaTest("FORECAST HIGH TEMP - Find high temp label and see matching property", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iSearchById("TempHighForcast3");

	// 	//Assertions
	// 	Then.iSeeMatchingProperty("TempHighForcast3", "text", "6°C");
	// 	Then.iTeardownMyAppFrame();
	// });

	// module("Custom Settings");

	// /**
	// * Opa Test "CUSTONMIZE BUTTON- Find customize button by id, click on it and search for dialog"
	// * Searches for button by id, clicks on button and searches for dialog by id
	// * Search for: label with id 'CustomizeBtn'
	// * Expected: dialog with it 'SettingsPane'
	// **/
	
	// opaTest("CUSTONMIZE BUTTON- Find customize button by id, click on it and search for dialog by id", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iClickOnControlWithId("CustomizeBtn");

	// 	//Assertions
	// 	Then.iSeeDialog("SettingsPane");
	// 	Then.iTeardownMyAppFrame();
	// });

	// opaTest("CUSTOMIZE DIALOG - Open dialog, change town and save", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iClickOnControlWithId("CustomizeBtn");
	// 	When.iChangeInputValue("CustTown", "Walldorf");
	// 	When.iClickOnControlWithId("BtnSave");

	// 	//Assertions
	// 	Then.iSeeToastMessage();
	// 	Then.iSeeMatchingProperty("town", "text", "Walldorf");
	// 	Then.iTeardownMyAppFrame();
	// });

	// opaTest("CUSTOMIZE DIALOG - Open dialog, click on radiobutton Fahrenheit and save", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iClickOnControlWithId("CustomizeBtn");
	// 	When.iClickOnRadioButtonWithIndex("RbGroup", 1);
	// 	When.iClickOnControlWithId("BtnSave");

	// 	//Assertions
	// 	Then.iSeeToastMessage();
	// 	Then.iSeeMatchingProperty("CurTemp", "text", "38°F");

	// });

	// opaTest("CUSTOMIZE DIALOG - Open dialog, click on radiobutton Celcius and save", function (Given, When, Then){
	// 	//Arrangements
	// 	Given.iStartMyAppInAFrame("/index.html?test=true");

	// 	//Actions
	// 	When.iClickOnControlWithId("CustomizeBtn");
	// 	When.iClickOnRadioButtonWithIndex("RbGroup", 1);
	// 	When.iClickOnControlWithId("BtnSave");
	// 	When.iClickOnControlWithId("CustomizeBtn");
	// 	When.iClickOnRadioButtonWithIndex("RbGroup", 0);
	// 	When.iClickOnControlWithId("BtnSave");

	// 	//Assertions
	// 	Then.iSeeToastMessage();
	// 	Then.iSeeMatchingProperty("CurTemp", "text", "4°C");
	// 	Then.iTeardownMyAppFrame();
	// });

// ######################################################################################################################################################################
// "CUSTOMIZE DIALOG - Open dialog, change state of forecast switch and save" geht nicht, ka wieso ...
// ######################################################################################################################################################################

	opaTest("CUSTOMIZE DIALOG - Open dialog, change state of forecast switch and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iChangeStateOfSwitch("CustForecast", false);
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iDoNotSeeControl("HBoxForecast");
		// Then.iSeeMatchingProperty("HBoxForecast", "visible", "false");
		Then.iTeardownMyAppFrame();
	});

	// check if message toast appears after saving custom settings



	

};