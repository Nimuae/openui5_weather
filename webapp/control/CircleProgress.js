jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.CircleProgress");

jQuery.sap.includeStyleSheet("../control/CircleProgress.css");

sap.ui.core.Control.extend("hss.weather.control.CircleProgress", {
    metadata: {
        properties: {
            value: { type: "float", defaultValue: 0 },
            min: { type: "integer", defaultValue: 0 },
            max: { type: "integer", defaultValue: 100 },
            showValue: { type: "boolean", defaultValue: false },
            size: { type: "integer", defaultValue: 100 }
        }
    },

    init: function(){
    },

    setValue: function(val){
        //set bound for value to min and max
        this.setProperty("value", Math.max(this.getProperty("min"), Math.min(this.getProperty("max"), val)));
    },

    getPercentValue: function(){
        var v = this.getProperty("value");
        var min = this.getProperty("min");
        var max = this.getProperty("max");
        var range = Math.abs(max - min);
        return Number((v - min) / range).toFixed(2) * 100;
    },

    renderer: {
        render: function(oRm, oControl){
            var size = oControl.getProperty("size");

            //outer
            oRm.addClass("CircleProgress");
            oRm.write("<div");
            oRm.writeControlData(oControl);

            oRm.writeClasses();
            oRm.write(">");

                oRm.addClass("CircleProgressInner");
                oRm.addStyle("width", size + "px");
                oRm.addStyle("line-height", size + "px");
                oRm.write("<div");
                oRm.writeStyles();
                oRm.writeClasses();
                oRm.write(">");

                    oRm.addClass("CircleProgressGauge");
                    oRm.addStyle("border-width", Math.floor(oControl.getPercentValue()/2) + "px");
                    oRm.write("<div");
                    oRm.writeClasses();
                    oRm.writeStyles();
                    oRm.write(">");
                    oRm.write("</div>");

                oRm.write("</div>");

            oRm.write("</div>");
        }
    }
});