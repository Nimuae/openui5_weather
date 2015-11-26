jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.modules.Display");

hss.weather.test.modules.Display = function(){
	module("Current Weather");

	/**
	* Opa Test "Find label of town and see matching town"
	* Searches for lable by id and checks weather the text is 'Wiesloch'
	**/

	opaTest("Find label of town and see matching town", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html"); 

		//Actions
		When.iSearchById("town");

		//Assertions
		Then.iSeeMatchingProperty("town", "text", "Wiesloch");
		Then.iTeardownMyAppFrame();
	});

	opaTest("Find felt temperature and get a positive value", function(Given, When, Then){
		//Arrangements
		Given.iStartMyAppInAFrame("/index.html");

		//Actions
		When.iSearchById("feltTemp");
		
		//Assertions
	});
};