(function () {
    function getCss(curEle, attr) {
        var val = reg = null;
        if (window.getComputedStyle) {
            val = window.getComputedStyle(curEle, null)[attr];
        } else {
            if (attr === "opacity") {
                val = curEle.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|pe|rem)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    function setCss(curEle, attr, value) {
        var reg = /^(width|height|top|bottom|left|right|(margin|padding(Right|Left|Top|Bottom)?))$/;
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else {
            if (reg.test(attr)) {
                curEle["style"][attr] = isNaN(value) ? value : value + "px";
            }
        }
        curEle["style"][attr] = value;
    }
function Liner(){

}
})
();