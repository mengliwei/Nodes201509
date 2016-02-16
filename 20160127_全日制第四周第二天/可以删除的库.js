(function () {
    //->getCss:获取当前元素的某一个样式属性的值
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
        reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->getCss:设置当前元素的某一个样式属性的值
    function setCss(curEle, attr, value) {
        if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
            return;
        }
        if (attr === "opacity") {
            value > 1 ? value = 1 : null;
            value < 0 ? value = 0 : null;
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        var reg = /^(width|height|(padding|margin(Top|Left|Right|Bottom))|top|left|right|bottom)$/;
        if (reg.test(attr)) {
            reg = /^-?\d+(\.\d+)?$/;
            if (reg.test(value)) {
                curEle["style"][attr] = value + "px";
                return;
            }
        }
        curEle["style"][attr] = value;
    }

    //->珠峰培训TWEEN算法公式
    var zhufengEffect = {
        //匀速
        Linear: function (t, b, c, d) {
            return c * t / d + b;
        }
    };

    //->实现我们的运动动画
    function animate(curEle, tarObj, duration, effect, callBack) {
        //->默认我们设置的动画是匀速的
        var fnEffect = zhufengEffect.Linear;
        var times = 0, beginObj = {}, changeObj = {};
        for (var key in tarObj) {
            if (tarObj.hasOwnProperty(key)) {
                beginObj[key] = getCss(curEle, key);
                changeObj[key] = tarObj[key] - beginObj[key];
            }
        }
        //->实现动画操作
        window.clearInterval(curEle.timer);
        curEle.timer = window.setInterval(function () {
            times += 10;
            //->到达目标位置了,我们结束定时器,并且设置当前元素的位置是目标值,并且执行我们的回调函数
            if (times >= duration) {
                window.clearInterval(curEle.timer);
                for (var key in tarObj) {
                    if (tarObj.hasOwnProperty(key)) {
                        setCss(curEle, key, tarObj[key]);
                    }
                }
                typeof callBack === "function" ? callBack.call(curEle) : null;
                return;
            }

            //->没有到达指定的位置,我们循环所有的方向,然后通过公式获取每一个方向的当前位置的值,然后给元素设置样式
            for (key in changeObj) {
                if (changeObj.hasOwnProperty(key)) {
                    var cur = fnEffect(times, beginObj[key], changeObj[key], duration);
                    setCss(curEle, key, cur);
                }
            }
        }, 10);
    }

    window.animate = animate;
})();