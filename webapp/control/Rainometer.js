jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.Rainometer");

jQuery.sap.includeStyleSheet("../control/Rainometer.css");

sap.ui.core.Control.extend("hss.weather.control.Rainometer", {
    metadata: {
        properties: {
            value: { type: "float", defaultValue: 0.0 },
            unit: { type: "string", defaultValue: "%" },
            showValue: { type: "boolean", defaultValue: false },
            size: { type: "int", defaultValue: 100 },
            overlay: { type: "string", defaultValue: "icons/raindrop.svg" }
        }
    },

    init: function(){
    },

    setValue: function(val){
        this.setProperty("value", Math.max(0, Math.min(100, val)));
    },

    renderer: {
        render: function(oRm, oControl){
            //outer
            oRm.addClass("Rainometer");
            oRm.addStyle("width", oControl.getSize() + "px");
            oRm.addStyle("height", oControl.getSize() + "px");
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
            oRm.addStyle("background-image", "url('" + oControl.getOverlay() + "')");
            oRm.write("<div");
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.write(">");

            oRm.write("</div>"); //closing tag overlay

            //outer > inner > gauge
            oRm.addClass("RainometerGauge");
            var val = oControl.getProperty("value");
            if(val > 5 && val < 95){
                oRm.addClass("RainometerGaugeTopBorder");
            }
            oRm.addStyle("height", val + "%");
            oRm.write("<div");
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.write(">");

            oRm.write("</div>"); //closing tag gauge

            oRm.write("</div>"); //closing tag inner

            //outer > inner > number
            if(oControl.getProperty("showValue")){
                oRm.addClass("RainometerNumber");
                oRm.write("<div");
                oRm.writeClasses();
                oRm.writeStyles();
                oRm.write(">");

                oRm.write("<span");
                oRm.addClass("RainometerNumberValue");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write(Number(oControl.getProperty("value")).toFixed(1));
                oRm.write("</span>");

                oRm.write("<span");
                oRm.addClass("RainometerNumberUnit");
                oRm.writeClasses();
                oRm.write(">");
                oRm.write(oControl.getProperty("unit"));
                oRm.write("</span>");

                oRm.write("</div>"); //closing tag number
            }

            oRm.write("</div>"); //closing tag outer
        }
    }
});