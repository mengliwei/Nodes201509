var mutils = {
    offset: function (curEle) {
        var t = curEle.offsetTop, l = curEle.offsetLeft, p = curEle.offsetParent;
        while (p) {
            if(navigator.userAgent.indexOf("MSIE 8.0")===-1){
                t+= p.clientTop;
                l+= p.clientLeft;
            }
            t += p.offsetTop;
            l += p.offsetLeft;
            p = p.offsetParent;
        }
        return {top: t, left: l};
    }
};