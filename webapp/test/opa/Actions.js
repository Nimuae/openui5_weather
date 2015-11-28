jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.test.Opa5");
jQuery.sap.require("sap.ui.test.opaQunit");
jQuery.sap.declare("hss.weather.test.opa.Actions");

hss.weather.test.opa.Actions = new sap.ui.test.Opa5({
	/**
	 * Searches for control with matching property
	 * @param  {String} viewName      Name of view
	 * @param  {String} controlType   Control Type after which will be searched
	 * @param  {String} name          Property
	 * @param  {String} value         Value of the Property
	 * @return {[type]} waitFor       [description]
	 */
	iSearchControlWithMatchingProperty: function(viewName, controlType, name, value){
		return this.waitFor({
			viewName: viewName,
			controlType: controlType, //e.g sap.m.Label
			matchers: new sap.ui.test.matchers.PropertyStrictEquals({
				name: name, //e.g. text
				value: value
			}),
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Found the Control: '" + oControl + "'");
			},
			errorMessage: "Did not find the control with the property '" + value + "'"
		});
	},

	/**
	 * Searches control by id
	 * @param  {String} id        Id of Control after which will be searched
	 * @return {[type]} waitFor   [description]
	 */
	iSearchById: function(id){
		return this.waitFor({
			id: new RegExp(id),
			success: function(oControl){
				sap.ui.test.Opa5.assert.ok(true, "Found Control: " + oControl + " with ID: '" + id + "'");
			},
			errorMessage: "Did not find the control with the corresponding ID '" + id + "'"
		});
	},

	// iClickOnIcon: function(id){
	// 	return this.waitFor({
	// 		id: new RegExp(id),
	// 		success: function(oIcon){
	// 			sap.ui.test.Opa5.assert.ok(true, "Found Icon");
	// 			oIcon.firePress();

	// 		},
	// 		errorMessage: "Did not find icon with matching id (" + id +")"
	// 	});
	// }

});

