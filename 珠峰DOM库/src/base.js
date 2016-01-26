(function () {
    var utils = {};

    /*
     * isNum、isStr、isBoo...检测数据类型的方法
     * @parameter
     *    value:要检测数据类型的数据
     * @return
     *    是否为对应的数据类型
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
     * each:实现数组和对象的遍历
     * @parameter
     *   cur:要操作的数组或者对象
     *   callback:每一次遍历要做的事情,方法中有三个参数:item->每一次遍历的当前项 index->每一次遍历的索引 input->原始的数组或者对象
     *   context:更改callback中的this关键字为context
     */
    zhufengDOM.each = function each(cur, callback, context) {
        if (typeof callback !== "function") return;
        context = context || window;

        //操作的是一个数组
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

        //对象中还有可能出现的是类数组(有length属性的对象)
        if (cur.hasOwnProperty("length")) {
            for (i = 0; i < cur.length; i++) {
                callback.call(context, cur[i], i, cur);
            }
            return;
        }

        //操作的是一个对象(禁止遍历原型上的公有属性)
        for (var key in cur) {
            if (cur.hasOwnProperty(key)) {
                callback.call(context, cur[key], key, cur);
            }
        }
    };

    /*
     * listToArray:实现将类数组转换为数组
     * @parameter
     *    likeAry:要转换的类数组
     * @return
     *    转换完成的数组
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
     * extend:在DOM库上扩展方法
     * @parameter
     *    options:包含扩展方法的对象集合
     */
    utils.extend = function extend(options) {
        this.each(options, function (item, key) {
            this[key] = item;
        }, this);
    };

    window.zhufengDOM = window.$dom = utils;
})();