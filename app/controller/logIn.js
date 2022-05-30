/**
 * Author : Alexis MALATTIA
 */


window.onload = init;
let pseudo;
let id;
function init(){
    let page = document.querySelector("div");
    let image = document.createElement("img");
    image.src = "../assets/avatar.png";
    image.classList.add("avatarImage");
    let title = document.createElement("p");
    id = document.createElement("input");
    console.log(localStorage);
    id.classList.add("inputClass");
    checkLocalStorageContent();
    title.textContent = "Identifiez vous";
    title.classList.add("titleId");
    id.type = "text";
    id.placeholder = "Entrez un pseudo";
    let button = document.createElement("button");
    button.textContent = "Valider";
    button.classList.add("validateButton")
    page.append(image);
    page.append(title);
    page.append(id);
    page.append(button);
    id.onchange = setPseudo;


    let erreurLocalStorage = document.createElement("p");
    erreurLocalStorage.classList.add("erreurLocalStorage");
    erreurLocalStorage.textContent = "La fonction local storage n'est pas activé sur votre navigateur, vos données ne seront pas sauvegardées.";

    let emptyPseudoField = document.createElement("p");
    emptyPseudoField.textContent = "Veuillez entrer un pseudo";
    emptyPseudoField.classList.add("emptyPseudo");
    button.addEventListener("click", savePseudo => {
        pseudo = id.value;
        console.log(pseudo);
        if(pseudo !== ""){
            window.location="../view/accueil.html";
        }
        else{
            page.append(emptyPseudoField);
        }

    })

    if (storageAvailable('localStorage')) {
        console.log("Local storage fonctionnel");
    }
    else {
        page.append(erreurLocalStorage);
        console.log("Local storage indisponible");
    }

}
function storageAvailable(type) { //code issu de la documentation developer.mozilla.org
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
function setPseudo(){
    pseudo = id.value;
    populateStorage();
}
function checkLocalStorageContent(){
    if(!localStorage.getItem('pseudo')){
        populateStorage()
    }
    else{
        setStorage();
    }
}

function populateStorage(){
    localStorage.setItem('pseudo', pseudo);
    setStorage()
}

function setStorage(){
    id.value = localStorage.getItem('pseudo');
}