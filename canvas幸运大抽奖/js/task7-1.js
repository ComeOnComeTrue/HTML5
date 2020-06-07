(function () {
	var myCanvas = document.getElementById("canvas1");
	var myCanvas2 = document.getElementById("canvas2");
	var t = null;
	var centerX = 400; // 中心点x
	var centerY = 250; // 中心点y
	var ctx = myCanvas.getContext("2d");// 获取画布区域
	var ctx2 = myCanvas2.getContext("2d");
	var lineLen = 150;
	var startAngle = 0; // 开始角度
	var endAngle = 0;// 开始角度
	var color = ["rgba(209,66,120,0.6)", "rgba(149,63,174,0.6)",
		"rgba(88,104,55,0.6)", "rgba(199,199,111,0.6)", "rgba(175,39,41,0.6)", "rgba(58,156,118,0.6)",
		"rgba(204,165,64,0.6)", "rgba(88,152,254,0.6)", "rgba(82,219,83,0.6)", "rgba(254,184,52,0.6)"];

	function init() {
		bindEvent();
		createCircle2();
		createCircle1();
		createCircle();
		createCirText();
		creatpics();
		ctx2.translate(centerX, centerY);//平移 改变坐标系原点
		initPoint();
	}
	init();

	function bindEvent() {
		var flyBtn = document.getElementById('flyBtn');
		flyBtn.addEventListener('click', doFly)
	}

	function arcInit(r, lineWidth) {
		for (var i = 0; i < 10; i++) {
			// ctx.save();
			ctx.beginPath();
			startAngle = Math.PI * (2 / 10) * i; // 自身的区域
			endAngle = Math.PI * (2 / 10) * (i + 1); // 下一个区域
			// 画圆 圆心(x,y),半径(r),弧度(起始弧度,结束弧度),方向(顺时针0,逆时针1)
			ctx.arc(centerX, centerY, r, startAngle, endAngle, 0);
			ctx.lineWidth = lineWidth; //设置笔的粗细
			ctx.strokeStyle = color[i];// 边框颜色
			ctx.stroke();// 渲染
			// ctx.restore();//还原上一个保存的数据 最近的save数据
		}
	};
	function createCircle2() { // 最大的圆
		arcInit(155, 180);
	}
	function createCircle1() { // 中间的圆
		arcInit(150, 160);
		// var startAngle = 0;
		// var endAngle = 0;
		// for (var i = 0; i < 10; i++) {
		// 	ctx.save();
		// 	ctx.beginPath();
		// 	startAngle = Math.PI * (2 / 10) * i;
		// 	endAngle = Math.PI * (2 / 10) * (i + 1);
		// 	ctx.arc(centerX, centerY, 150, startAngle, endAngle, 0);
		// 	ctx.lineWidth = 160;
		// 	ctx.strokeStyle = color[i];
		// 	ctx.stroke();
		// 	ctx.restore();
		// }
	}
	function createCircle() {// 最小的圆 模糊
		arcInit(55, 150);
		// var startAngle = 0;
		// var endAngle = 0;
		// for (var i = 0; i < 10; i++) {
		// 	ctx.save();
		// 	ctx.beginPath();
		// 	startAngle = Math.PI * (2 / 10) * i;
		// 	endAngle = Math.PI * (2 / 10) * (i + 1);
		// 	ctx.arc(centerX, centerY, 55, startAngle, endAngle, 0);
		// 	ctx.lineWidth = 150;
		// 	ctx.strokeStyle = color[i];
		// 	ctx.stroke();
		// 	ctx.restore();
		// }
	}

	function creatpics() { // 图片
		var images = new Image();
		images.src = "img/choujia.png";
		images.onload = function () {
			ctx.drawImage(images, centerX - 75, centerY - 75, 150, 150)
		}
		ctx.restore();
	}
	
	function createCirText() { // 文字信息
		var info = ["一等奖出国", "二等奖电脑", "四等奖", "再来一次", "四等奖", "谢谢参与", "三等奖手机",
			"安慰奖", "谢谢参与", "再来一次"];
		ctx.font = "Bold 20px Arial";//全局 大小和字体样式
		console.log(ctx.textBaseline )
		ctx.textAlign = 'start';
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000"; // 填充颜色
		var step = 2 * Math.PI / 10;
		for (var i = 0; i < 10; i++) { 
			ctx.save();// 保存数据
			ctx.beginPath();
			ctx.translate(centerX, centerY);
			ctx.rotate(i * step + step / 2);
			ctx.fillText(info[i], 130, 0); 
			ctx.restore();
		}
	}

	function initPoint() { // 指针
		ctx2.beginPath();
		ctx2.moveTo(0, 2);
		ctx2.lineTo(lineLen, 2);
		ctx2.lineTo(lineLen, 4);
		ctx2.lineTo(lineLen + 10, 0);
		ctx2.lineTo(lineLen, -4);
		ctx2.lineTo(lineLen, -2);
		ctx2.lineTo(0, -2);
		ctx2.fillStyle = "#C01020";
		ctx2.fill();
		ctx2.closePath();
	}


	function doFly() { // 点击转起
		myCanvas2.width = 800;
		ctx2.translate(centerX, centerY);
		if (t) {
			return;
		}
		var step = 50 + Math.random() * 10;
		var angle = 0;
		t = setInterval(function () {
			step *= 0.95;
			if (step <= 0.1) {
				clearInterval(t);
				t = null;
			} else {
				ctx2.restore(); // 还原上一次
				ctx2.save(); // 
				ctx2.rotate(angle * Math.PI / 180);
				ctx2.clearRect(-5, -5, 170, 18); // 清除画布
				angle += step;
				if (angle > 360) {
					angle -= 360;
				}
				ctx2.restore();
				ctx2.save();
				ctx2.rotate(angle * Math.PI / 180);
				initPoint();
			}
		}, 60);
	}
}())










