/**
 * Author : Alexis MALATTIA
 */


window.onload = init;
let compteurVictoire;
let compteurDefaite;
let boolSimpleVictory, boolMoyenVictory, boolDifficileVictory;

function init() {
    console.log(localStorage);
    checkLocalStorageContentTrophees();
    let placePseudo = document.querySelector(".logoDIv");
    let storage = document.createElement("div");
    storage.textContent = localStorage.getItem('pseudo');
    storage.classList.add("pseudo");
    placePseudo.append(storage);
    console.log(compteurVictoire);
    console.log(compteurDefaite);

    let detailsDiv = document.querySelectorAll(".detail");
    detailsDiv[0].textContent += compteurVictoire;
    detailsDiv[1].textContent += compteurDefaite;

    console.log("aya " + boolSimpleVictory);

    if(boolSimpleVictory &&  localStorage.getItem('simple')!="undefined")
        detailsDiv[2].textContent += "Réussi";
    else
        detailsDiv[2].textContent += "Non fait";

    if(boolMoyenVictory && localStorage.getItem('moyen')!="undefined")
        detailsDiv[3].textContent += "Réussi";
    else
        detailsDiv[3].textContent += "Non fait";

    if(boolDifficileVictory && localStorage.getItem('difficile')!="undefined")
        detailsDiv[4].textContent += "Réussi";
    else
        detailsDiv[4].textContent += "Non fait";

    let homePage = document.querySelector(".button");
    homePage.addEventListener("click", call=>{
        window.location = "../view/accueil.html";
    })
}
function populateStorageTrophees(){
    localStorage.setItem('compteurP4',compteurVictoire);
    localStorage.setItem('compteurDefaiteP4',compteurDefaite);
    localStorage.setItem('simple', boolSimpleVictory);
    localStorage.setItem('moyen', boolMoyenVictory);
    localStorage.setItem('difficile', boolDifficileVictory);
    console.log("byb " + boolSimpleVictory);
    setStorageTrophees();
}
function setStorageTrophees(){
    compteurVictoire = localStorage.getItem('compteurP4');
    compteurDefaite = localStorage.getItem('compteurDefaiteP4');
    boolSimpleVictory = localStorage.getItem('simple');
    boolMoyenVictory = localStorage.getItem('moyen');
    boolDifficileVictory = localStorage.getItem('difficile');
    console.log("cyc " + boolSimpleVictory);
}
function checkLocalStorageContentTrophees(){
    if(!localStorage.getItem('compteurP4')){
        populateStorageTrophees();
    }
    if(!localStorage.getItem('compteurDefaiteP4')){
        populateStorageTrophees();
    }
    if(!localStorage.getItem('simple'))
        populateStorageTrophees();
    if(!localStorage.getItem('moyen'))
        populateStorageTrophees();
    if(!localStorage.getItem('difficile'))
        populateStorageTrophees();
    else{
        setStorageTrophees();
    }
}

