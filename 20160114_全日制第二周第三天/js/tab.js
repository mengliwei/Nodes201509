//1、获取当前操作所需要的元素
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;//->表格独有的属性,获取指定table下的thead
var tBody = oTab.tBodies[0];//->获取指定table下的所有的tbody中的第一个
var oThs = tHead.rows[0].cells;//->获取tHead下所有行中的第一行下的所有的列 rows获取所有行 cells获取所有的列
var oTrs = tBody.rows;//->获取tBody下的所有的行

//2、实现数据绑定
function bindData() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < jsonAry.length; i++) {

        //事先进行数据的初始化处理
        var cur = jsonAry[i];
        cur.sex = cur.sex === 0 ? "男" : "女";

        //每一次循环都创建一个新的tr(创建一行)
        var oTr = document.createElement("tr");
        //oTr.className = "bg" + (i % 2);

        //每一行中还需要创建4个td
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = cur[key];
            oTr.appendChild(oTd);
        }

        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bindData();

//3、实现隔行变色
function changeBg() {
    for (var i = 0; i < oTrs.length; i++) {
        oTrs[i].className = "bg" + (i % 2);
    }
}
changeBg();

//4、实现表格排序






