(function () {      curImg.src = this.src;
                    curImg.style.display = "block";
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i);
        }
    }
we]\]\q-=-08765wwertyuiop[]\
    ][poiuytrdeswaq[POIUYTDSAn、’u；5我去4今年投入【KLD JisG-P;TR]]//->实现自动轮播:实现无缝轮播滚动,当滚动到最后一张的时候,我们让其直接回到第一张
    //原理思路:首先把第一张复制一份一模一样的到最后位置,当前例子中一共有四张图片,我们把第一张放末尾一份,此时有五张;step=3的时候,
    // 我们1s后运动到第四张图片;step=4的时候,我们运动到第五张图片(其实也是第一张);step=5的时候,我们首先让inner.left值直接变为0,
    // 直接变到第一张(由于刚