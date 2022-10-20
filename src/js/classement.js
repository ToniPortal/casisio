window.onload = function () {

    setInterval(result(), 5000);

    document.getElementById("form").addEventListener('submit', function (e) {
        e.preventDefault();
        envoie();
    });



}

async function result() {

    const tbl = document.getElementById("tbl")

    const loc = location.origin; // Avoir l'adresse du site sans /
    console.log(`${loc}/getclass`)
    const settings = { // Paramètres de la requête
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(`${loc}/getclass`, settings); // Requête
    if (response.status >= 200 && response.status <= 299) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)

        jsonResponse.forEach(element => {

            if (element.idjeu == 1) {
                element.idjeu = "Jackpot"
            }
            if (element.idjeu == 2) {
                element.idjeu = "Roulette"
            }

            tbl.innerHTML += `<tr>
                                 <td>${element.username}</td>
                                <td>${element.resultat}</td>
                                <td>${element.mise}</td>
                                <td>${element.idjeu}</td>
                              </tr>`

        });


    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

}


async function envoie() {

    let valcher = document.getElementById("valcher")
    const tbl = document.getElementById("tbl")

    const loc = location.origin; // Avoir l'adresse du site sans /
    console.log(`${loc}/class`)
    const settings = { // Paramètres de la requête
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valcher: `${valcher.value}` })
    };
    const response = await fetch(`${loc}/class`, settings); // Requête
    if (response.status >= 200 && response.status <= 299) {
        const jsonResponse = await response.json();
        console.log(jsonResponse)

        tbl.innerHTML = jsonResponse


    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

}

