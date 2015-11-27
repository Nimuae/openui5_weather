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

				var oSettings = this.getView().getModel("settings").getData();
				this.oData_old = JSON.parse(JSON.stringify(oSettings));
			});
		},
		
		onSave: function(){
			this._settingsDialog.close();

			var data = this.getView().getModel("settings").getData();
			var bChanged = this.checkDataChanged();
			if(bChanged){
				//send request
				$.ajax({
					url: this.SETTINGS_URL,
					method: "POST",
					data: JSON.stringify(data),
					contentType: "application/json"
				}).success(function(d){
					sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
				}).fail(function(jqXHR){
					sap.m.MessageToast.show("Fehler beim Speichern: " + jqXHR.statusText);
				});
			}else{
				this._settingsDialog.close();
			}
		},

		onCancel: function(){
			var self = this;

			if(this.checkDataChanged()){
				sap.m.MessageBox.confirm("Wollen Sie die Änderungen wirklich verwerfen?", {
					title: "Abbrechen",
					onClose: function(oAction){
						if(oAction === "OK"){
							var oSettingsModel = self.getView().getModel("settings");
							oSettingsModel.setData(self.oData_old);
							self._settingsDialog.close();
						}
					}
				});
			}else{
				self._settingsDialog.close();
			}
		},

		checkDataChanged: function(){
			var data = this.getView().getModel("settings").getData();
			var data_old = this.oData_old;

			if(!data_old){
				return true;
			}

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