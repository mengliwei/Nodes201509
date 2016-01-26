(function () {
    var utils = {};

    /*
     * css:���û��߻�ȡԪ�ص�style��ʽֵ
     * @parameter
     *     curEle:Ҫ�����ĵ�ǰ��Ԫ��
     *     attr:Ҫ��������ʽ����
     *     value:Ҫ���õ�ֵ,�����������������ǻ�ȡ��ʽ,������������ʽ
     * @return
     *     ��ȡ����ʽֵ
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

    //setGroupCss:��������Ԫ�ص���ʽ����ֵ
    utils.setGroupCss = function setGroupCss(curEle, options) {
        this.each(options, function (item, key) {
            this.css(curEle, key, item);
        }, this);
    };

    //offset:��ȡ��ǰԪ�ؾ���body��ƫ����(��ƫ��top �� ��ƫ��left)
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

    //win:���û��߻�ȡ������ĺ���ģ����Ϣ
    utils.win = function (attr, value) {
        if (typeof value === "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };

    //hasClass:�жϵ�ǰԪ���Ƿ�ӵ��ĳһ����ʽ����
    utils.hasClass = function hasClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)");
        return reg.test(curEle.className);
    };

    //addClass:����ǰԪ��������ʽ����
    utils.addClass = function addClass(curEle, strClass) {
        if (!this.hasClass(curEle, strClass)) {
            curEle.className += " " + strClass;
        }
    };

    //removeClass:�Ƴ���ǰԪ�ص���ʽ����
    utils.removeClass = function removeClass(curEle, strClass) {
        var reg = new RegExp("(^| +)" + strClass + "( +|$)", "g");
        if (this.hasClass(curEle, strClass)) {
            curEle.className = curEle.className.replace(reg, " ");
        }
    };

    //toggleClass:�����ǰ��ʽ��������,�����Ƴ�,��������������
    utils.toggleClass = function toggleClass(curEle, strClass) {
        this.hasClass(curEle, strClass) ? this.removeClass(curEle, strClass) : this.addClass(curEle, strClass);
    };

    window.zhufengDOM.extend(utils);
})();