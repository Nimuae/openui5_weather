jQuery.sap.require("hss.weather.view.Formatter");

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		SERVICE_URL: "/service/conditions",

		onInit: function(){
			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "conditions");

			setInterval(jQuery.proxy(this.refreshData, this), 1000 * 60 * 30); //1000 * 60 * 30
		},

		refreshData: function(){
			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "conditions");
		}
	});
});