var oTab=document.getElementById("tab");
var tHead=oTab.tHead;
var tBody=oTab.tBodies[0];
var oThs=tHead.rows[0].cells;
var oTrs=tBody.rows;
function bindDate(){
    var frg=document.createDocumentFragment();
    for(var i=0;i<jsonAry.length;i++){
        var oTr=document.createElement("tr");
        var cur=jsonAry[i];
        cur.sex=cur.sex===0?"男":"女";
        for(var key in cur){
            var oTd=document.createElement("td");
            oTd.innerHTML=cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg=null;
}
bindDate();
function changBg(){
    for(var i=0;i<oTrs.length;i++){
        oTrs[i].className="bg"+(i%2);
    }
}
changBg();
function sortList(n){
    var ary=[];
    try{ary=Array.prototype.slice.call(oTrs);
    }catch(e){
        for(var i=0;i<oTrs.length;i++){
            ary[ary.length]=oTrs[i];
        }
    }
    for(var k=0;k<oThs.length;k++){
        if(k!==n){
            oThs[k].flig*=-1;
        }
    }
    var _this=this;
    _this.flig*=-1;
    ary.sort(function(a,b){
        var curIn= a.cells[n].innerHTML;
        var nexIn= b.cells[n].innerHTML;
        var curInNum=parseFloat(curIn);
        var nexInNum=parseFloat(nexIn);
        if(isNaN(curIn)||isNaN(nexIn)){
            return(curIn.localeCompare(nexIn))*_this.flig;
        }
        return(curInNum-nexInNum)*_this.flig;
    });
    var frg=document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg=null;
    changBg();
}
for(var i=0;i<oThs.length;i++){
    oThs[i].flig=-1;
    oThs[i].mlw=i;
    oThs[i].onclick=function(){
        sortList.call(this,this.mlw)
    }
}
