
window.onload = function () {

  (document.getElementById("jack")).addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "/game1";
  });

  (document.getElementById("roul")).addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "/game2";
  });

  (document.getElementById("bjruser")).addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "/manage";
  });


}