import {loadAssets} from "./assets.js";
window.onload = init;

/**
 * Author : Alexis MALATTIA et Loic AMANN
 */

let page;

function init() {
    loadAssets(callback=>{
        // 1 - Récupérer le body
        page = document.querySelector("body");
        console.log(page);
        console.log(localStorage);

        // 2 - Ajouter les éléments
        // 2.1 - Titre
        let title_page = document.createElement("h1");
        title_page.textContent = "Puissances croisées";
        title_page.style.textAlign = "center";

        // 2.2 - Images et titres
        let div_games = document.createElement("div");
        div_games.style.textAlign = "center";

        let img_p4 = document.createElement("img");
        let img_mtc = document.createElement("img");

        img_p4.src = "../assets/puissance4.png";
        img_p4.classList.add("imgGame");
        img_mtc.src = "../assets/motsCroises.png";
        img_mtc.classList.add("imgGame");

        img_mtc.height = img_mtc.height*0.20;
        img_mtc.width = img_mtc.width*0.20;

        img_p4.height = img_mtc.height;
        img_p4.width = img_mtc.width;
        img_p4.addEventListener("click", call=>{
            window.location = "../view/puissance4.html";
        })
        img_mtc.addEventListener("click", call=>{
            window.location = "../view/motsCroises.html"
        })

        console.log(window.innerWidth)

        img_p4.style.marginRight = "100px";
        img_mtc.style.marginLeft = "100px";

        div_games.appendChild(img_p4);
        div_games.appendChild(img_mtc);

        // 2.3 - Redirection vers les règles
        let div_rules = document.createElement("div");
        div_rules.style.textAlign = "center";
        div_rules.style.marginTop = "20px";

        let button = document.createElement("button");
        button.textContent = "Règles";
        button.classList.add("rulesButton");

        button.addEventListener("click", evt => {
            window.location="../view/regles.html";
        })

        div_rules.appendChild(button);

        let trophees = document.createElement("button");
        trophees.textContent = "Trophées";
        trophees.classList.add("rulesButton");
        trophees.addEventListener("click", call=>{
            window.location = "../view/trophees.html";
        })
        // 3 - Tous ajouter dans le body
        page.appendChild(title_page);
        page.appendChild(div_games);
        page.appendChild(div_rules);
        page.appendChild(trophees);
    })

}