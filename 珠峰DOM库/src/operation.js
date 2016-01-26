(function () {
    var utils = {};

    //attr:��ȡ�������õ�ǰԪ�ص��Զ�������
    utils.attr = function attr(curEle, attr, value) {
        if (typeof value === "undefined") {
            return attr === "class" ? curEle.className : curEle.getAttribute(attr);
        }
        attr === "class" ? curEle.className = value : curEle.setAttribute(attr, value);
    };

    //html:��ȡ�������õ�ǰԪ�ص�����
    utils.html = function html(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.innerHTML;
        }
        curEle.innerHTML = value;
    };

    //val:��ȡ�������õ�ǰ��Ԫ�ص�valueֵ
    utils.val = function val(curEle, value) {
        if (typeof value === "undefined") {
            return curEle.value;
        }
        curEle.value = value;
    };

    //prepend:��ָ�������Ŀ�ͷ����Ԫ��(����query.js)
    utils.prepend = function prepend(container, newEle) {
        var fir = this.first(container);
        fir ? container.insertBefore(newEle, fir) : container.appendChild(newEle);
    };

    //insertAfter:��ָ��������ĳ��Ԫ��֮ǰ������Ԫ��(����query.js)
    utils.insertAfter = function insertAfter(oldEle, newEle) {
        var nex = this.next(oldEle), par = oldEle.parentNode;
        nex ? par.insertBefore(newEle, nex) : par.appendChild(newEle);
    };

    window.zhufengDOM.extend(utils);
})();