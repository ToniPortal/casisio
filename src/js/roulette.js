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

	function imgvis(id, visible) {
		var img = document.getElementById(id);
		img.style.visibility = (visible ? 'visible' : 'hidden');
	}



	async function stop() {
		console.log("stop")
		fcintertime(1);
		let choix = [];
		let nbroul = document.getElementsByClassName("roulette").length;
		let nbgagnant = 0;
		for (let i = 0; i < nbroul; i++) {
			choix.push(random(0, 4));
		}
		console.log("Choix: " + choix)

		const set = await new Set(choix);

		const duplicates = choix.filter(item => {
			if (set.has(item)) {
				set.delete(item);
			} else {
				nbgagnant++
				return item;
			}
		});

		imgvis("cont", false);

		alert("Gagnant: " + nbgagnant)
		
console.log(document.querySelectorAll("img")[choix[0]])
document.querySelectorAll("img")[choix[0]].style.visibility = "visible";
document.querySelectorAll("img")[choix[1] + 5].style.visibility = "visible";
document.querySelectorAll("img")[choix[1] + 10].style.visibility = "visible";
	}



}