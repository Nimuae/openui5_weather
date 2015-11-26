jQuery.sap.require("hss.weather.view.Formatter");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		SERVICE_URL: "/service",
		SERVICE_TEST_URL: "/service/test",

		onInit: function(){
			if(jQuery.sap.getUriParameters().get("test")){
				this.SERVICE_URL = this.SERVICE_TEST_URL;
			}

			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "data");

			var oSettingsModel = new sap.ui.model.json.JSONModel({});
			this.getView().setModel(oSettingsModel, "settings");

			var delay = 1000 * 60 * 30;
			if(jQuery.sap.getUriParameters().get("debug")){
				delay = 5000;
			}
			setInterval(jQuery.proxy(this.refreshData, this), delay);
		},

		refreshData: function(){
			this.getView().getModel("data").loadData(this.SERVICE_URL);
		},

		openSettingsPane: function(oEvent){
			if(!this._settingsDialog){
				this._settingsDialog = sap.ui.xmlfragment("settingsPopover", "hss.weather.view.SettingsPopover", this);
				this.getView().addDependent(this._settingsDialog);
			}

			var oSource = oEvent.getSource();

			jQuery.sap.delayedCall(0, this, function(){
				this._settingsDialog.open();
			});
		},
		
		onSave: function(){			
			sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
			this._settingsDialog.close();
		},

		onCancel: function(){
			var that = this;

			sap.m.MessageBox.confirm("Wollen Sie die Änderungen wirklich verwerfen?", {
				title: "Abbrechen",
				onClose: function(oAction){
					if(oAction === "OK"){
						that._settingsDialog.close();
					}
				}
			});
		}
	});
});