var utils = {
    /*1类数组转化成数组因为IE下不兼容（不太明白到底怎么个不兼容）*/
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
    /*2把字符串转化为json格式的字符串*/
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
    /*3判断当前元素是否包含某个样式类名*/
    hasClass: function hasClass(curEle, cName) {
        var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)");
        return reg.test(curEle.className);
    },
    /*4给当前的元素增加样式类名*/
    addClass: function addClass(curEle, cName) {
        if (!this.hasClass(curEle, cName)) {
            curEle.className = " " + cName;
        }
    },
    /*5给当前元素移除某一个样式类名*/
    removeClass: function removeClass(curEle, cName) {
        if (this.hasClass(curEle, cName)) {
            var reg = new RegExp("(?:^| +)" + cName + "(?: +|$)", "g");
            curEle.className = curEle.className.replace(reg, " ");
        }
    },
    /*6获取当前元素下所有的元素子节点，如果传递了tag值，意思是把所有的子元素节点中再把标签名为tag的筛选出来*/
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
    /*7获取或者设置浏览器相关盒子模型信息*/
    win: function win(attr, value) {
        if (typeof value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    /*8获取当前元素经过浏览器计算过的样式*/
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
    /*9获取当前元素的上一个哥哥元素节点*/
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
    /*10获取当前元素的所有哥哥元素节点*/
    prevAll: function prevAll(curEle) {
        var ary = [], pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    },
    /*11获取当前元素的下一个弟弟元素*/
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
    /*12获取当前元素所有弟弟元素节点*/
    nextAll: function nextAll(curEle) {
        var ary = [], nex = this.next(curEle);
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    },
    /*13获取当前元素的相邻元素节点（哥哥+弟弟）*/
    sibling:function sibling(curEle){
        var pre=this.prev(curEle),nex=this.next(curEle),ary=[];
        pre?ary[ary.length]=pre:null;
        nex?ary[ary.length]=nex:null;
        return ary;
    },
    /*14获取当前元素的所有兄弟元素节点*/
    siblings:function siblings(curEle){
        var preA=this.prevAll(curEle),nexA=this.nextAll(curEle);
        return preA.concat(nexA);
    },
    /*15获取当前元素指定标签名的所有元素子节点中的第一个*/
    first:function first(curEle,tagName){
        return this.children(curEle,tagName)[0];
    }
    /*16获取当前元素指定标签名的所有元素子节点中的最后一个*/
    last:function last(curEle,tagName){
        var child=this.children(curEle,tagName);
        return child[child.length-1];
    },
};