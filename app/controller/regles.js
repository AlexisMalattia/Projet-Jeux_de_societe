window.onload = init();

function init() {
    let button = document.getElementById("retour");
    console.log(button);
    button.addEventListener("click", evt => {
        window.location="../view/accueil.html";
    });
}