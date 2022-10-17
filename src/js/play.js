
window.onload = function () {

  document
    .getElementById("manageaccount")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document.location.href = "/manage";
    });

  (document.querySelectorAll("img")[0]).addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "/game1";
  });

  (document.querySelectorAll("img")[1]).addEventListener("click", function (e) {
    e.preventDefault();
    document.location.href = "/game2";
  });

}