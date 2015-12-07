jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.modules.Display");

hss.weather.test.opa.modules.Display = function () {
	//All OPA5 tests regarding the current weather tile
	module("Weather Tile");

	/** 1
	* WEATHER TILE - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("WEATHER TILE - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("town", "text", "Wiesloch");
		Then.iSeeMatchingProperty("CurTemp", "text", "4°C");
		Then.iSeeMatchingProperty("FeltTemp", "text", "Gefühlt: 2°C");
		Then.iSeeMatchingProperty("ForecastTempLow", "text", "-3°C");
		Then.iSeeMatchingProperty("ForecastTempHigh", "text", "3°C");
		Then.iTeardownMyAppFrame();
	});
	
	/** 2
	* CURRENT WEATHER ICON: Find icon and check image name
	* Searches for image by id and checks the image name
	* Search for: image with id 'WeatherIcon'
	* Expected value: './icons/SVG/sw-03.svg'
	**/

	opaTest("CURRENT WEATHER ICON: Find icon and check image name", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("WeatherIcon");

		//Assertions
		Then.iFindMatchingImageSource("WeatherIcon", "src", "./icons/SVG/sw-03.svg");
		Then.iTeardownMyAppFrame();
	});

	// All OPA5 tests regarding the gust tile
	module("Gust Tile");

	/** 3
	* GUST TILE - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("GUST TILE - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("LabelGustStrength", "text", "7.2 km/h");
		Then.iSeeMatchingProperty("LabelGustDir", "text", "Süd");
		Then.iTeardownMyAppFrame();
	});

	/** 4
	* GUST COMPASS - Find compass
	* Searches for compass by id and checks the visibility
	* Search for: label with id 'Compass'
	* Expected value: 'true'
	**/

	opaTest("GUST COMPASS - Find compass", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("Compass");

		//Assertions
		Then.iSeeMatchingProperty("Compass", "visible", true);
		Then.iTeardownMyAppFrame();
	});

	// All OPA5 tests regarding the gust tile
	module("Precip/Humidity Tile");

	/** 5
	* PRECIP HUMIDITY TILE - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("PRECIP HUMIDITY TILE - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("PrecipText", "text", "Niederschlag (1h)");
		Then.iSeeMatchingProperty("HumidityText", "text", "Luftfeuchtigkeit");

		Then.iTeardownMyAppFrame();
	});

	/** 6
	* HUMIDITY - Find humidity circle progress
	* Searches for circle progress by id and checks the value
	* Search for: label with id 'HumidityText'
	* Expected value: '0.99'
	**/

	opaTest("HUMIDITY - Find humidity circle progress", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("CircleProgressHumidity");

		//Assertions
		Then.iSeeMatchingProperty("CircleProgressHumidity", "visible", true);
		Then.iSeeMatchingProperty("CircleProgressHumidity", "value", 0.99);
		Then.iTeardownMyAppFrame();
	});

	/** 7
	* RAINOMETER - Find rainometer
	* Searches for rainometer by id and checks value and unit
	* Search for: label with id 'RainometerPrecip'
	* Expected value: '0.0', unit: 'mm'
	**/

	opaTest("RAINOMETER - Find rainometer", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("RainometerPrecip");

		//Assertions
		Then.iSeeMatchingProperty("RainometerPrecip", "visible", true);
		Then.iSeeMatchingProperty("RainometerPrecip", "value", 0.0);
		Then.iSeeMatchingProperty("RainometerPrecip", "unit", "mm");
		Then.iTeardownMyAppFrame();
	});

	
	// All OPA5 tests regarding forcast Tile 1
	module("Forcast Tile 1");

	/** 8
	* FORECAST 1 - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("FORECAST 1 - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("DateForcast1", "text", "Dienstag 24.11.2015");
		Then.iSeeMatchingProperty("TempLowForcast1", "text", "1°C");
		Then.iSeeMatchingProperty("TempHighForcast1", "text", "4°C");
		Then.iTeardownMyAppFrame();
	});

	/** 9
	* FORCAST WEATHER ICON: Find icon and check image name
	* Searches for image by id and checks the image name
	* Search for: image with id 'IconForcast1'
	* Expected value: './icons/SVG/sw-03.svg'
	**/

	opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("IconForcast1");

		//Assertions
		Then.iFindMatchingImageSource("IconForcast1", "src", "./icons/SVG/sw-03.svg");
		Then.iTeardownMyAppFrame();
	});

	// All OPA5 tests regarding forcast Tile 2
	module("Forcast Tile 2");

	/** 10
	* FORECAST 2 - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("FORECAST 2 - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("DateForcast2", "text", "Mittwoch 25.11.2015");
		Then.iSeeMatchingProperty("TempLowForcast2", "text", "2°C");
		Then.iSeeMatchingProperty("TempHighForcast2", "text", "5°C");
		Then.iTeardownMyAppFrame();
	});

	/** 11
	* FORCAST WEATHER ICON: Find icon and check image name
	* Searches for image by id and checks the image name
	* Search for: image with id 'IconForcast2'
	* Expected value: './icons/SVG/sw-21.svg'
	**/

	opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("IconForcast2");

		//Assertions
		Then.iFindMatchingImageSource("IconForcast2", "src", "./icons/SVG/sw-21.svg");
		Then.iTeardownMyAppFrame();
	});

	// All OPA5 tests regarding the forcast Tile 3
	module("Forcast Tile 3");

	/** 12
	* FORECAST 3 - Check Labels
	* Searches for label by id and checks the text
	**/

	opaTest("FORECAST 3 - Check Labels", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Assertions
		Then.iSeeMatchingProperty("DateForcast3", "text", "Donnerstag 26.11.2015");
		Then.iSeeMatchingProperty("TempLowForcast3", "text", "1°C");
		Then.iSeeMatchingProperty("TempHighForcast3", "text", "6°C");
		Then.iTeardownMyAppFrame();
	});

	/** 13
	* FORCAST WEATHER ICON: Find icon and check image name
	* Searches for image by id and checks the image name
	* Search for: image with id 'IconForcast3'
	* Expected value: './icons/SVG/sw-10.svg'
	**/

	opaTest("FORCAST WEATHER ICON: Find icon and check image name", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("IconForcast3");

		//Assertions
		Then.iFindMatchingImageSource("IconForcast3", "src", "./icons/SVG/sw-10.svg")
		Then.iTeardownMyAppFrame();
	});

	module("Custom Settings");

	/** 14
	* CUSTONMIZE BUTTON- Find customize button by id, click on it and search for dialog
	* Searches for button by id, clicks on button and searches for dialog by id
	* Search for: label with id 'CustomizeBtn'
	* Expected: dialog with it 'SettingsPane'
	**/
	
	opaTest("CUSTONMIZE BUTTON- Find customize button by id, click on it and search for dialog by id", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");

		//Assertions
		Then.iSeeDialog("SettingsPane");
		Then.iTeardownMyAppFrame();
	});

	/** 15
	* CUSTOMIZE DIALOG - Open dialog, change town and save
	* Open dialog, change town value and save
	* Search for: label with id 'CustomizeBtn'
	* Changes value of Input ('CustTown') to 'Walldorf'
	**/

	opaTest("CUSTOMIZE DIALOG - Open dialog, change town and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iChangeInputValue("CustTown", "Walldorf");
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iSeeToastMessage();
		Then.iSeeMatchingProperty("town", "text", "Walldorf");
		Then.iTeardownMyAppFrame();
	});

	/** 16
	* CUSTOMIZE DIALOG - Open dialog, click on radiobutton Fahrenheit and save
	* Open dialog, change temperature unit to 'Fahrenheit' and save
	* Search for: label with id 'CustomizeBtn'
	**/

	opaTest("CUSTOMIZE DIALOG - Open dialog, click on radiobutton Fahrenheit and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iClickOnRadioButtonWithIndex("RbGroup", 1);
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iSeeToastMessage();
		Then.iSeeMatchingProperty("CurTemp", "text", "38°F");

	});

	/** 17
	* CUSTOMIZE DIALOG - Open dialog, click on radiobutton Celcius and save
	* Open dialog, change temperature unit to 'Celsius' and save
	* Search for: label with id 'CustomizeBtn'
	**/

	opaTest("CUSTOMIZE DIALOG - Open dialog, click on radiobutton Celcius and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iClickOnRadioButtonWithIndex("RbGroup", 1);
		When.iClickOnControlWithId("BtnSave");
		When.iClickOnControlWithId("CustomizeBtn");
		When.iClickOnRadioButtonWithIndex("RbGroup", 0);
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iSeeToastMessage();
		Then.iSeeMatchingProperty("CurTemp", "text", "4°C");
		Then.iTeardownMyAppFrame();
	});

	/** 18
	* CUSTOMIZE DIALOG - Open dialog, change state of forecast switch and save
	* Open dialog, change state of forecast switch and save
	* Expected: forecast should not be shown
	**/

	opaTest("CUSTOMIZE DIALOG - Open dialog, change state of forecast switch and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iChangeStateOfSwitch("CustForecast", false);
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iSeeToastMessage();
		Then.iDoNotSeeControl("HBoxForecast");
		Then.iTeardownMyAppFrame();
	});

	/** 19
	* CUSTOMIZE DIALOG - Open dialog, change state of humidity switch and save
	* Open dialog, change state of forecast switch and save
	* Expected: humidity should not be shown
	**/

	opaTest("CUSTOMIZE DIALOG - Open dialog, change state of humidity switch and save", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iChangeStateOfSwitch("CustHumidity", false);
		When.iClickOnControlWithId("BtnSave");

		//Assertions
		Then.iSeeToastMessage();
		Then.iDoNotSeeControl("CircleProgressHumidity");
		Then.iTeardownMyAppFrame();
	});

	/** 20
	* CUSTOMIZE DIALOG - Intervall
	* Open dialog, change interval, save, open dialog again and check intervall value
	* Expected: '10:00'
	**/

	opaTest("CUSTOMIZE DIALOG - Intervall", function (Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iClickOnControlWithId("CustomizeBtn");
		When.iChangeInputValue("CustInterval", "10:00");
		When.iClickOnControlWithId("BtnSave");

		When.iClickOnControlWithId("CustomizeBtn");

		//Assertions
		Then.iSeeMatchingProperty("CustInterval", "value", "10:00");

		Then.iTeardownMyAppFrame();
	});


// open dialog an cancel
};