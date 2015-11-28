jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.Assertions");


hss.weather.test.opa.Assertions = new sap.ui.test.Opa5({

	/**
	 * Checks if the property matches 
	 * @param  {[type]} id       Id of the control
	 * @param  {[type]} name     Property
	 * @param  {[type]} value    Value of property
	 * @return {[type]} waitFor  [description]
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
				sap.ui.test.Opa5.assert.ok(true, "Saw matching property '" + value + "'");
			},
			errorMessage: "Did not find matching property -- Expected: '" + value + "'"
		});
	},

	/**
	 * Checks if the image source matches
	 * @param  {String} id       Id of the control
	 * @param  {String} name     Property
	 * @param  {String} value    Value of property
	 * @return {[type]} waitFor  [description]
	 */
	iFindMatchingImageSource: function(id, name, value){
		return this.waitFor({
			id: new RegExp(id),
			matchers: new sap.ui.test.matchers.PropertyStrictEquals({
				name: name, 
				value: value
			}),
			success: function(oImage){
				sap.ui.test.Opa5.assert.ok(true, "Found matching image name '" + value + "'");
			},
			errorMessage: "Did not find matching image name -- Expected: '" + value + "'"
		});
	}
});