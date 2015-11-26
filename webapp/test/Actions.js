jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.Actions");

hss.weather.test.Actions = new sap.ui.test.Opa5({
	iSearchControlWithMatchingProperty: function(viewName, controlType, name, value){
		return this.waitFor({
			viewName: viewName,
			controlType: controlType, //e.g sap.m.Label
			matchers: new sap.ui.test.matchers.PropertyStrictEquals({
				name: name, //e.g. text
				value: value
			}),
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Found the Control: " + oControl)
			},
			errorMessage: "Did not find the control with the property " + value
		});
	},

	iSearchById: function(id){
		return this.waitFor({
			id: new RegExp("town"),
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Found Control: " + oControl + " with ID: " + id);
			},
			errorMessage: "Did not find the control with the corresponding ID " + id
		});
	}
});

