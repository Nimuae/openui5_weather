jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.Assertions");

hss.weather.test.opa.Assertions = new sap.ui.test.Opa5({
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

	iFindMatchingImageName: function(id, name, value){
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