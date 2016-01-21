/* @author Dominic Holzwarth */

jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.Compass");

jQuery.sap.includeStyleSheet("../control/Compass.css");

sap.ui.core.Control.extend("hss.weather.control.Compass", {
    metadata: {
        properties: {
            direction: { type: "int", defaultValue: 0 }
        }
    },

    init: function(){
    },

    renderer: {
        render: function(oRm, oControl){
            //outer
            oRm.addClass("Compass");
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeStyles();
            oRm.writeClasses();
            oRm.write(">");

                oRm.addClass("CompassNeedle");
                oRm.addStyle("transform", "rotate(" + (oControl.getProperty("direction") || 0) + "deg)");
                oRm.write("<div");
                oRm.writeControlData(oControl);
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write(">");

                oRm.write("</div>"); //closing tag needle

            oRm.write("</div>"); //closing tag outer
        }
    }
});