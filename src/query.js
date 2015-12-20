(function () {
    var utils = {};

    /*
     * getElementsByClass:通过元素的样式类名获取一个元素集合
     * @parameter
     *    strClass:样式类名,可以是多个样式类名组合,例如:"w100 w200"
     *    context:获取元素集合的上下文
     * @return
     *    返回包含所匹配元素的"数组集合"
     */
    utils.getElementsByClass = function getElementsByClass(strClass, context) {
        //this->$dom
        context = context || document;

        //如果当前的浏览器兼容内置的getElementsByClassName方法的话,我们使用内置的方法
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }

        //如果不兼容内置的方法,则采用如下的代码实现我们的获取
        var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        this.each(tagList, function (curTag, index) {
            //在当前的元素上增加一个标识flag,记录自身的样式类名是否和我们传递进来的strClass吻合
            //使用假设法,假设是吻合的,那么接下来我只需要判断假设的是否正确即可
            curTag.flag = true;
            for (var k = 0; k < strAry.length; k++) {
                var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
                if (!reg.test(curTag.className)) {
                    curTag.flag = false;
                    break;
                }
            }
            curTag.flag ? ary[ary.length] = curTag : null;
        });
        return ary;
    };

    /*
     * children:获取当前元素下所有指定标签名的元素子节点集合
     * @parameter
     *    curEle:当前元素
     *    tagName:指定的标签名
     * @return
     *    [Array]符合条件的所有的元素子节点
     */
    utils.children = function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        this.each(nodeList, function (curNode, index) {
            //如果是元素子节点我们才会获取
            if (curNode.nodeType === 1) {
                //还需要判断tagName是否传递了
                //如果没有传递,默认是只要是元素子节点就是我们想要的
                //如果传递了,那么不仅仅是元素子节点而且标签名必须和我们的tagName保持一致才可以
                if (typeof tagName === "string") {
                    var curNodeLow = curNode.nodeName.toLowerCase();
                    var tagNameLow = tagName.toLowerCase();
                    if (curNodeLow === tagNameLow) {
                        ary[ary.length] = curNode;
                    }
                } else {
                    ary[ary.length] = curNode;
                }
            }
        });
        return ary;
    };

    //prev:获取当前元素的上一个哥哥元素节点
    utils.prev = function prev(curEle) {
        if ("previousElementSibling" in curEle) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    };

    //prevAll:获取当前元素的所有的哥哥元素节点
    utils.prevAll = function prevAll(curEle) {
        var pre = this.prev(curEle), ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    };

    //getIndex:获取当前元素的索引
    utils.getIndex = function getIndex(curEle) {
        return this.prevAll(curEle).length;
    };

    //next:获取当前元素的下一个弟弟元素节点
    utils.next = function next(curEle) {
        if ("nextElementSibling" in curEle) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex;
    };

    //nextAll:获取当前元素的所有的弟弟元素节点
    utils.nextAll = function nextAll(curEle) {
        var nex = this.next(curEle), ary = [];
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    };

    //sibling:获取当前元素的相邻两个兄弟元素节点(哥哥+弟弟)
    utils.sibling = function sibling(curEle) {
        var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
        pre ? ary[ary.length] = pre : null;
        nex ? ary[ary.length] = nex : null;
        return ary;
    };

    //siblings:获取当前元素的所有的兄弟元素节点
    utils.siblings = function siblings(curEle) {
        var preA = this.prevAll(curEle), nexA = this.nextAll(curEle);
        return preA.concat(nexA);
    };

    //first:获取当前元素指定标签名的所有元素子节点中的第一个
    utils.first = function first(curEle, tagName) {
        return this.children(curEle, tagName)[0];
    };

    //last:获取当前元素指定标签名字的所有元素子节点中的最后一个
    utils.last = function last(curEle, tagName) {
        var child = this.children(curEle, tagName);
        return child[child.length - 1];
    };

    window.zhufengDOM.extend(utils);
})();