window.onload = function () {
    const myForm = document.getElementById("myForm");

    const formButton = document.getElementById("btncreate");
    activbtn()
    function desactbtn() {
        formButton.disabled = true;
    }
    function activbtn() {
        formButton.disabled = false;
    }


    formButton.addEventListener('click', function (e) {
        e.preventDefault();
        formenvoie();
    });

    function validation() {
        console.log("validation");
        activbtn();
        myError.innerText = "mot de passe valide";
        myError.style.color = "green";
    }

    const myError = document.getElementById("error");

    function testformok() {
        let myPassword = document.getElementById("password").value;
        let age = document.getElementById("dateNaissance").value;
        let password = document.getElementById("password").value;
        let verifpassword = document.getElementById("ConfirmerMotDePasse").value;
        // // on test l'expression régulière
        // let passwordRegExp= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        // let testPassword = passwordRegExp.test(myPassword.value)


        // on veut que le mdp fasse min 12 caractères 
        if (myPassword.length < 12) {
            myError.innerText = "La longueur minimum du mot de passe est de 12 caractères";
            myError.style.color = 'red';
            desactbtn();
        }
        //au moins 1 majuscule 
        else if (!/[A-Z]/.test(myPassword)) {
            myError.innerText = "Le mot de passe doit contenir une majuscule";
            myError.style.color = 'red';
            desactbtn();
        }
        // au moins 1 minuscule
        else if (!/[a-z]/.test(myPassword)) {
            myError.innerText = " ";
            myError.innerText = "Le mot de passe doit contenir une minuscule";
            myError.style.color = 'red';
            desactbtn();
        }
        else if (!/[0-9]/.test(String(myPassword))) {

            myError.innerText = "Le mot de passe doit contenir un chiffre";
            myError.style.color = 'red';
            desactbtn();
        } else if (age < 18) {
            myError.innerText = "Vous n'êtes pas majeur";
            myError.style.color = 'red';
            desactbtn();
        } else if (password !== verifpassword) {
            myError.innerText = "Les mots de passe ne correspondent pas";
            myError.style.color = 'red';
            desactbtn();
        } else {
            validation();
        }

    }


    myForm.addEventListener('change', function (e) {
        e.preventDefault();
        testformok();
    })

    myForm.addEventListener('click', function (e) {
        e.preventDefault();
        testformok();
    })

}

async function formenvoie() {

    console.log("formenvoie");
    let prenom = document.getElementById("prenom").value;
    let dateNaissance = document.getElementById("dateNaissance").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let verifpassword = document.getElementById("ConfirmerMotDePasse").value;
    let err = document.getElementById("err");



    const loc = location.origin; // Avoir l'adresse du site sans /
    const settings = { // Paramètres de la requête
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: `${username}`, password: `${password}`, prenom: `${prenom}`, dateNaissance: `${dateNaissance}`, verifpassword: `${verifpassword}` }),
    };
    const response = await fetch(`${loc}/create`, settings); // Requête
    if (response.status >= 200 && response.status <= 299) {
        const log = await response.json();
        if (log.create === true) {

            window.location.href = `${loc}/play`;

        } else if (log.create === false) {
            err.innerText = "Mauvais identifiant ou mot de passe";
            err.style.color = "red";
        } else {
            err.innerText = "Erreur inconnue: " + log.create;
            err.style.color = "red";
            console.log("Erreur");
        }



    } else {
        // Handle errors
        console.log(response.status, response.statusText);
    }

}