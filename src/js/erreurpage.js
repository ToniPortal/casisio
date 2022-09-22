

window.onload = function() {
    const back = document.getElementById('homePage');
    
    (document.getElementById("homePage")).addEventListener('click', function(e) {
e.preventDefault();
        menu()
  
    });



    (document.getElementById("avant")).addEventListener('click', function(e) {
e.preventDefault();
        gobak()
  
    });
}



function menu() {
document.location.href= "/"
}
function gobak() {
    history.back()
}
