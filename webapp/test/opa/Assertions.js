jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.Assertions");


hss.weather.test.opa.Assertions = new sap.ui.test.Opa5({

	/**
	 * Checks if the property matches 
	 * @param  {String} id       Id of the control
	 * @param  {String} name     Property
	 * @param  {String} value    Value of property
	 * @return {jQuery.promise} waitFor The jQuery.promise object for event handling
	 */
	iSeeMatchingProperty: function(id, name, value){
		return this.waitFor({
			id: new RegExp(id),
			matchers: new sap.ui.test.matchers.PropertyStrictEquals({
				name: name,
				value: value
			}),
			success: function(oControl){
				oCtrl = oControl;
				sap.ui.test.Opa5.assert.ok(true, "Saw matching property (" + value + ")");
			},
			errorMessage: "Did not find matching property '" + name + "' -- Expected: '" + value + "'"
		});
	},

	iDoNotSeeControl: function(id){
		return this.waitFor({
			pollingInterval : 100,
			controlType: "sap.ui.core.Control",
			check : function (aControls) {
       			for(var i = 0; i < aControls.length; i++){
       				if(new RegExp(id).test(aControls[i].getId()) && !aControls[i].getVisible()){
       					return true;
       				}
       			}
       			return false;
    		},
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Did not find control");
			},
			errorMessage: "Found control"
		});



		// return this.waitFor({
		// 	id: new RegExp(id),
		// 	matchers: new sap.ui.test.matchers.Properties({
		// 		visible: false
		// 	}),
		// 	success: function(oControl){
		// 		oCtrl = oControl;
		// 		sap.ui.test.Opa5.assert.ok(true, "Did not find matching control");
		// 	},
		// 	errorMessage: "Find matching control"
		// });
	},

	/**
	 * Checks if the image source matches
	 * @param  {String} id       Id of the control
	 * @param  {String} name     Property
	 * @param  {String} value    Value of property
	 * @return {jQuery.promise} waitFor The jQuery.promise object for event handling
	 */
	iFindMatchingImageSource: function(id, name, value){
		return this.waitFor({
			id: new RegExp(id),
			matchers: new sap.ui.test.matchers.PropertyStrictEquals({
				name: name, 
				value: value
			}),
			success: function(oImage){
				sap.ui.test.Opa5.assert.ok(true, "Found matching image name (" + value + ")");
			},
			errorMessage: "Did not find matching image name -- Expected: '" + value + "'"
		});
	},

	iSeeDialog: function(id){
		return this.waitFor({
			id: new RegExp(id),
			success: function(oDialog){
				sap.ui.test.Opa5.assert.ok(true, "Found dialog with matching id (" + id + ")");
			},
			errorMessage: "Did not find dialog with matching id (" + id  +")"
		});
	},

	iSeeToastMessage: function(){
		return this.waitFor({
			pollingInterval : 100,
			// viewName: viewName,
			// controlType: controlType, //e.g sap.m.Label
			check : function () {
       			return !!sap.ui.test.Opa5.getJQuery()(".sapMMessageToast").length;
    		},
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Found the control: (" + oControl + ")");
			},
			errorMessage: "Did not find the control"
		});
	},

});