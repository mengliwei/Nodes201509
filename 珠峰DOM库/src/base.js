(function () {
    var utils = {};

    /*
     * isNum��isStr��isBoo...����������͵ķ���
     * @parameter
     *    value:Ҫ����������͵�����
     * @return
     *    �Ƿ�Ϊ��Ӧ����������
     *
     * Example:isNum(12)->true  isAry("")->false ...
     */
    var numObj = {
        isNum: "Number",
        isStr: "String",
        isBoo: "Boolean",
        isNul: "Null",
        isUnd: "Undefined",
        isObj: "Object",
        isAry: "Array",
        isFun: "Function",
        isReg: "RegExp",
        isDate: "Date"
    }, isType = function () {
        var outerArg = arguments[0];
        return function () {
            var innerArg = arguments[0], reg = new RegExp("^\\[object " + outerArg + "\\]$", "i");
            return reg.test(Object.prototype.toString.call(innerArg));
        }
    };
    for (var key in numObj) {
        if (numObj.hasOwnProperty(key)) {
            utils[key] = isType(numObj[key]);
        }
    }

    /*
     * each:ʵ������Ͷ���ı���
     * @parameter
     *   cur:Ҫ������������߶���
     *   callback:ÿһ�α���Ҫ��������,����������������:item->ÿһ�α����ĵ�ǰ�� index->ÿһ�α��������� input->ԭʼ��������߶���
     *   context:����callback�е�this�ؼ���Ϊcontext
     */
    zhufengDOM.each = function each(cur, callback, context) {
        if (typeof callback !== "function") return;
        context = context || window;

        //��������һ������
        var i = 0;
        if (this.isAry(cur)) {
            if ("forEach" in Array.prototype) {
                cur.forEach(callback, context);
                return;
            }
            for (i = 0; i < cur.length; i++) {
                callback.call(context, cur[i], i, cur);
            }
            return;
        }

        //�����л��п��ܳ��ֵ���������(��length���ԵĶ���)
        if (cur.hasOwnProperty("length")) {
            for (i = 0; i < cur.length; i++) {
                callback.call(context, cur[i], i, cur);
            }
            return;
        }

        //��������һ������(��ֹ����ԭ���ϵĹ�������)
        for (var key in cur) {
            if (cur.hasOwnProperty(key)) {
                callback.call(context, cur[key], key, cur);
            }
        }
    };

    /*
     * listToArray:ʵ�ֽ�������ת��Ϊ����
     * @parameter
     *    likeAry:Ҫת����������
     * @return
     *    ת����ɵ�����
     */
    utils.listToArray = function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry);
        } catch (e) {
            this.each(likeAry, function (item, index) {
                ary[ary.length] = item;
            });
        }
    };

    /*
     * extend:��DOM������չ����
     * @parameter
     *    options:������չ�����Ķ��󼯺�
     */
    utils.extend = function extend(options) {
        this.each(options, function (item, key) {
            this[key] = item;
        }, this);
    };

    window.zhufengDOM = window.$dom = utils;
})();