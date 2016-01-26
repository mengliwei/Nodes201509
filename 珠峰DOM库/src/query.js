(function () {
    var utils = {};

    /*
     * getElementsByClass:ͨ��Ԫ�ص���ʽ������ȡһ��Ԫ�ؼ���
     * @parameter
     *    strClass:��ʽ����,�����Ƕ����ʽ�������,����:"w100 w200"
     *    context:��ȡԪ�ؼ��ϵ�������
     * @return
     *    ���ذ�����ƥ��Ԫ�ص�"���鼯��"
     */
    utils.getElementsByClass = function getElementsByClass(strClass, context) {
        //this->$dom
        context = context || document;

        //�����ǰ��������������õ�getElementsByClassName�����Ļ�,����ʹ�����õķ���
        if ("getElementsByClassName" in document) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }

        //������������õķ���,��������µĴ���ʵ�����ǵĻ�ȡ
        var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        this.each(tagList, function (curTag, index) {
            //�ڵ�ǰ��Ԫ��������һ����ʶflag,��¼�������ʽ�����Ƿ�����Ǵ��ݽ�����strClass�Ǻ�
            //ʹ�ü��跨,�������Ǻϵ�,��ô��������ֻ��Ҫ�жϼ�����Ƿ���ȷ����
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
     * children:��ȡ��ǰԪ��������ָ����ǩ����Ԫ���ӽڵ㼯��
     * @parameter
     *    curEle:��ǰԪ��
     *    tagName:ָ���ı�ǩ��
     * @return
     *    [Array]�������������е�Ԫ���ӽڵ�
     */
    utils.children = function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        this.each(nodeList, function (curNode, index) {
            //�����Ԫ���ӽڵ����ǲŻ��ȡ
            if (curNode.nodeType === 1) {
                //����Ҫ�ж�tagName�Ƿ񴫵���
                //���û�д���,Ĭ����ֻҪ��Ԫ���ӽڵ����������Ҫ��
                //���������,��ô��������Ԫ���ӽڵ���ұ�ǩ����������ǵ�tagName����һ�²ſ���
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

    //prev:��ȡ��ǰԪ�ص���һ�����Ԫ�ؽڵ�
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

    //prevAll:��ȡ��ǰԪ�ص����еĸ��Ԫ�ؽڵ�
    utils.prevAll = function prevAll(curEle) {
        var pre = this.prev(curEle), ary = [];
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    };

    //getIndex:��ȡ��ǰԪ�ص�����
    utils.getIndex = function getIndex(curEle) {
        return this.prevAll(curEle).length;
    };

    //next:��ȡ��ǰԪ�ص���һ���ܵ�Ԫ�ؽڵ�
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

    //nextAll:��ȡ��ǰԪ�ص����еĵܵ�Ԫ�ؽڵ�
    utils.nextAll = function nextAll(curEle) {
        var nex = this.next(curEle), ary = [];
        while (nex) {
            ary[ary.length] = nex;
            nex = this.next(nex);
        }
        return ary;
    };

    //sibling:��ȡ��ǰԪ�ص����������ֵ�Ԫ�ؽڵ�(���+�ܵ�)
    utils.sibling = function sibling(curEle) {
        var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
        pre ? ary[ary.length] = pre : null;
        nex ? ary[ary.length] = nex : null;
        return ary;
    };

    //siblings:��ȡ��ǰԪ�ص����е��ֵ�Ԫ�ؽڵ�
    utils.siblings = function siblings(curEle) {
        var preA = this.prevAll(curEle), nexA = this.nextAll(curEle);
        return preA.concat(nexA);
    };

    //first:��ȡ��ǰԪ��ָ����ǩ��������Ԫ���ӽڵ��еĵ�һ��
    utils.first = function first(curEle, tagName) {
        return this.children(curEle, tagName)[0];
    };

    //last:��ȡ��ǰԪ��ָ����ǩ���ֵ�����Ԫ���ӽڵ��е����һ��
    utils.last = function last(curEle, tagName) {
        var child = this.children(curEle, tagName);
        return child[child.length - 1];
    };

    window.zhufengDOM.extend(utils);
})();