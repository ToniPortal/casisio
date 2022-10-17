// Expression de fonction immédiatement invoquée
// pour ne pas polluer le scope global


window.onload = function () {
  console.log("relier")

  const wheel = document.querySelector('.wheel');
  const starBoutton = document.querySelector('.button');
  const back = document.querySelector('.back');

  let deg = 0;

  starBoutton.addEventListener('click', () => {

    if (document.getElementById("mise").value != "0" && document.getElementById("mise").value != "" && document.getElementById("mise").value != " " && (Number(document.getElementById("combienatu").innerHTML) >= Number(document.getElementById("mise").value))) {
      // Désactiver le bouton pendant l'essorage
      starBoutton.style.pointerEvents = 'none';
      // Calcule une nouvelle rotation entre 5000 et 10 000
      deg = Math.floor(5000 + Math.random() * 5000);
      //deg =40 ;
      // Définit la transition sur la roue
      wheel.style.transition = 'all 10s ease ';
      back.style.transition = 'all 14s ease-out';

      // Faire tourner la roue
      wheel.style.transform = `rotate(${deg}deg)`;
      // Appliquer le flou
      wheel.classList.add('blur');
      back.classList.add('rainbow');
    } else {
      alert("Vous devez mettre une mise ou un chiffre qui est inférieur/égal à votre argent")
    }

  });

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

  combienatu();

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


  wheel.addEventListener('transitionend', () => {
    // Supprimer le flou
    wheel.classList.remove('blur');
    back.classList.remove('rainbow');
    // Activer le bouton lorsque le spin est terminé
    starBoutton.style.pointerEvents = 'auto';
    // Nécessité de définir la transition sur aucune car nous voulons faire pivoter instantanément
    wheel.style.transition = 'none';
    // Calcule le degré sur une base de 360 ​​degrés pour obtenir la rotation réelle "naturelle"
    // Important car nous voulons commencer le tour suivant à partir de celui-là
    // Utilisez le module pour obtenir la valeur restante à partir de 360
    const actualDeg = deg % 360;
    // Définit la rotation réelle instantanément sans animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;

    let element = document.getElementById("result");

    if (actualDeg >= 0 && actualDeg < 360) {

      setTimeout(function () {
        const texte = document.getElementById("result").innerText;
        const ggoupas = document.getElementById("ggoupas");
        console.log(texte)

        var couleur = document.getElementsByName('couleur'); // form input radio noir ou rouge ou vert

        const nbcbatu = Number(document.getElementById("combienatu").innerText);
        const mise = Number(document.getElementById("mise").value)
        const doublemise = nbcbatu + (mise * 2);


        for (let i of couleur) {

          if (i.checked) {
            console.log(i.id);
            if (i.id == "rouge") {
              if (texte.indexOf("RED") != -1) {
                console.log("gagné")
                ggoupas.innerText = "Vous avez gagné";
                envoie(document.getElementById("mise").value, doublemise);

                document.getElementById("combienatu").innerText = doublemise;
                
              } else {
                console.log("perdu")
                ggoupas.innerText = "Vous avez perdu";
                envoie(document.getElementById("mise").value, nbcbatu - mise);

                document.getElementById("combienatu").innerText = nbcbatu - mise;

              }
            } else if (i.id == "noir") {
              if (texte.indexOf("BLACK") != -1) {
                console.log("gagné")
                ggoupas.innerText = "Vous avez gagné";
                envoie(document.getElementById("mise").value, doublemise);

                document.getElementById("combienatu").innerText = doublemise;

              } else {
                console.log("perdu")
                ggoupas.innerText = "Vous avez perdu";
                envoie(document.getElementById("mise").value, nbcbatu - mise);
                document.getElementById("combienatu").innerText = nbcbatu - mise;
              }
            }
          }
        }


      }, 500);

    }
    //Vert = 5 fois ta mise ; Rouge choisie = tu gagne 2 fois ta mise ; Noir choisie = tu gagne 2 fois ta mise

    if (actualDeg >= 0 && actualDeg < 10) {
      document.getElementById("result").textContent = "26 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 10 && actualDeg < 20) {
      document.getElementById("result").textContent = "3 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 20 && actualDeg < 30) {
      document.getElementById("result").textContent = "35 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 30 && actualDeg < 39) {
      document.getElementById("result").textContent = "12 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 39 && actualDeg < 49) {
      document.getElementById("result").textContent = "28 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 49 && actualDeg < 59) {
      document.getElementById("result").textContent = "7 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 59 && actualDeg < 69) {
      document.getElementById("result").textContent = "29 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 69 && actualDeg < 78) {
      document.getElementById("result").textContent = "18 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 78 && actualDeg < 88) {
      document.getElementById("result").textContent = "22 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 88 && actualDeg < 98) {
      document.getElementById("result").textContent = "9 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 98 && actualDeg < 107) {
      document.getElementById("result").textContent = "31 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 107 && actualDeg < 117) {
      document.getElementById("result").textContent = "14 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 117 && actualDeg < 127) {
      document.getElementById("result").textContent = "20 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 127 && actualDeg < 137) {
      document.getElementById("result").textContent = "1 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 137 && actualDeg < 146) {
      document.getElementById("result").textContent = "33 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 146 && actualDeg < 156) {
      document.getElementById("result").textContent = "16 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 156 && actualDeg < 166) {
      document.getElementById("result").textContent = "24 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 166 && actualDeg < 176) {
      document.getElementById("result").textContent = "5 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 176 && actualDeg < 185) {
      document.getElementById("result").textContent = "10 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 185 && actualDeg < 195) {
      document.getElementById("result").textContent = "23 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 195 && actualDeg < 205) {
      document.getElementById("result").textContent = "8 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 205 && actualDeg < 215) {
      document.getElementById("result").textContent = "30 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 215 && actualDeg < 224) {
      document.getElementById("result").textContent = "11 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 224 && actualDeg < 234) {
      document.getElementById("result").textContent = "36 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 234 && actualDeg < 244) {
      document.getElementById("result").textContent = "13 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 244 && actualDeg < 253) {
      document.getElementById("result").textContent = "21 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 253 && actualDeg < 263) {
      document.getElementById("result").textContent = "6 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 263 && actualDeg < 273) {
      document.getElementById("result").textContent = "34 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 273 && actualDeg < 283) {
      document.getElementById("result").textContent = "17 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 283 && actualDeg < 292) {
      document.getElementById("result").textContent = "25 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 292 && actualDeg < 302) {
      document.getElementById("result").textContent = "2 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 302 && actualDeg < 312) {
      document.getElementById("result").textContent = "21 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 312 && actualDeg < 322) {
      document.getElementById("result").textContent = "4 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 322 && actualDeg < 331) {
      document.getElementById("result").textContent = "19 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 331 && actualDeg < 341) {
      document.getElementById("result").textContent = "15 BLACK";
      element.classList.remove("green");
      element.classList.remove("red");
      element.classList.add("black");
    }
    if (actualDeg >= 341 && actualDeg < 350) {
      document.getElementById("result").textContent = "32 RED";
      element.classList.remove("green");
      element.classList.remove("black");
      element.classList.add("red");
    }
    if (actualDeg >= 350 && actualDeg < 360) {
      document.getElementById("result").textContent = "0 GREEN";
      element.classList.remove("black");
      element.classList.remove("red");
      element.classList.add("green");
    }


    console.log(actualDeg);
  }
  );
};
