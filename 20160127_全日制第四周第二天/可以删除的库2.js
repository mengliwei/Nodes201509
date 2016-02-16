(function () {
    //getCss
    function getCss(curEle, attr) {
        var val = reg = null;
        if ("getComputedStyle"in window) {
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
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //setCss
    function setCss(curEle, attr, value) {
        var reg = /^(width|height|(padding|margin(Top|Left|Right|Bottom))|top|left|right|bottom)$/;
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    }

    //动画公式
    function Liner(t, b, c, d) {
        return c * t / d + b;
    }

    //匀速
    function animate(curEle, tarObj, duration, effect, callback) {
        var fnEffect = Liner();
        var times = 0, beginObj = {}, changObj = {};
        for (var key in tarObj) {
            if (tarObj.hasOwnProperty(key)) {
                beginObj[key] = getCss(curEle, key);
                changObj[key] = tarObj[key] - beginObj[key];
            }
        }
        window.clearInterval(curEle.timer);
        curEle.timer = window.setInterval(function () {
            times += 10;
            if (times >= duration) {
                window.clearInterval(curEle.timer);
                for (var key in tarObj) {
                    if (tarObj.hasOwnProperty(key)) {
                        setCss(curEle, key, tarObj[key]);
                    }
                }
            }
            for(var key in changObj){
                if(changObj.hasOwnProperty(key)){
                    var cur=Liner(times,beginObj[key],changObj[key],duration);
                    setCss(curEle,key,cur);
                }
            }
        }, 10)
    }
    window.animate=animate;
})();