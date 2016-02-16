var utils = {
    /*1������ת����������ΪIE�²����ݣ���̫���׵�����ô�������ݣ�*/
    listToArray: function listToArray(curEle) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(curEle, 0);
        } catch (e) {
            for (var i = 0; i < curEle.length; i++) {
                ary[ary.length] = curEle[i];
            }
        }
        return ary;
    },
    /*2���ַ���ת��Ϊjson��ʽ���ַ���*/
    toJSON: function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    },
    offset: function offset(curEle) {
        var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
        while (p) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                t += p.clientTop;
                l += p.clientLeft;
            }
            t += p.offsetTop;
            l += p.offsetLeft;
            p = p.offsetParent;
        }
        return {top: t, left: l}
    },
    /*3�жϵ�ǰԪ���Ƿ����ĳ����ʽ����*/
    hasClass: function hasClass(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },
    /*4����ǰ��Ԫ��������ʽ����*/
    addClass: function addClass(curEle, cName) {
        if (!this.hasClass(curEle, cName)) {
            curEle.className = " " + cName;
        }
    },
    /*5����ǰԪ���Ƴ�ĳһ����ʽ����*/
    removeClass: function removeClass(curEle, cName) {
        if (this.hasClass(curEle, cName)) {
            var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    },
    /*6��ȡ��ǰԪ�������е�Ԫ���ӽڵ㣬���������tagֵ����˼�ǰ����е���Ԫ�ؽڵ����ٰѱ�ǩ��Ϊtag��ɸѡ����*/
    children: function children(curEle, tag) {
        var nodeList = curEle.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var cur = nodeList[i];
            if (cur.nodeType === 1) {
                if (typeof tag !== "undefined") {
                    var reg = new RegExp("^" + tag + "$", "i");
                    reg.test(cur.tagName) ? ary[ary.length] = cur : null;
                    continue;
                }
                ary[ary.length] = cur;
            }
        }
        return ary;
    }
    /*7��ȡ���������������غ���ģ����Ϣ*/
    win: function win(attr, value) {
        if (typeof value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    /*8��ȡ��ǰԪ�ؾ�����������������ʽ*/
    getCss: function getCss(curEle, attr) {
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
    },
    /*9��ȡ��ǰԪ�ص���һ�����Ԫ�ؽڵ�*/
    prev: function prev(curEle) {
        if ("previousElementSibling"in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    },
    /*10��ȡ��ǰԪ�ص����и��Ԫ�ؽڵ�*/
    prevAll: function prevAll(curEle) {
        var ary = [], pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },
    /*11��ȡ��ǰԪ�ص���һ���ܵ�Ԫ��*/
    next: function nxet(curEle) {
        if ("nextElementSibling"in curEle) {
            return curEle.nextElementSibling;
        }
        var next = curEle.nextSibling;
        while (next && next.nodeType !== 1) {
            next = next.nextSibling;
        }
        return next;
    },
    /*12��ȡ��ǰԪ�����еܵ�Ԫ�ؽڵ�*/
    nextAll: function nextAll(curEle) {
        var ary = [], nex = this.next(curEle);
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    },
    /*13��ȡ��ǰԪ�ص�����Ԫ�ؽڵ㣨���+�ܵܣ�*/
    sibling:function sibling(curEle){
        var pre=this.prev(curEle),nex=this.next(curEle),ary=[];
        pre?ary[ary.length]=pre:null;
        nex?ary[ary.length]=nex:null;
        return ary;
    },
    /*14��ȡ��ǰԪ�ص������ֵ�Ԫ�ؽڵ�*/
    siblings:function siblings(curEle){
        var preA=this.prevAll(curEle),nexA=this.nextAll(curEle);
        return preA.concat(nexA);
    },
    /*15��ȡ��ǰԪ��ָ����ǩ��������Ԫ���ӽڵ��еĵ�һ��*/
    first:function first(curEle,tagName){
        return this.children(curEle,tagName)[0];
    }
    /*16��ȡ��ǰԪ��ָ����ǩ��������Ԫ���ӽڵ��е����һ��*/
    last:function last(curEle,tagName){
        var child=this.children(curEle,tagName);
        return child[child.length-1];
    },
};