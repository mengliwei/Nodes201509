(function () {
    var utils = {};

    /*
     * css:设置或者获取元素的style样式值
     * @parameter
     *     curEle:要操作的当前的元素
     *     attr:要操作的样式属性
     *     value:要设置的值,如果这个参数不传递是获取样式,传递是设置样式
     * @return
     *     获取的样式值
     */
    utils.css = function css(curEle, attr, value) {
        //get style
        var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/;
        if (typeof value === "undefined") {
            var val = null;
            if ("getComputedStyle" in window) {
                val = window.getComputedStyle(curEle, null)[attr];
            } else {
                if (attr === "opacity") {
                    var temp = curEle.currentStyle["filter"], tempReg = /^alpha\(opacity=((?:\d|(?:[1-9]\d+))(?:\.\d+)?)\)$/;
                    val = tempReg.test(temp) ? tempReg.exec(temp)[1] : "1";
                    val = parseFloat(val) / 100;
                } else {
                    val = curEle.currentStyle[attr];
                }
            }
            return reg.test(val) ? parseFloat(val) : val;
        }

        //set style
        reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
        if (attr === "opacity") {
            if (value >= 0 && value <= 1) {
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            }
        } else if (attr === "float") {
            curEle["style"]["cssFloat"] = value;
            curEle["style"]["styleFloat"] = value;
        } else if (reg.test(attr)) {
            curEle["style"][attr] = isNaN(value) ? value : value + "px";
        } else {
            curEle["style"][attr] = value;
        }
    };

    //setGroupCss:批量设置元素的样式属性值
    utils.setGroupCss = function setGroupCss(curEle, options) {
        this.each(options, function (item, key) {
            this.css(curEle, key, item);
        }, this);
    };

    //offset:获取当前元素距离body的偏移量(上偏移top 和 左偏移left)
    utils.offset = function offset(curEle) {
        var p = curEle.offsetParent, l = curEle.offsetLeft, t = curEle.offsetTop;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    };

    //win:设置或者获取浏览器的盒子模型信息
    utils.win = function (attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };

    //hasClass:判断当前元素是否拥有某一个样式类名
    utils.hasClass = function hasClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(curEle.className);
    };

    //addClass:给当前元素增加样式类名
    utils.addClass = function addClass(curEle, strClass) {
        if (!this.hasClass(curEle, strClass)) {
            curEle.className += " " + strClass;
        }
    };

    //removeClass:移除当前元素的样式类名
    utils.removeClass = function removeClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
        if (this.hasClass(curEle, strClass)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    };

    //toggleClass:如果当前样式类名存在,则是移除,不存在则是增加
    utils.toggleClass = function toggleClass(curEle, strClass) {
        this.hasClass(curEle, strClass) ? this.removeClass(curEle, strClass) : this.addClass(curEle, strClass);
    };

    window.zhufengDOM.extend(utils);
})();