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
				delay = 5000;
			}
			setInterval(jQuery.proxy(this.refreshData, this), delay);
		},

		refreshData: function(){
			this.getView().getModel("data").loadData(this.SERVICE_URL);
		},

		openSettingsPane: function(oEvent){
			if(!this._settingsPopover){
				this._settingsPopover = sap.ui.xmlfragment("settingsPopover", "hss.weather.view.SettingsPopover", this);
				this.getView().addDependent(this._settingsPopover);
			}

			var oSource = oEvent.getSource();

			jQuery.sap.delayedCall(0, this, function(){
				this._settingsPopover.openBy(oSource);
			});
		},
		
		onSave: function(){			
			sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
		},

		onCancel: function(){
			var that = this;
			var dialog = new sap.m.Dialog({
				title: 'Abbrechen',
				type: 'Message',
				content: new sap.m.Text({ text: 'Wollen Sie die Änderungen wirklich verwerfen?' }),
				beginButton: new sap.m.Button({
					text: 'Ja',
					press: function () {
						dialog.close();
						that._settingsPopover.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Abbrechen',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		}
	});
});