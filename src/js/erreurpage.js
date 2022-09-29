

window.onload = function() {
    const back = document.getElementById('homePage');
    
    (document.getElementById("avant")).addEventListener('click', function(e) {
e.preventDefault();
        gobak()
  
    });
}





function gobak() {
    history.back()
}
