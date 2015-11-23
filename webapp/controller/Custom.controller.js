sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller){
	"use strict";

	return Controller.extend("hss.weather.controller.Custom", {
		"control": {
			"visible" : true,
			"editable": false
		},
	
		SERVICE_URL: "/service",

		onInit: function(){
			//Set control model
			 var oControlModel = new sap.ui.model.json.JSONModel(this.control);
			this.getView().setModel(oControlModel, "control");
		},
		
		onEdit: function(){
			// set Property
			this.getView().getModel("control").setProperty("/editable", true);
		},
		
		onSave: function(){
			this.getView().getModel("control").setProperty("/editable", false);
			
			
			sap.m.MessageToast.show("Änderungen wurden erfolgreich gespeichert.");
		},
		
		onCancel: function(){
			var that = this;
			var dialog = new sap.m.Dialog({
				title: 'Abbrechen',
				type: 'Message',
				content: new sap.m.Text({ text: 'Wollen Sie die Ändeurngen wirklich verwerfen?' }),
				beginButton: new sap.m.Button({
					text: 'Ja',
					press: function () {
						that.getView().getModel("control").setProperty("/editable", false);
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: 'Nein',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},
		navigateBackToMain: function(){
			sap.ui.getCore().byId("MainApp").back("viewDisplay");
		}

		
	});
});