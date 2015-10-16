jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.Rainometer");

jQuery.sap.includeStyleSheet("../control/Rainometer.css");

sap.ui.core.Control.extend("hss.weather.control.Rainometer", {
	metadata: {
		properties: {
			value: { type: "float", defaultValue: 0.0 }
		}
	},

	init: function(){
	},

	renderer: {
		render: function(oRm, oControl){
			//outer
			oRm.addClass("Rainometer");
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeStyles();
            oRm.writeClasses();
            oRm.write(">");

            //outer > inner
            oRm.addClass("RainometerInner");
            oRm.write("<div");
            oRm.writeClasses();
            oRm.write(">");

            //outer > inner > overlay
            oRm.addClass("RainometerOverlay");
            oRm.write("<div");
            oRm.writeClasses();
            oRm.write(">");

            oRm.write("</div>"); //closing tag overlay

            //outer > inner > gauge
            oRm.addClass("RainometerGauge");
            oRm.addStyle("height", oControl.getValue() + "%");
            oRm.write("<div");
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.write(">");

            oRm.write("</div>"); //closing tag gauge

            oRm.write("</div>"); //closing tag inner

            oRm.write("</div>"); //closing tag outer
		}
	}
});