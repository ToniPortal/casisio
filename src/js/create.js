window.onload = function () {

    const formButton = document.getElementById("btncreate");

    function desactbtn() {
        valid = false;
    //    formButton.disabled = true;
    }
    function activbtn() {
      //  formButton.disabled = false;
        valid = true;
    }

    var valid = false;

    function testformok() {
        let myPassword = document.getElementById("password").value;
        let myError = document.getElementById("error");

        // // on test l'expression régulière
        // let passwordRegExp= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        // let testPassword = passwordRegExp.test(myPassword.value)
        console.log(myPassword.length);
        
        // on veut que le mdp fasse min 12 caractères 
        if (myPassword.length < 12) {
            console.log("test");
            myError.innerHTML = "";
            myError.innerHTML = "La longueur minimum du mot de passe est de 12";
            myError.style.color = 'red';
            console.log(myPassword.length);
            desactbtn();
        }else {
            myError.innerHTML = "";
            activbtn();
            myError.innerHTML = "mot de passe valide";
            myError.style.color = "green";
        }
        //au moins 1 majuscule 
        if (!/[A-Z]/.test(myPassword)) {
            myError.innerHTML = "";
            myError.innerHTML = "Le mot de passe doit contenir une majuscule";
            myError.style.color = 'red';
            desactbtn();
        }
        // au moins 1 minuscule
        if (!/[a-z]/.test(myPassword)) {
            myError.innerHTML = " ";
            myError.innerHTML = "Le mot de passe doit contenir une minuscule";
            myError.style.color = 'red';
            desactbtn();
        }
        if (!/[0-9]/.test(myPassword)) {
            myError.innerHTML = "";
            myError.innerHTML = "Le mot de passe doit contenir un chiffre";
            myError.style.color = 'red';
            desactbtn();
        }
        // mot de passe valide
        if (valid) {
            myError.innerHTML = "";
            myError.innerHTML = "mot de passe valide";
            myError.style.color = "green";
            activbtn();
        }

    }

    const myForm = document.getElementById("myForm");

    myForm.addEventListener('change', function (e) {
        e.preventDefault();
        testformok();
    })

    myForm.addEventListener('click', function (e) {
        e.preventDefault();
        testformok();
    })

}