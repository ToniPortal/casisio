window.onload = function () {

	allcache();
	envoiebase();


	async function combienatu() {
		const locations = location.origin; // Avoir l'adresse du site sans /
		const settings = { // Paramètres de la requête
			method: 'GET',
		};
		const fetchResponse = await fetch(`${locations}/resultat`, settings); // Requête
		const data = await fetchResponse.json(); // Récupération des données
		if (data.resultat !== false) {
			document.getElementById("combienatu").innerHTML = data.resultat;
			return;
		} else {
			alert("Error pour get combienatu");
			return;
		}
	}

	function random(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	async function envoiebase() {
		const valmise = 1;
		const locations = location.origin; // Avoir l'adresse du site sans /
		console.log(`${locations}/gamecreate`)
		const settings = { // Paramètres de la requête
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ idjeu: `${valmise}` })
		};
		const fetchResponse = await fetch(`${locations}/gamecreate`, settings); // Requête
		const data = await fetchResponse.json(); // Récupération des données
		if (data.create === false) {
			console.log("Vous avez déjà une partie en cours")
			return combienatu();
		} else if (data.create === true) {
			console.log("Partie créé")
			return combienatu();
		} else {
			alert("Erreur lors de la création de la partie !")
			return;
		}
	}


	(document.getElementById("stop")).addEventListener("click", function () {

		if (document.getElementById("mise").value != "0" && document.getElementById("mise").value != "" && document.getElementById("mise").value != " " && (Number(document.getElementById("combienatu").innerHTML) >= Number(document.getElementById("mise").value))) {
			allcache()

			stop()
		} else {
			alert("Vous devez mettre une mise ou un chiffre qui est inférieur/égal à votre argent")
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

		//Gestion de la mise
		const mise = document.getElementById("mise");
		const nbggwin = document.getElementById("nbggwin");
		const gain = Number(mise.value) * Number(nbgagnant + 0.25);
		const miseactuel = document.getElementById("mise").value;
		const combienatu = document.getElementById("combienatu");

		if (nbgagnant == 0) {
			nbggwin.innerText = `- ${Number(gain)} €`;
			envoie(miseactuel, Number(combienatu.innerText) - Number(gain))
			combienatu.innerText =  Number(combienatu.innerText) - Number(gain);
		} else {
			envoie(miseactuel, Number(combienatu.innerText) + Number(gain))
			nbggwin.innerText = `${gain} €`;
			mise.value = gain;
			combienatu.innerText = Number(combienatu.innerText) + Number(gain);
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

	async function envoie(mise, gain) {
		console.log("envoie" + mise + " " + gain)

		const loc = location.origin; // Avoir l'adresse du site sans /
		console.log(`${loc}/updategame`)
		const settings = { // Paramètres de la requête
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ mise: `${mise}`, gain: `${gain}`, idjeu: `1` })
		};
		const response = await fetch(`${loc}/updategame`, settings); // Requête
		if (response.status >= 200 && response.status <= 299) {
			const jsonResponse = await response.json();
			console.log(jsonResponse);
		} else {
			// Handle errors
			console.log(response.status, response.statusText);
		}
	}

}
