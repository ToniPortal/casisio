window.onload = function () {

    document.getElementById("form").addEventListener('submit', function (e) {
        e.preventDefault();
        formenvoie();
    });

}

async function formenvoie() {

    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;
    let sujet = document.getElementById("sujet").value;
    let msg = document.getElementById("msg").value;
    let err = document.getElementById("err");

    const loc = location.origin; // Avoir l'adresse du site sans /
    const settings = { // Paramètres de la requête
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nom: `${nom}`, email: `${email}`,sujet: `${sujet}`, msg: `${msg}` })
    };
    const response = await fetch(`${loc}/mail`, settings); // Requête
    if (response.status >= 200 && response.status <= 299) {
        const log = await response.json();
        console.log(log)
        if (log.mail === true) {
            err.innerText = `Un mail a été envoyé, nous vous répondrons dans les plus brefs délais.`;
            err.style.color = "green";
        } else if (log.mail === false) {
            err.innerText = "Erreur lors de l'envoie du mail.";
            err.style.color = "red";
        } else {
            err.innerText = "Erreur inconnue lors de l'envoie du mail.";
            err.style.color = "red";
            console.log("Erreur");
        }



    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

}