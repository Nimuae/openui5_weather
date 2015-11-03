jQuery.sap.require("hss.weather.view.Formatter");

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		SERVICE_URL: "/service",

		onInit: function(){
			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "data");

			var delay = 1000 * 60 * 30;
			if(jQuery.sap.getUriParameters().get("debug")){
				delay = 2000;
			}
			setInterval(jQuery.proxy(this.refreshData, this), delay);
		},

		refreshData: function(){
			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "data");
		},

		navigateToCustomizing: function(){
			sap.ui.getCore().byId("MainApp").to("viewCustom");
		},

		navigateBackToMain: function(){
			sap.ui.getCore().byId("MainApp").back("viewDisplay");
		}
	});
});