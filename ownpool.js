function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}


// 封装运动框架
function move(obj,json,fn){
	// 防止多次点击，关掉上一个定时器
	clearInterval(obj.timer);
	// 开启定时器，obj.timer防止多个对象抢定时器
	obj.timer=setInterval(function(){
		// 开关门
		var bStop=true;
		// 传入的是一个对象，需要将对象中所有的值进行遍历
		for(var attr in json){
			// 因为offset的局限性太大，如果想要这个方法灵活多用只能获取非行间样式  考虑透明度是小数不能够直接取整，需要乘100在取整 getstyle 获取出来的是字符串
			var iCur=0;
			if(attr=="opacity"){
				iCur=parseInt(getStyle(obj,attr)*100);
			}else{
				iCur=parseInt(getStyle(obj,attr));
			}
			// 因为要做缓存运动，因此需要计算速度，速度是一个不定值公式（目标值-当前对象的位置）/系数 建议是8
			// 考虑计算机处理小数有问题，需要将小数干掉，我们要进行向上和向下取整
			// 算速度
			var speed=(json[attr]-iCur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			// 判断是否都已经到达终点 只要有一个没有到达终点就将bstop为false。循环完毕后判断bstop来决定关闭定时器
			if(json[attr]!=iCur){
				bStop=false;
			}
			// 考虑两部分，透明度是不需要加px因此需要单独判断，普通属性是需要加px
			if(attr=="opacity"){
				// 透明度兼容性
				obj.style.opacity=(iCur+speed)/100;
				obj.style.filter="alpha(opacity:"(iCur+speed)+")";
			}else{
				obj.style[attr]=(iCur+speed)+"px";
			}
		}
		// 当循环完毕后，判断bstop的转态来决定是否关闭定时器
		if (bStop) {
			clearInterval(obj.timer);
			// 链式操作
			fn&&fn();
		}
	},30)
}
// 随机验证码

// n:需要要多少位的验证码

function randomCode (n) {
	var str = "";
	for(var i=0;i<n;i++){
		var num = parseInt(48+Math.random()*(122-48+1));
		while((num>=58&& num<=64) || (num>=91&&num<=96)){
			num = parseInt(48+Math.random()*(122-48+1));
		}
		str+=String.fromCharCode(num);
	}

	return str;
}
