window.onload = function () {

    document.getElementById("form").addEventListener('submit', function (e) {
        e.preventDefault();
        formenvoie();
    });

}

async function formenvoie() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("username").value;
    let err = document.getElementById("err");

    const loc = location.origin; // Avoir l'adresse du site sans /
    const settings = { // Paramètres de la requête
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: `${username}`, password: `${password}` })
    };
    const response = await fetch(`${loc}/auth`, settings); // Requête
    if (response.status >= 200 && response.status <= 299) {
        const log = await response.json();
        console.log(log.login);
        let cookies = (document.cookie).slice(9);
        console.log(cookies);
        if (log.login === true) {
            if(cookies == "0"){
                window.location.href = `${loc}/play`;
            } else {
                window.location.href = `${loc}/${cookies}`;
            }
            
        } else if (log.login === false) {
            err.innerText = "Mauvais identifiant ou mot de passe";
            err.style.color = "red";
        } else {
            err.innerText = "Erreur inconnue";
            err.style.color = "red";
            console.log("Erreur");
        }



    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

}