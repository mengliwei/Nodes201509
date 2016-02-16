//以下是动画的算法
var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
}

function getCss(ele,attr){
	//if("getComputedStyle" in window)
	if(window.getComputedStyle){
		return parseFloat(getComputedStyle(ele,null)[attr])
	}else{
		///专门处理IE6/7/8
		if(attr=="opacity"){
			//"alpha(opacity=50)"
			var str=ele.currentStyle.filter;
			var reg=/alpha\(opacity=(\d+)\)/;
			if(reg.test(str)){//如果写了滤镜的不透明度样式，这样可以匹配成功
				var value=RegExp.$1;
				return value/100;//为什么要除以100，按标准浏览器的原则
			}else{//如果没有写滤镜样式，则不会成功，则应该把默认的样式返回
				return 1;
			}
		}
		return parseFloat(ele.currentStyle[attr]);
	}
}

function setCss(ele,attr,value){
	if(attr=="opacity"){
		ele.style.opacity=value;
		ele.style.filter="alpha(opacity="+value*100+")";
	//}else if("left"||"width"||"top"||"height"){
		
	}else{
		ele.style[attr]=value+"px";
	}
}

function animate(ele,/* attr,target */ obj,duration,effect,callback){
	
	var fnEffect=zhufengEffect.Expo.easeOut;//首先设定默认值
	if(typeof effect =="number"){
		switch(effect){
			case 0://0是默认值，已经在上边设置，这里不需再做处理
				break;	
			case 1:
				fnEffect=zhufengEffect.zfLinear;
				break;
			case 2:
				fnEffect=zhufengEffect.Elastic.easeOut;
				break;
			case 3:
				fnEffect=zhufengEffect.Back.easeOut;
				break;
			case 4:
				fnEffect=zhufengEffect.zfBounce.easeOut;
				
		}
	}else if(effect instanceof Array){
		if(effect.length==1){
			
			fnEffect=zhufengEffect.zfLinear;	
		}else if(effect.length==2){
			//["back"]["easeOut"]这样是错的，则在下边处理
			fnEffect=zhufengEffect[effect[0]][effect[1]];	
		}
		
	}else if(typeof effect =="function"){//如果第四个参数是个函数，则将其做为回调函数来处理
		callback=effect;//把传进来的函数当回调函数处理
		//fnEffect不需要再赋值了，用默认值
		
	}
	if(typeof fnEffect!="function"){//避免风险的操作，为了让代码更健壮
		//fnEffect==zhufengEffect.back.easeOut
		//
		fnEffect=zhufengEffect.Expo.easeOut;//如果指定动画效果的参数是错误的，则在这儿做一次修正，以免在动画执行的时候报错	
	}
	var oBegin={};
	var oChange={};
	
	var flag=0;//标识变量，用来标识有几个有效方向
	for(var attr in obj){
		var begin=getCss(ele,attr);//计算每个方向的起始值
		var target=obj[attr];
		var change=target-begin;//计算每个方向的运动距离
		if(change){//只保存有效的方向（如果此方向的值无效（为0）则不保存）
			oBegin[attr]=begin;//然后再把begin和change保存在对应的对象里
			oChange[attr]=change;//
			flag++;//存在有效运动的方向，则让flag累加
		} 
	}
	if(flag===0)return;//如果没有有效运动的方向，则退出（以下代码统统不运行）
		var times=0;
		var interval=10;
		
		window.clearInterval(ele.timer);//防止动画积累的
		
		function step(){
			times+=interval;
			if(times<duration){
				for(var attr in oChange){
					//由于现在是多个方向的运动，所以step每执行一次，则需要把每个方向（attr）都计算一次。计算的时候，需要把每个方向的起始值（begin）和距离（change）都取出来进行计算
					
					var change=oChange[attr];//取出原来已经保存好的距离
					var begin=oBegin[attr];//取出原来已经保存好的起始位置
					var val=fnEffect(times,begin,change,duration);//计算此方向的当前位置
					setCss(ele,attr,val);//赋值
				}
			}else{
				for(var attr in oChange){//obj
					var target=obj[attr];//让每个方向都准确的到达目的地
					setCss(ele,attr,target);			
				}
				window.clearInterval(ele.timer);
				if(typeof callback=="function"){
					callback.call(ele);	
				}	
			}
		}
		ele.timer=window.setInterval(step,interval);	
}



