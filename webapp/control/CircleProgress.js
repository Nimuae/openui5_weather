/* @author Dominic Holzwarth */

jQuery.sap.require("sap.ui.core.Control");
jQuery.sap.declare("hss.weather.control.CircleProgress");

jQuery.sap.includeStyleSheet("../control/CircleProgress.css");
jQuery.sap.includeScript("../resources/circle-progress.js");

sap.ui.core.Control.extend("hss.weather.control.CircleProgress", {
    metadata: {
        properties: {
            value: { type: "float", defaultValue: 0 },
            min: { type: "int", defaultValue: 0 },
            max: { type: "int", defaultValue: 100 },
            showValue: { type: "boolean", defaultValue: true },
            size: { type: "int", defaultValue: 100 },
            thickness: { type: "int", defaultValue: 0 },
            emptyFill: { type: "string", defaultValue: "#666" },
            lineCap: { type: "string", defaultValue: "butt" },
            fill: { type: "object", defaultValue: { gradient: ["#009de0", "#00b0e8"] }}
        }
    },

    init: function(){
    },

    setValue: function(value) {
        var iMin = this.getMin();
        var iMax = this.getMax();

        if(value < iMin) {
            console.error("Circle Progress: Value " + value + " is out of bounds.");
            this.setProperty("value", iMin);
            return;
        }
        if(value > iMax) {
            console.error("Circle Progress: Value " + value + " is out of bounds.");
            this.setProperty("value", iMax);
            return;
        }
        this.setProperty("value", value);
    },

    getPercentValue: function(){
        return this._getFValue()*100;
    },

    _getFValue: function() {
        var fValue = this.getValue();
        var iMin = this.getMin();
        var iMax = this.getMax();

        var iDiff = iMax - iMin;
        if(iDiff === 0) {
            return;
        }

        var fValue2;
        if(fValue >= 0 && fValue <= 1) {
            fValue2 = fValue;
        }else{
            fValue2 = fValue / iDiff;
        }
        return fValue2;
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
                oRm.write(Math.floor(oControl.getPercentValue()) + "%");
                oRm.write("</div>");
            }

            oRm.write("</div>");
        }
    },

    onAfterRendering: function(){
        var fValue = this._getFValue();

        this.$().circleProgress({
            value: fValue,
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