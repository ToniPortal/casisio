window.onload = async function () {

    var started = 0;

    if (started == 0) {
        started = 1;
        const locations = location.origin; // Avoir l'adresse du site sans /
        console.log(`${locations}/con`)
        const settings = { // Paramètres de la requête
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const fetchResponse = await fetch(`${locations}/con`, settings); // Requête
        const data = await fetchResponse.json(); // Récupération des données
        const connection = data.connect; // Récupération du message

        console.log(connection);

        if (connection === true) { // Si la connexion est établie
            document.getElementById("ins").remove()
            started = 0;
        } else if (connection === false) { // Si la connexion n'est pas établie
            document.getElementById("disco").remove();  // Supprimer le bouton de déconnexion
        }


    }



}



