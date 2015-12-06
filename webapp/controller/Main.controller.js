jQuery.sap.require("hss.weather.view.Formatter");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Main", {

		/**
		 * The service URL to send requests to
		 * @type {String}
		 */
		SERVICE_URL: "/service",

		/**
		 * The service URL to send settings requests to
		 * @type {String}
		 */
		SETTINGS_URL: "/service/settings",

		/**
		 * The service URL to be used for test data
		 * @type {String}
		 */
		SERVICE_TEST_URL: "test/request.json",

		/**
		 * Old settings data for cancel dialog data reset
		 * @type {Object}
		 */
		oData_old: null,

		/**
		 * Called when the view is freshly initialized.
		 * Create and attach models to the view and load first data; set refresh interval
		 * @return {void} Nothing
		 */
		onInit: function(){
			var bTest = jQuery.sap.getUriParameters().get("test");
			
			var oSettingsModel;
			if(bTest){
				this.SERVICE_URL = this.SERVICE_TEST_URL;

				oSettingsModel = new sap.ui.model.json.JSONModel({
					"city": "Wiesloch",
					"temp_unit": "C",
					"show_forecast": true,
					"show_precip": true,
					"show_humidity": true,
					"interval": 2500
				});
				this.startRefreshTimer(2500);
			}else{
				oSettingsModel = new sap.ui.model.json.JSONModel(this.SETTINGS_URL);

				var delay = null;
				if(jQuery.sap.getUriParameters().get("debug")){
					delay = 5000;
				}

				oSettingsModel.attachEvent("requestCompleted", jQuery.proxy(this.startRefreshTimer, this, delay));
			}

			var oConditionsModel = new sap.ui.model.json.JSONModel(this.SERVICE_URL);

			this.getView().setModel(oConditionsModel, "data");
			this.getView().setModel(oSettingsModel, "settings");
		},

		/**
		 * Trigger a fresh request to update all data and the corresponding bindings
		 * @return {void} Nothing
		 */
		refreshData: function(){
			this.getView().getModel("data").loadData(this.SERVICE_URL);
		},

		/**
		 * Start the interval and save the handle in an internal variable
		 * @param  {int} delay The delay in ms
		 * @return {handle}       The interval handle
		 */
		startRefreshTimer: function(delay){
			if(!delay){
				delay = this.getView().getModel("settings").getProperty("/interval") || 1000 * 60 * 30;
			}
			clearInterval(this.oInterval);
			return (this.oInterval = setInterval(jQuery.proxy(this.refreshData, this), delay));
		},

		/**
		 * Open the settings dialog and store old settings for reset in this.oData_old
		 * @param  {sap.ui.base.Event} oEvent The UI event
		 * @return {void}        Nothing
		 */
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
		
		/**
		 * The UI event handler for settings dialog's save button
		 * Send settings request to the server and shows a message
		 * @return {void} Nothing
		 */
		onSave: function(){
			this._settingsDialog.close();
			var self = this;

			var data = this.getView().getModel("settings").getData();
			var bChanged = this.checkDataChanged();
			if(bChanged){
				//send request
				$.ajax({
					url: this.SETTINGS_URL,
					method: "POST",
					data: JSON.stringify(data),
					contentType: "application/json",
					dataType: "json"
				}).success(function(d){
					if(d && !!d.city){
						//only load new data if the city changed
						self.refreshData();
					}
					self.startRefreshTimer();
					sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
				}).fail(function(jqXHR){
					sap.m.MessageToast.show("Fehler beim Speichern: " + jqXHR.statusText);
				});
			}else{
				this._settingsDialog.close();
			}
		},

		/**
		 * The UI event handler for settings dialog's cancel button
		 * Opens a confirm dialog and resets settings data on OK
		 * @return {void} Nothing
		 */
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

		/**
		 * Checks the view's settings model for changes
		 * @return {Boolean} Returns true if there were changes in both, the old and the current settings data objects, else returns false
		 */
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

		/**
		 * Settings Dialog radio button select event handler
		 * Sets the data model's /temp_unit property to "C" or "F" for degrees Celsius or degrees Fahrenheit, respectively
		 * @param  {sap.ui.base.Event} oEvent The UI event object
		 * @return {void}        Nothing
		 */
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
		},

		onTimePickerChanged: function(oEvent){
			var valid = oEvent.getParameters().valid;
			var val = oEvent.getParameters().value || "00:00";
			var oTimePicker = oEvent.getSource();

			var oBinding = oTimePicker.getBinding("value");
			if(oBinding){
				var t = 0;
				var matches = val.match(/([0-9]{2})\:([0-9]{2})/);
				if(matches){
					var h = matches[1] || 0;
					var m = matches[2] || 0;

					t += parseInt(h, 10) * 60 * 60 * 1000;
					t += parseInt(m, 10) * 60 * 1000;
				}

				oBinding.getModel().setProperty(oBinding.sPath, t);
			}
		}
	});
});