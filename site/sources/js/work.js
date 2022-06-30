$(document).ready(function() {
	$(".changeins").css("display", "none");
	$(".polzgame").css("display", "none");
	$(".labirint").css("display", "none");
	$(".chit").css("font-size", "52px");
	$(".chit").css("margin-left", "3%");
	$(".sgdld").css("font-size", "52px");
	$(".sgdld").css("margin-left", "3%");
	$(".btnsg").on("click", function() {
		$(".startgamediv").css("display", "none");
		$(".changeins").css("display", "block");
	});
	$(".polzch").on("click", function() {
		$(".changeins").css("display", "none");
		$(".polzgame").css("display", "block");
		$("#zhukcan").css("backgroun-color", "#75bf44");
		$("#zhukcan").css("display", "block");
		startZhukGame();
	});
	$(".letch").on("click", function() {
		$(".changeins").css("display", "none");
		$(".letgame").css("display", "block");
		$("#beecan").css("backgroun-color", "#61c6b2");
		startBeeGame();
	});
	$(".zemch").on("click", function() {
		$(".changeins").css("display", "none");
		$(".letgame").css("display", "none");
		$(".labirint").css("display", "block");
		$("#zemcan").css("display", "block");
		startZemGame();
	});
});
function startZhukGame () {
	$(".gameoverZhukDiv").css("display", "none");
	$(".gamewinZhukDiv").css("display", "none");
	$("#zhukcan").css("display", "block");
	// Жук
	var score = 0;
	var canvas = document.getElementById("zhukcan");
	var zhukctx = canvas.getContext("2d");
	zhukctx.fillStyle = "#75bf44";
	zhukctx.fillRect(0, 0, canvas.width, canvas.height);
	var zhuk = new Image();
	zhuk.width = 50;
	zhuk.height = 50;
	var pregrada = new Image();
	//var distance = document.querySelector(".polzgame").clientWidth;

	zhuk.src = "sources/images/zhuk.png";
	pregrada.src = "sources/images/prep.png";

	var zhukXpos = 20;
	var zhukYpos = 850;
	var zhukWidth = 40;
	var zhukHeight = 50;

	var leftZh = false;
	var rightZh = false;
	var jumpZh = false;
	var jumpCount = 0;
	var jumpLen = 50;

	var blocks = [];
	var blocksWidth = 20;
	var blocksHeight = 50;

	var blockX = 100;
	var blockY = 850;
	for (var i = 0; i < 13; i++) {
		blocks.push({x: blockX, y: blockY})
		blockX += 100;
	}

	document.addEventListener("keydown", keyRightHandler, false);
	document.addEventListener("keyup", keyLeftHandler, false);

	function keyRightHandler(event) {
		if (event.keyCode == 39) {
			rightZh = true;
		}
		if (event.keyCode == 37) {
			leftZh = true;
		}
		if (event.key == " ") {
			jumpZh = true;
		}
	}

	function keyLeftHandler(event) {
		if (event.keyCode == 39) {
			rightZh = false;
		}
		if (event.keyCode == 37) {
			leftZh = false;
		}
	}

	function drawZhuk() {
		zhukctx.drawImage(zhuk, zhukXpos, zhukYpos, zhukWidth, zhukHeight);
	}

	function drawPlayZhuk() {
		zhukctx.clearRect(0, 0, canvas.width, canvas.height);
		zhukctx.beginPath();
		zhukctx.rect(0, 0, canvas.width, canvas.height);
		zhukctx.fillStyle = "#75bf44";
		zhukctx.fill();
		for (var i = 0; i < blocks.length; i++) {
			zhukctx.drawImage(pregrada, blocks[i].x, blocks[i].y, blocksWidth, blocksHeight);
			//Столкновения
			if (zhukXpos + zhukWidth >= blocks[i].x && zhukXpos <= blocks[i].x + blocksWidth && (zhukYpos >= blocks[i].y + blocksHeight || zhukYpos >= blocks[i].y - blocksHeight)) {
				//console.log("Заступ!, zhukXpos = " + zhukXpos + ", blocks[i].x = " + blocks[i].x + ", zhukYpos = " + zhukYpos + ", blocks[i].y = " + blocks[i].y);
				endZhukGame();
			}
			if (zhukXpos + zhukWidth >= blocks[i].x) {
				if (score <= i) {
					score = i + 1;
				} 
			}
		}
		if (rightZh && zhukXpos < canvas.width - 50) {
			zhukXpos += 4;
		} else if (leftZh && zhukXpos > 0) {
			zhukXpos -= 4
		}
		if (jumpZh) {
			jumpCount++;
			zhukYpos = 850 - (4*jumpLen*Math.sin(Math.PI*jumpCount/jumpLen));
		}
		if(jumpCount > jumpLen) {
			jumpCount = 0;
			jumpZh = false;
			zhukYpos = 850;
		}
		drawZhuk();
		if (zhukXpos >= canvas.width - zhukWidth*2) {
			winZhukGame();
		}
	}
	var interval = setInterval(drawPlayZhuk, 10);

	function endZhukGame() {
		clearInterval(interval);
		$("#zhukcan").css("display", "none");
		$(".gameoverZhukDiv").css("display", "block");
		$(".gameoverZhukDiv").css("background-color", "#75bf44");
		$("#zhukgoscorep").text("СЧЁТ: " + score);
		resetVarsZhuk();
	}

	function winZhukGame() {
		clearInterval(interval);
		$("#zhukcan").css("display", "none");
		$(".gamewinZhukDiv").css("display", "block");
		$(".gamewinZhukDiv").css("background-color", "#75bf44");
		$("#zhukgwscorep").text("СЧЁТ: " + score);
		resetVarsZhuk();
	}

	function resetVarsZhuk() {
		zhukXpos = 20;
		zhukYpos = 850;
		zhukWidth = 40;
		zhukHeight = 50;

		leftZh = false;
		rightZh = false;
		jumpZh = false;
		jumpCount = 0;
		jumpLen = 50;

		//blocks = [];
		document.removeEventListener("keydown", keyRightHandler);
		document.removeEventListener("keyup", keyLeftHandler);
	}
}


function mainMenufromZhuk() {
	$(".polzgame").css("display", "none");
	$(".gameoverZhukDiv").css("display", "none");
	$("#zhukcan").css("display", "none");
	$(".startgamediv").css("display", "block");
}

function restartzhukGame() {
	$(".polzgame").css("display", "block");
	$("#zhukcan").css("display", "block");
	$(".gameoverZhukDiv").css("display", "none");
	startZhukGame();
}

//Bee game
function startBeeGame () {
	$(".gameoverBeeDiv").css("display", "none");
	$(".gamewinBeeDiv").css("display", "none");
	$("#beecan").css("display", "block");
	var score = 0;
	var canvas = document.getElementById("beecan");
	var beectx = canvas.getContext("2d");
	beectx.fillStyle = "#61c6b2";
	beectx.fillRect(0, 0, canvas.width, canvas.height);
	var bee = new Image();
	bee.width = 30;
	bee.height = 15;
	var pregradaTop = new Image();
	var pregradaBot = new Image();
	//var distance = document.querySelector(".polzgame").clientWidth;

	bee.src = "sources/images/bee.png";
	pregradaTop.src = "sources/images/pipeUp.png";
	pregradaBot.src = "sources/images/pipeBottom.png";

	var beeXpos = 20;
	var beeYpos = 450;
	var beeWidth = 30;
	var beeHeight = 15;

	var gravity = 0.9;

	var leftBee = false;
	var rightBee = false;

	var gap = 90;

	document.addEventListener("keydown", keyRightHandler, false);
	document.addEventListener("keyup", keyLeftHandler, false);
	document.addEventListener("click", moveUp, false);

	console.log("gravity - " + gravity);

	function keyRightHandler(event) {
		if (event.keyCode == 39) {
			rightBee = true;
		}
		if (event.keyCode == 37) {
			leftBee = true;
		}
	}

	function keyLeftHandler(event) {
		if (event.keyCode == 39) {
			rightBee = false;
		}
		if (event.keyCode == 37) {
			leftBee = false;
		}
	}

	function moveUp() {
		beeYpos -= 35;
	}

	var pipeUp = [];
	var pipeBot = [];
	var pipeWidth = 40;
	var pipeHeight = 200;

	pipeX = 100;
	pipeY = 0;
	for (var i = 0; i < 13; i++) {
		var heightUppipe = (Math.random() * (4 - 1) + 1) * pipeHeight;
		pipeUp.push({x: pipeX, y: 0, height: heightUppipe})
		pipeBot.push({x: pipeX, y: heightUppipe + gap, height: canvas.height - (heightUppipe + gap)})
		pipeX += 100;
	}

	function drawBee() {
		beectx.drawImage(bee, beeXpos, beeYpos, beeWidth, beeHeight);
	}

	function drawPlayBee() {
		beectx.clearRect(0, 0, canvas.width, canvas.height);
		beectx.beginPath();
		beectx.rect(0, 0, canvas.width, canvas.height);
		beectx.fillStyle = "#61c6b2";
		beectx.fill();
		beectx.closePath();
		for (var i = 0; i < pipeUp.length; i++) {
			
			beectx.drawImage(pregradaTop, pipeUp[i].x, pipeUp[i].y, pipeWidth, pipeUp[i].height);
			beectx.drawImage(pregradaBot, pipeBot[i].x, pipeBot[i].y, pipeWidth, pipeBot[i].height);

			//Столкновения
			if (beeXpos + beeWidth >= pipeUp[i].x && beeXpos <= pipeUp[i].x + pipeWidth && (beeYpos <= pipeUp[i].y + pipeUp[i].height || beeYpos + beeHeight >= pipeBot[i].y) || beeYpos + beeHeight >= canvas.height) {
				//console.log("Заступ!, zhukXpos = " + zhukXpos + ", blocks[i].x = " + blocks[i].x + ", zhukYpos = " + zhukYpos + ", blocks[i].y = " + blocks[i].y);
				endBeeGame();
			}
			if (beeXpos + beeWidth >= pipeUp[i].x) {
				if (score <= i) {
					score = i + 1;
				} 
			}
		}
		if (rightBee && beeXpos < canvas.width - 30) {
			beeXpos += 3;
		} else if (leftBee && beeXpos > 0) {
			beeXpos -= 3;
		}

		drawBee();
		beeYpos += gravity;
		if (beeXpos >= canvas.width - beeWidth*1.5) {
			winBeeGame();
		}
	}
	var interval = setInterval(drawPlayBee, 20);

	function endBeeGame() {
		clearInterval(interval);
		$("#beecan").css("display", "none");
		$(".gameoverBeeDiv").css("display", "block");
		$(".gameoverBeeDiv").css("background-color", "#75bf44");
		$("#beegoscorep").text("СЧЁТ: " + score);
		resetVarsBee();
	}

	function winBeeGame() {
		clearInterval(interval);
		$("#beecan").css("display", "none");
		$(".gamewinBeeDiv").css("display", "block");
		$(".gamewinBeeDiv").css("background-color", "#75bf44");
		$("#beegwscorep").text("СЧЁТ: " + score);
		resetVarsBee();
	}

	function resetVarsBee() {
		var beeXpos = 20;
		var beeYpos = 450;
		var beeWidth = 30;
		var beeHeight = 15;

		var gravity = 0.9;

		var leftBee = false;
		var rightBee = false;

		pipeUp = [];
		pipeBot = [];
		document.removeEventListener("keydown", keyRightHandler);
		document.removeEventListener("keyup", keyLeftHandler);
		document.removeEventListener("click", moveUp);
	}
}

function mainMenufromBee() {
	$(".letgame").css("display", "none");
	$(".gameoverBeeDiv").css("display", "none");
	$("#beecan").css("display", "none");
	$(".startgamediv").css("display", "block");
}

function restartbeeGame() {
	$(".letgame").css("display", "block");
	$("#beecan").css("display", "block");
	$(".gameoverBeeDiv").css("display", "none");
	startBeeGame();
}


//Zemleroy game
function startZemGame () {
	var canvas = document.getElementById("zemcan");
	var zemctx = canvas.getContext("2d");

	var labirintImg = document.getElementById("labirintImg");
	//var labirintImg = new Image();
	//labirintImg.src = 'sources/images/лабиринт-01.png'; //+ "?" + new Date().getTime();
	//labirintImg.setAttribute('crossOrigin', 'Anonymous');
	var zemleroyImg = document.getElementById("zemleroyImg");

	// обработка нажатия кнопок
	window.onkeydown = processKey;
	// начальная позиция
	var zemX = 0;
	var zemY = 0;

	// смещение
	var dx = 0;
	var dy = 0;

	var secs = 0;
	// отрисовать фон лабиринта
	drawMaze(0, 480);

	// отрисовка фона
	function drawMaze(startX, startY) {
	    canvas.width = 1440;
	    canvas.height = 900;

	    // Рисуем лабиринт
	    zemctx.drawImage(labirintImg, 0,0, 1440, 900);

	    zemX = startX;
	    zemY = startY;

	    zemctx.drawImage(zemleroyImg, zemX, zemY, 25, 35);
	    //Выводим текст с таймером 
	    zemctx.fillStyle = "#ff0";
	    zemctx.font = "bold 20pt Arial";
        zemctx.fillText("Осталось: " + (120 - secs) + " секунд", 1000, 30);
	}

	// Обработка нажатия кнопок
	function processKey(event) {
	    event.preventDefault();

	    // Если жук находится в движении, 
	    // останавливаем его
	    dx = 0;
	    dy = 0;

	    // Если нажата стрелка вверх, 
	    // жук вверх
	    if (event.keyCode == 38) {
	      	dy = -2;
	    }

	    // Если нажата стрелка вниз, 
	    // жук вниз
	    if (event.keyCode == 40) {
	      	dy = 2;
	    }

	    // Если нажата стрелка влево, 
	    // жук влево
	    if (event.keyCode == 37) {
	      	dx = -2;
	    }

	    // Если нажата стрелка вправо, 
	    // жук вправо
	    if (event.keyCode == 39) {
	      	dx = 2;
	    }
	}
	var interval = setInterval(drawFrame, 20);;
	// Отрисовка кадра
	function drawFrame() {
	  	zemctx.clearRect(0,0,canvas.width,canvas.height);
	  	zemctx.drawImage(labirintImg, 0,0, 1440, 900);
	  	zemctx.drawImage(zemleroyImg, zemX, zemY, 25, 35);
	  	zemctx.fillStyle = "#ff0";
	    zemctx.font = "bold 20pt Arial";
	  	zemctx.fillText("Осталось: " + (120 - secs) + " секунд", 1000, 30);

	    // Обновляем кадр только если значок движется
	    if (dx != 0 || dy != 0) {
	      	// Обновляем координаты значка, создавая перемещение
	      	zemX += dx;
	      	zemY += dy;

	      	// Проверка столкновения со стенками лабиринта
	      	if (checkForCollision()) {
	        	zemX -= dx;
	        	zemY -= dy;
	        	dx = 0;
	        	dy = 0;
	      	}
	      	// Перерисовываем жука
	      	//zemctx.drawImage(zemleroyImg, zemX, zemY, 25, 35);
	      	// Проверяем дошел ли жук до финиша
	      	if (zemX > (canvas.width - 40) && zemY > 380 && zemY < 440) {
	        	winZemGame();
	        	return; 
	      	}
	    }
	    // Рисуем следующий кадр
	  }

	  function checkForCollision() {
	    // Перебираем все пиксели лабиринта и инвертируем их цвет
	    var imgData = zemctx.getImageData(zemX-1, zemY-1, 30+2, 35+2);
	    var pixels = imgData.data;

	    // Получаем массив пикселей
	    for (var i = 0; n = pixels.length, i < n; i += 4) {
		    var red = pixels[i];
		    var green = pixels[i+1];
		    var blue = pixels[i+2];
		    var alpha = pixels[i+3];

		    // Смотрим темные пиксели
		    if (red == 97 && green == 97 && blue == 97) {
		        return true;
		    }
		    if (red == 0 && green == 0 && blue == 0) {
		        return true;
		    }
		    if (red == 1 && green == 1 && blue == 1) {
		        return true;
		    }
	    }
	    // Столкновения не было
	    return false;
	}

	var timeout;
	function timer() {
		timeout = setTimeout(endZemGame, 120000);
	}
	timer();

	var timerZem = setInterval(
        function () {
            secs++;
        }, 
    1000 );
	function endZemGame() {
		clearInterval(timerZem);
		clearTimeout(timeout);
		clearInterval(interval);
		$("#zemcan").css("display", "none");
		$(".gameoverZemDiv").css("display", "block");
		$(".gamewinZemDiv").css("display", "none");
		$(".gameoverZemDiv").css("background-color", "#6e6323");
		$("#zemgoscorep").text("ВРЕМЯ: " + secs + " секунд");
		resetVarsZem();
		window.cancelAnimationFrame(drawFrame);
	}

	function winZemGame() {
		clearTimeout(timeout);
		clearInterval(timerZem);
		clearInterval(interval);
		$("#zemcan").css("display", "none");
		$(".gamewinZemDiv").css("display", "block");
		$(".gamewinZemDiv").css("background-color", "#6e6323");
		$("#zemgwscorep").text("ВРЕМЯ: " + secs + " секунд");
		resetVarsZem();
		window.cancelAnimationFrame(drawFrame);
	}

	function resetVarsZem() {
		let x = 0;
	  	let y = 0;

		let dx = 0;
		let dy = 0;

		var secs = 0;
		document.removeEventListener("keydown", processKey);
	}
}

function mainMenufromZem() {
	$(".labirint").css("display", "none");
	$(".gameoverZemDiv").css("display", "none");
	$(".gamewinZemDiv").css("display", "none");
	$("#zemcan").css("display", "none");
	$(".startgamediv").css("display", "block");
}

function restartzemGame() {
	$(".labirint").css("display", "block");
	$("#zemcan").css("display", "block");
	$(".gameoverZemDiv").css("display", "none");
	$(".gamewinZemDiv").css("display", "none");
	startZemGame();
}