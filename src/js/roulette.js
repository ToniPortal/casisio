window.onload = function () {

	let time = 0;
	const max = 10;

	function random(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function fcintertime(clear) {
		if (clear == 0) {
			let intertime = setInterval(function () {
				time++;
				console.log(time)
				if (time >= max) {
					time = 0;
					clearInterval(intertime);
					return stop();
				}
			}, 1000);
		} else {
			time = max + 1;
		}
		return time;
	}


	(document.getElementById("start")).addEventListener("click", function () {
		console.log("start")

		fcintertime(0);

	});

	(document.getElementById("stop")).addEventListener("click", function () {

		stop()

	});

	function imgvis(nbroul, visible) {
		var img = document.getElementsByTagName("img")[nbroul];
		img.style.visibility = (visible ? 'visible' : 'hidden');
	}

	function stop() {
		console.log("stop")
		fcintertime(1);
		let choix = [];
		let nbroul = document.getElementsByClassName("roulette").length;
		let nbimg = document.querySelectorAll("img").length;
		for (let i = 0; i < nbroul; i++) {
			choix.push(random(1, 5));
		}
		console.log(nbimg)

		imgvis(choix[0], false);
		//	imgvis(Number(choix[0] + nbimg) ,false);
		//	imgvis(Number(choix[0] + nbimg + nbimg) ,false);
	}



}