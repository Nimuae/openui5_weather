jQuery.sap.require("hss.weather.view.Formatter");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		SERVICE_URL: "/service",
		SETTINGS_URL: "/service/settings",
		SERVICE_TEST_URL: "/service/test",

		oData_old: null,

		onInit: function(){
			if(jQuery.sap.getUriParameters().get("test")){
				this.SERVICE_URL = this.SERVICE_TEST_URL;
			}

			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);
			this.getView().setModel(oConditionsModel, "data");

			var oSettingsModel = new sap.ui.model.json.JSONModel(this.SETTINGS_URL);
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
				this.oData_old = this.getView().getModel("settings").getData();
			});
		},
		
		onSave: function(){
			this._settingsDialog.close();

			var data = this.getView().getModel("settings").getData();
			if(this.checkDataChanged()){
				//send request
				sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
			}else{
				this._settingsDialog.close();
			}
		},

		onCancel: function(){
			var that = this;

			if(this.checkDataChanged()){
				sap.m.MessageBox.confirm("Wollen Sie die Änderungen wirklich verwerfen?", {
					title: "Abbrechen",
					onClose: function(oAction){
						if(oAction === "OK"){
							that._settingsDialog.close();
						}
					}
				});
			}else{
				that._settingsDialog.close();
			}
		},

		checkDataChanged: function(){
			var data = this.getView().getModel("settings").getData();
			var data_old = this.oData_old;

			var bChanged = false;
			for(var k in data){
				if(data.hasOwnProperty(k) && data_old.hasOwnProperty(k)){
					bChanged = data[k] !== data_old[k];
					if(bChanged){
						break;
					}
				}
			}
			return bChanged;
		},

		onRadioButtonChange: function(oEvent){
			var oSource = oEvent.getSource();
			var index = oEvent.getParameter("selectedIndex");
			
			var unit;
			switch(index){
			case 0:
				unit = "C";
				break;
			case 1:
				unit = "F";
				break;
			default:
				unit = "";
			}

			oSource.getModel("settings").setProperty("/temp_unit", unit);
		}
	});
});