/*
	随机数
	参数：
		n:起始数字
		m:范围
 */
function numRandom(n, m) {
	if(n > m) {
		return parseInt(m + Math.random() * (n - m + 1));
	} else {
		return parseInt(n + Math.random() * (m - n + 1));
	}
}
/*
冒泡排序
 */
function bubbleSort(arr) {
	var temp;
	for(var i = 1; i < arr.length; i++) {
		for(var j = 0; j < arr.length - i; j++) {
			if(arr[j] > arr[j + 1]) {
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}

	return arr;
}

/*
选择排序

 */
function selectSort(arr) {
	var temp;
	for(var i = 0; i < arr.length - 1; i++) {
		for(var j = i + 1; j < arr.length; j++) {
			if(arr[i] > arr[j]) {
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}

	}
	return arr;
}

/*
快速排序法

 */

function quickSort(arr) {
	if(arr.length <= 1) {
		return arr;
	}

	//获取下标
	var midIndex = arr.length % 2 == 0 ? arr.length / 2 : (arr.length + 1) / 2;
	//取中间值
	var mid = arr[midIndex];
	//定义左边的数组
	var left = [];
	//定义右边的数组
	var right = [];

	for(var i = 0; i < arr.length; i++) {
		if(i != midIndex && arr[i] <= mid) {
			left.push(arr[i]);
		}

		if(i != midIndex && arr[i] > mid) {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat(mid).concat(quickSort(right))
}

/*
随机验证码

n:需要要多少位的验证码
 */
function randomCode(n) {
	var str = "";
	for(var i = 0; i < n; i++) {
		var num = parseInt(48 + Math.random() * (122 - 48 + 1));
		while((num >= 58 && num <= 64) || (num >= 91 && num <= 96)) {
			num = parseInt(48 + Math.random() * (122 - 48 + 1));
		}
		str += String.fromCharCode(num);
	}

	return str;
}

/*
随机颜色

 */

function randomToColor() {
	var R = numRandom(0, 255);
	var G = numRandom(0, 255);
	var B = numRandom(0, 255);

	return "rgb(" + R + "," + G + "," + B + ")";
}

/*
随机颜色2
 */
function randomTo2Color() {
	var R = numRandom(0, 255)
	var G = numRandom(0, 255)
	var B = numRandom(0, 255)

	return kzero(R, G, B);
}

function kzero(r, g, b) {
	r = r.toString(16).length < 2 ? "0" + r.toString(16) : r.toString(16)
	g = g.toString(16).length < 2 ? "0" + g.toString(16) : g.toString(16)
	b = b.toString(16).length < 2 ? "0" + b.toString(16) : b.toString(16)

	return "#" + r + g + b;
}

/*
将时间对象转换为字符串
 */
function dateToString(d, sign) {
	if(!sign) {
		sign = "/";
	}

	return d.getFullYear() + sign + dzero((d.getMonth() + 1)) + sign + dzero(d.getDate()) + " " + dzero(d.getHours()) + ":" + dzero(d.getMinutes()) + ":" + dzero(d.getSeconds())
}

function dzero(n) {
	if(n < 10) {
		return "0" + n;
	}

	return n;
}

/*
倒计时
 */
function cDown(time) {
	var day = Math.floor(time / (24 * 60 * 60 * 1000));
	var h = Math.floor(time % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
	var m = Math.floor(time % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
	var s = Math.floor((time % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000));
	return {
		day: day,
		h: h,
		m: m,
		s: s
	}
}

//cookie的获取设置和删除
function setCookie(key, val, expires) {
	var d = new Date();
	d.setDate(d.getDate() + expires);

	document.cookie = key + "=" + val + ";path=/;expires=" + d;
}

//删除
function removeCookie(key, val) {
	setCookie(key, val, -1)
}

//获取
function getCookie(key) {
	var cookie = document.cookie;
	var arr = cookie.split("; ");
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");
		if(key == newArr[0]) {
			return newArr[1];
		}
	}
}

//获取非行内样式
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//运动封装函数

function move(obj, json, fn) {
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		var bStop = true;
		for(var attr in json) {
			var iCur = 0;
			if(attr == "opacity") {
				iCur = parseInt(getStyle(obj, attr) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}

			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(json[attr] != iCur) {
				bStop = false;
			}
			if(attr == "opacity") {
				obj.style.opacity = (iCur + speed) / 100;
				obj.style.filter = "alpha(opacity:" + (iCur + speed) + ")";
			} else {
				obj.style[attr] = (iCur + speed) + "px";

			}
		}
		if(bStop) {
			clearInterval(obj.timer);
			fn && fn();
		}
	}, 30)

}

//轮播函数封装
function Swiper(container, options) {
	this.oBanner = document.querySelector(container);
	this.oUl = this.oBanner.getElementsByTagName("ul")[0];
	this.aLi = this.oUl.getElementsByTagName("li");
	this.prevEl = this.oBanner.querySelector(options.prevEl);
	this.nextEl = this.oBanner.querySelector(options.nextEl);
	this.aBtn = this.oBanner.querySelectorAll(options.circle + ">a");
	this.iNow = 0;
	this.timer = null;
}

//	function Banner() {
//		this.oBanner = document.getElementById("banner");
//		this.oUl = document.querySelector("#banner>ul");
//		this.aLi = this.oUl.getElementsByTagName("li")
//		this.aDir = document.querySelectorAll("#dir>a");
//		this.aBtn = document.querySelectorAll("#btn>a");
//		this.iNow = 0;
//		this.timer = null;
//
//	}
Swiper.prototype.init = function() {
	this.iWidth = this.aLi[0].offsetWidth;
	var li = this.aLi[0].cloneNode(true);
	this.oUl.appendChild(li);
	this.oUl.style.width = this.iWidth * this.aLi.length + "px";
	this.autoPlay();
	this.over();
	this.out();
	this.prev();
	this.next();
	this.toggle();
}

Swiper.prototype.over = function() {
	var _this = this;
	this.oBanner.onmouseover = function() {
		clearInterval(_this.timer)
	}

}

Swiper.prototype.out = function() {
	var _this = this;
	this.oBanner.onmouseout = function() {
		_this.autoPlay()
	}
}

Swiper.prototype.prev = function() {
	var _this = this;
	this.prevEl.onclick = function() {
		if(_this.iNow == 0) {
			_this.iNow = _this.aLi.length - 2;
			_this.oUl.style.left = -(_this.aLi.length - 1) * _this.aLi[0].offsetWidth + "px";

		} else {
			_this.iNow--;
		}

		_this.toImg();

	}
}
Swiper.prototype.next = function() {
	var _this = this;
	this.nextEl.onclick = function() {
		if(_this.iNow == _this.aLi.length - 1) {
			_this.iNow = 1;
			_this.oUl.style.left = 0;
		} else {
			_this.iNow++;
		}

		_this.toImg();
	}
}

Swiper.prototype.toggle = function() {
	var _this = this;
	for(var i = 0; i < this.aBtn.length; i++) {
		this.aBtn[i].index = i;
		this.aBtn[i].onmouseover = function() {
			for(var j = 0; j < _this.aBtn.length; j++) {
				_this.aBtn[j].className = ""
			}
			this.className = "active";
			_this.iNow = this.index;
			_this.toImg();
		}
	}
}

Swiper.prototype.autoPlay = function() {
	var _this = this;
	this.timer = setInterval(function() {
		if(_this.iNow == _this.aLi.length - 1) {
			_this.iNow = 1;
			_this.oUl.style.left = 0;
		} else {
			_this.iNow++;
		}

		_this.toImg();
	}, 3000)
}

Swiper.prototype.toImg = function() {
	move(this.oUl, {
		left: -this.iNow * this.iWidth
	})
	for(var i = 0; i < this.aBtn.length; i++) {
		this.aBtn[i].className = "";
	}

	this.aBtn[this.iNow == this.aLi.length - 1 ? 0 : this.iNow].className = "active";
}

//拖拽=封装函数
function Drag(el) {
	this.el = document.querySelector(el);
}
Drag.prototype.init = function() {
	this.down()
}
Drag.prototype.down = function() {
	var _this = this;
	this.el.onmousedown = function(e) {
		var e = e || event;
		_this.disX = e.offsetX;
		_this.disY = e.offsetY;
		_this.iWidth = document.documentElement.clientWidth - this.offsetWidth;
		_this.iHeight = document.documentElement.clientHeight - this.offsetHeight;
		document.onmousemove = function(e) {
			var e = e || event;
			_this.move(e);
		}
		document.onmouseup = function() {
			_this.up();
		}
	}
}
Drag.prototype.move = function(ev) {
	var l = ev.clientX - this.disX;
	var t = ev.clientY - this.disY;
	l = l > this.iWidth ? this.iWidth : (l < 0 ? 0 : l);
	t = t > this.iHeight ? this.iHeight : (t < 0 ? 0 : t);

	//		l = l>this.iWidth?this.iWidth:(l<0?0:l);
	//		t = t>this.iHeight?this.iHeight:(t<0?0:t);

	this.el.style.left = l + "px";
	this.el.style.top = t + "px";
}
Drag.prototype.up = function() {
	document.onmousemove = null;
}
//放大镜

function Magnifier(container, options) {
	this.content = document.querySelector(container);
	this.minImg = this.content.querySelector(options.minImg);
	this.middle = this.content.querySelector(options.middle);
	this.bigImg = this.content.querySelector(options.bigImg);
	this.filter = this.content.querySelector(options.filter);
	this.box = this.content.querySelector(options.box);
	this.max = this.content.querySelector(options.max);
}
Magnifier.prototype.init = function() {
	var str = "";
	for(var i = 0; i < 5; i++) {
		str += "<img src=img/" + (i + 1) + "-small.jpg class='small'  data-url=img/" + (i + 1) + "-large.jpg>";
	}
	this.minImg.innerHTML = str;
	this.over();
	this.boxOver();
	this.filterMove();
	this.boxOut();
}
Magnifier.prototype.over = function() {
	var _this = this;
	this.minImgs = this.minImg.querySelectorAll("img");
	for(var i = 0; i < this.minImgs.length; i++) {
		this.minImgs[i].onmouseover = function() {
			_this.src = this.getAttribute("data-url");
			_this.middle.src = _this.src;
			_this.bigImg.src = _this.src;
		}
	}
}

Magnifier.prototype.boxOver = function() {
	var _this = this;
	this.box.onmouseover = function() {
		_this.filter.style.display = "block";
		_this.max.style.display = "block";
	}
}

Magnifier.prototype.filterMove = function() {
	var _this = this;
	this.filter.onmousemove = function(e) {
		var e = e || event;
		var l = e.pageX - _this.content.offsetLeft - this.offsetWidth / 2;
		var t = e.pageY - _this.content.offsetTop - this.offsetHeight / 2;

		l = l > _this.box.offsetWidth - this.offsetWidth ? _this.box.offsetWidth - this.offsetWidth : (l < 0 ? 0 : l);
		t = t > _this.box.offsetHeight - this.offsetHeight ? _this.box.offsetHeight - this.offsetHeight : (t < 0 ? 0 : t);
		this.style.left = l + "px";
		this.style.top = t + "px";

		_this.bigImg.style.left = -2 * l + "px";
		_this.bigImg.style.top = -2 * t + "px";
	}
}

Magnifier.prototype.boxOut = function() {
	var _this = this;
	this.box.onmouseout = function() {
		_this.filter.style.display = "none";
		_this.max.style.display = "none";
	}
}
//蒙版
function Mask(container, options) {
	this.oCon = document.getElementById(container);
	this.oBox = document.getElementById(options.oBox);
	this.oBtn = document.getElementById(options.oBtn);

	this.oClose = document.querySelector(options.oClose);
	this.oDrag = document.querySelector(options.oDrag);

}

Mask.prototype.maskoBtn = function() {
	var _this = this;
	this.oBtn.onclick = function() {
		_this.oBox.style.display = "block";
		_this.oCon.style.display = "block";
		_this.iWidth = document.documentElement.clientWidth / 2 - _this.oCon.offsetWidth / 2;
		_this.iHeight = document.documentElement.clientHeight / 2 - _this.oCon.offsetHeight / 2;

		_this.oCon.style.left = _this.iWidth + "px";
		_this.oCon.style.top = _this.iHeight + "px";
	}
}

Mask.prototype.init = function() {
	this.maskoBtn();
	this.down();
}

Mask.prototype.down = function() {
	var _this = this;
	console.log(this.oDrag)
	this.oDrag.onmousedown = function(e) {
		var e = e || event;
		_this.disX = e.offsetX;
		_this.disY = e.offsetY;
		document.onmousemove = function(e) {
			var e = e || event;
			_this.move(e)

		}
		document.onmouseup = function() {

			_this.up(e);
		}
	}
}

Mask.prototype.move = function(ev) {

	ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
	var l = ev.clientX - this.disX;
	var t = ev.clientY - this.disY;
	l = l > document.documentElement.clientWidth - this.oCon.offsetWidth ? document.documentElement.clientWidth - this.oCon.offsetWidth : (l < 0 ? 0 : l);
	t = t > document.documentElement.clientHeight - this.oCon.offsetHeight ? document.documentElement.clientHeight - this.oCon.offsetHeight : (t < 0 ? 0 : t);

	this.oCon.style.left = l + "px";
	this.oCon.style.top = t + "px";
}

Mask.prototype.up = function() {
	document.onmousemove = null;
	document.onmouseup = null;
}
//简单版的打字游戏
function typingGame() {
	this.oScore = document.getElementById("score");
	this.num = 0;
	this.timer = null;
}
typingGame.prototype.init = function() {
	this.create();
	this.onKeyPress1();
}

typingGame.prototype.create = function() {
	var _this = this;
	setInterval(function() {
		_this.div = document.createElement("div");
		_this.n = String.fromCharCode(parseInt(65 + Math.random() * (90 - 65 + 1)));
		_this.div.innerText = _this.n;
		_this.div.style.top = 0;
		_this.div.style.left = parseInt(200 + Math.random() * (1000 - 200)) + "px";
		document.body.appendChild(_this.div);
		_this.move(_this.div);
	}, 500)

}

typingGame.prototype.move = function(obj) {
	var _this = this;
	setInterval(function() {
		_this.speed = 2;
		if(obj.offsetTop >= 500) {
			obj.remove();
		}
		obj.style.top = obj.offsetTop + _this.speed + "px";
	}, 30)
}
typingGame.prototype.onKeyPress1 = function() {
	var _this = this;

	document.onkeypress = function(e) {

		_this.aDiv = document.getElementsByTagName("div");

		var e = e || event;
		var code = e.keyCode || e.which;

		for(var i = 0; i < _this.aDiv.length; i++) {
			var code1 = _this.aDiv[i].innerText.charCodeAt(0);
			if(code1 == code) {

				_this.num++;
				_this.aDiv[i].remove();
				_this.oScore.innerText = "得分:" + _this.num
				break;
			}
		}

	}
}
//吸顶
function returnTop(container) {
	this.box = document.getElementById(container);

}
returnTop.prototype.init = function() {
	this.sTOP();
	this.boxClick();
}
returnTop.prototype.sTOP = function() {
	var _this = this;
	window.onscroll = function() {
		_this.box.sTop = document.documentElement.scrollTop || document.body.scrollTop;

		if(_this.box.sTop > 400) {
			_this.box.style.display = "block";
		} else {
			_this.box.style.display = "none";
		}
	}
}
returnTop.prototype.boxClick = function() {
	this.box.onclick = function() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
}
//二级导航
function twoLevelNavigation(container, options) {
	this.oNav = document.getElementById(container);
	this.aLi = this.oNav.querySelectorAll(options.aLi);
}
twoLevelNavigation.prototype.init = function() {
	this.twoStart();
}
twoLevelNavigation.prototype.twoStart = function() {
	for(var i = 0; i < this.aLi.length; i++) {
		var _this = this;
		//给每一个li添加一个鼠标移入事件
		this.aLi[i].onmouseover = function() {
			//给a标签添加active
			_this.over(this);

		}
		//鼠标移出的时候将a标签的颜色移除
		this.aLi[i].onmouseout = function() {
			//给a标签添加active

			_this.out(this);

		}
	}
}
twoLevelNavigation.prototype.over = function(that) {
	//	console.log(this)
	that.a = that.children[0];
	that.a.className = "active";

	//将二级导航显示
	that.ul = that.children[1];
	that.ul.style.display = "block";

	//当移入二级导航的时候给二级导航添加active
	that.aA = that.ul.children;
	for(var k = 0; k < that.aA.length; k++) {
		that.aA[k].onmouseover = function() {
			that.className = "active";
		}
	}
}
twoLevelNavigation.prototype.out = function(that) {
	that.a = that.children[0];
	that.a.className = "";

	//将二级导航隐藏
	that.ul = that.children[1];
	if(that.ul) {
		that.ul.style.display = "none";

		//当移入二级导航的时候将颜色去掉
		that.aA = that.ul.children;
		for(var k = 0; k < that.aA.length; k++) {
			that.aA[k].className = "";
		}
	}
}
//进度条封装
function progressBar(container, options) {
	this.parent = document.getElementById(container);
	this.child = document.getElementById(options.child);
	this.timer = null;
}
progressBar.prototype.init = function() {
	this.go();
}
progressBar.prototype.go = function() {
	var _this = this;
	timer = setInterval(function() {
		var speed = parseInt(Math.random() * 4);

		if(_this.child.offsetWidth > _this.parent.offsetWidth) {
			clearInterval(_this.timer)
		} else {
			_this.child.style.width = _this.child.offsetWidth + speed + "px";
		}

	}, 30)
}
//ajax 封装
function ajax(options) {
	
	var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHttp");
	var str = "";
	
	for(var key in options.data) {
		str += "&" + key + "=" + options.data[key];
	}
	str = str.slice(1);
	
	if(options.type == "get") {
	
		xhr.open("get", options.url + "?" + str);
		xhr.send()
	} else if(options.type == "post") {
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.open("post", options.url);
		xhr.send(str);
	}
		
	xhr.onreadystatechange = function() {
	
		if(xhr.readyState == 4 && xhr.status == 200) {
			var d = xhr.responseText;
			options.success && options.success(d)
		} else if(xhr.status != 200) {
			options.error && options.error(xhr.status);
			console.log(xhr.status)
		}
	}
}

//symbol
function getKey(obj) {
	var arr = [];
	for(var key in obj) {
		arr.push(key);
	}

	var arr1 = Object.getOwnPropertySymbols(obj);

	if(arr1) {
		return arr.concat(arr1);
	}
}