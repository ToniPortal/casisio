window.onload = function () {
    const myForm = document.getElementById("myForm");

    const formButton = document.getElementById("btncreate");

    function desactbtn() {
      formButton.disabled = true;
    }
    function activbtn() {
       formButton.disabled = false;
    }



    function validation() {
        console.log("validation");
        activbtn();
        myError.innerText = "mot de passe valide";
        myError.style.color = "green";
    }

    const myError = document.getElementById("error");

    function testformok() {
        let myPassword = document.getElementById("password").value;
        let age = document.getElementById("age").value;

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
        }else if(age < 18){
            myError.innerText = "Vous n'êtes pas majeur";
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