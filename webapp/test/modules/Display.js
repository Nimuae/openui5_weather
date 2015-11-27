jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.modules.Display");

hss.weather.test.modules.Display = function(){
	module("Current Weather");

	/**
	* Opa Test "Find of town and see matching town"
	* Searches for label by id and checks the text
	* Search for: label with id 'town'
	* Expected value: Wiesloch
	**/

	opaTest("Find of town and see matching town", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true"); 

		//Actions
		When.iSearchById("town");

		//Assertions
		Then.iSeeMatchingProperty("town", "text", "Wiesloch");
		Then.iTeardownMyAppFrame();
	});

	/**
	* Opa Test "Find current temperature and see matching property"
	* Searches for label by id and checks the text
	* Search for: label with id 'curTemp'
	* Expected value: 4°C
	**/

	opaTest("Find current temperature and see matching property", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("curTemp");

		//Assertions
		Then.iSeeMatchingProperty("curTemp", "text", "4°C");
		Then.iTeardownMyAppFrame();
	})

	/**
	* Opa Test "Find felt temperature and see matching property"
	* Searches for label by id and checks the text
	* Search for: label with id 'feltTemp'
	* Expected value: Gefühlt: 2°C
	**/

	opaTest("Find felt temperature and see matching property", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html?test=true");

		//Actions
		When.iSearchById("feltTemp");

		//Assertions
		Then.iSeeMatchingProperty("feltTemp", "text", "Gefühlt: 2°C");
		Then.iTeardownMyAppFrame();
	});
};