sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		onInit: function(){
			//API-KEY: 19420d53f811294e
			var oConditionsModel = new sap.ui.model.json.JSONModel("conditions.json");
			this.getView().setModel(oConditionsModel, "conditions");
		}
	});
});