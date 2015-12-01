jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.CircleProgress");

jQuery.sap.includeStyleSheet("../control/CircleProgress.css");
jQuery.sap.includeScript("../resources/circle-progress.js");

sap.ui.core.Control.extend("hss.weather.control.CircleProgress", {
    metadata: {
        properties: {
            value: { type: "float", defaultValue: 0 },
            showValue: { type: "boolean", defaultValue: true },
            size: { type: "int", defaultValue: 100 },
            thickness: { type: "int", defaultValue: 0 },
            emptyFill: { type: "string", defaultValue: "#666" },
            lineCap: { type: "string", defaultValue: "round" },
            fill: { type: "object", defaultValue: { gradient: ["#009de0", "#00b0e8"] }}
        }
    },

    init: function(){
    },

    getPercentValue: function(){
        return Math.max(0, Math.min(Math.floor(this.getValue() * 100), 100));
    },

    renderer: {
        render: function(oRm, oControl){
            oRm.addClass("CircleProgress");
            oRm.addStyle("width", oControl.getSize() + "px");
            oRm.addStyle("height", oControl.getSize() + "px");
            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.writeClasses();
            oRm.writeStyles();
            oRm.write(">");

            if(oControl.getShowValue()){
                oRm.write("<div");
                oRm.addClass("CircleProgressNumber");
                oRm.addStyle("line-height", oControl.getSize() + "px");
                oRm.writeClasses();
                oRm.writeStyles();
                oRm.write(">");
                oRm.write(oControl.getPercentValue() + "%");
                oRm.write("</div>");
            }

            oRm.write("</div>");
        }
    },

    onAfterRendering: function(){
        var value = this.getValue();

        this.$().circleProgress({
            value: value,
            size: this.getSize(),
            animation: false,
            emptyFill: this.getEmptyFill(),
            lineCap: this.getLineCap(),
            startAngle: Math.PI/-2,
            thickness: this.getThickness() === 0 ? this.getSize() / 10 : this.getThickness(),
            fill: this.getFill()
        });
    }
});