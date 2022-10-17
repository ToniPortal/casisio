window.onload = function () {

	allcache();
	
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

	/*
		(document.getElementById("start")).addEventListener("click", function () {
			console.log("start")
	
			fcintertime(0);
	
		});
	*/

	(document.getElementById("stop")).addEventListener("click", function () {

		if (document.getElementById("mise").value != "0" && document.getElementById("mise").value != "") {
			allcache()
			//	document.querySelectorAll("img").style.visibility = "visible";

			stop()
		} else {
			alert("Vous devez mettre une mise")
		}

	});

	function allcache() {
		document.querySelectorAll("img").forEach(element => {
			element.style.visibility = "hidden";
			element.style.display = "none";
		});
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


		choix.filter(item => {
			if (set.has(item)) {
				set.delete(item);
			} else {
				nbgagnant++
				return item;
			}
		});


		console.log("Gagnant: " + nbgagnant)

		//Gestion des images.
		console.log(document.querySelectorAll("img")[choix[0]])
		cache([Number(choix[0])]);
		cache([Number(choix[1] + Number(5))]);
		cache([Number(choix[2]) + Number(10)]);
		//document.querySelectorAll("img")[Number(choix[0])].style.visibility = "visible";
		//document.querySelectorAll("img")[Number(choix[1]) + Number(5)].style.visibility = "visible";
		//document.querySelectorAll("img")[Number(choix[2]) + Number(10)].style.visibility = "visible";

		//Gestion de la mise
		const mise = document.getElementById("mise");
		const nbggwin = document.getElementById("nbggwin");

		if (nbgagnant == 0) {
			nbggwin.innerText = `nada €`;
		} else {
			const gain = Number(mise.value) * Number(nbgagnant + 0.25);
			nbggwin.innerText = `${gain} €`;
			mise.value = gain;
		}
	}

	function cache(number) {
		var custDiv = document.querySelectorAll("img")[number];
		if (custDiv.style.display === "none" || custDiv.style.display === "" || custDiv.style.visibility === "hidden") {
			console.log("VISBIBLE")
			custDiv.style.display = "block";
			custDiv.style.visibility = "visible";
		}
		else {
			custDiv.style.display = "none";
			custDiv.style.visibility = "hidden";
		}
	}

}