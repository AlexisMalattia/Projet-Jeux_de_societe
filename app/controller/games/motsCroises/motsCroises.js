import Grille from "./grille.js";
import Mot from "./mot.js";
import Lettre from "./lettre.js";

/**
 * Author : Loic AMANN
 */

window.onload = init;

let grille, mots = [], lettres = [];
let buttonVerify, buttonSimple, buttonMoyen, buttonDiffile, buttonAccueil;
let title;
let difficulte;
let compter = 0;
let boolSimpleVictory, boolMoyenVictory, boolDifficileVictory;

function init() {
    checkLocalStorageContentPuissance();
    const json = '{\n' +
        '  "simple" : [\n' +
        '    {\n' +
        '      "numero" : 1,\n' +
        '      "lettres" : "OISEAU",\n' +
        '      "definition" : "Famille d\'animaux à plume",\n' +
        '      "ligne" : 0,\n' +
        '      "colonne" : 1,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 2,\n' +
        '      "lettres" : "ARBRE",\n' +
        '      "definition" : "Grande plante possédant un tronc et des branches",\n' +
        '      "ligne" : 4,\n' +
        '      "colonne" : 3,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 3,\n' +
        '      "lettres" : "SOL",\n' +
        '      "definition" : "Ce sur quoi l\'on marche",\n' +
        '      "ligne" : 6,\n' +
        '      "colonne" : 6,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 4,\n' +
        '      "lettres" : "BRAS",\n' +
        '      "definition" : "Partie du corps humain",\n' +
        '      "ligne" : 6,\n' +
        '      "colonne" : 3,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 5,\n' +
        '      "lettres" : "MAMAN",\n' +
        '      "definition" : "Mot famillé pour désigner sa mère",\n' +
        '      "ligne" : 4,\n' +
        '      "colonne" : 0,\n' +
        '      "orientation" : "horizontale"\n' +
        '    }\n' +
        '  ],\n' +
        '  "moyen" : [\n' +
        '    {\n' +
        '      "numero" : 1,\n' +
        '      "lettres" : "VOITURE",\n' +
        '      "definition" : "Moyen de transport commun que l\'on conduit",\n' +
        '      "ligne" : 0,\n' +
        '      "colonne" : 3,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 2,\n' +
        '      "lettres" : "ALERTE",\n' +
        '      "definition" : "Signal qui prévient d\'un danger imminent",\n' +
        '      "ligne" : 2,\n' +
        '      "colonne" : 1,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 3,\n' +
        '      "lettres" : "ELLE",\n' +
        '      "definition" : "Pronom personnel féminin de la 3e personne",\n' +
        '      "ligne" : 4,\n' +
        '      "colonne" : 6,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 4,\n' +
        '      "lettres" : "CLAVIER",\n' +
        '      "definition" : "Ensemble des touches qui permette d\'écrire sur l\'ordinateur",\n' +
        '      "ligne" : 0,\n' +
        '      "colonne" : 0,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 5,\n' +
        '      "lettres" : "CAHIER",\n' +
        '      "definition" : "Ensemble de feuilles de papier attachées. Destiné à l\'écriture manuscrite",\n' +
        '      "ligne" : 2,\n' +
        '      "colonne" : 0,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 6,\n' +
        '      "lettres" : "URGENCE",\n' +
        '      "definition" : "Endroit médical où l\'on va lorsqu\'il y a nécessité d\'agir vite",\n' +
        '      "ligne" : 4,\n' +
        '      "colonne" : 3,\n' +
        '      "orientation" : "horizontale"\n' +
        '    }\n' +
        '  ],\n' +
        '  "difficile" : [\n' +
        '    {\n' +
        '      "numero" : 1,\n' +
        '      "lettres" : "OURAGAN",\n' +
        '      "definition" : "Tempête très violente, où la vitesse du vent dépasse 120 km à l\'heure",\n' +
        '      "ligne" : 1,\n' +
        '      "colonne" : 1,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 2,\n' +
        '      "lettres" : "TUBE",\n' +
        '      "definition" : "Conduit cylindrique",\n' +
        '      "ligne" : 1,\n' +
        '      "colonne" : 3,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 3,\n' +
        '      "lettres" : "LONGUEUR",\n' +
        '      "definition" : "Dans le même plan, la plus grande des deux dimensions de quelque chose de forme rectangulaire",\n' +
        '      "ligne" : 1,\n' +
        '      "colonne" : 5,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 4,\n' +
        '      "lettres" : "PETITESSE",\n' +
        '      "definition" : "Caractère de ce qui est petit, de petites dimensions",\n' +
        '      "ligne" : 0,\n' +
        '      "colonne" : 9,\n' +
        '      "orientation" : "verticale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 5,\n' +
        '      "lettres" : "HOSTILE",\n' +
        '      "definition" : "Qui se conduit en ennemi, qui manifeste des intentions agressives ",\n' +
        '      "ligne" : 1,\n' +
        '      "colonne" : 0,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 6,\n' +
        '      "lettres" : "ROBINET",\n' +
        '      "definition" : "Appareil servant à interrompre ou à rétablir la circulation de l\'eau dans un tuyau",\n' +
        '      "ligne" : 3,\n' +
        '      "colonne" : 1,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 7,\n' +
        '      "lettres" : "AMPLEUR",\n' +
        '      "definition" : "Importance, étendue, portée de quelque chose",\n' +
        '      "ligne" : 6,\n' +
        '      "colonne" : 1,\n' +
        '      "orientation" : "horizontale"\n' +
        '    },\n' +
        '    {\n' +
        '      "numero" : 8,\n' +
        '      "lettres" : "ROUGE",\n' +
        '      "definition" : "Couleur placée avant l\'orange dans le spectre de la décomposition de la lumière",\n' +
        '      "ligne" : 8,\n' +
        '      "colonne" : 5,\n' +
        '      "orientation" : "horizontale"\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    title = document.getElementById("title");
    title.textContent = "Mot croisé : Simple"

    buttonSimple = document.getElementById("simple");
    buttonMoyen = document.getElementById("moyen");
    buttonDiffile = document.getElementById("difficile");

    // creation du json
    const myjson = JSON.parse(json);
    difficulte = myjson.simple;
    initWords(difficulte);
    initGrid(mots);
    showDef();
    console.log("---------------------------------------------");

    // set difficulté de jeu
    buttonSimple.addEventListener("click", evt => {
        clearGrid();
        clearDef();
        difficulte = myjson.simple;
        title.textContent = "Mot croisé : Simple";
        initWords(difficulte);
        initGrid(mots);
        showDef(); //dessin des définitions
        console.log("---------------------------------------------");
    });
    buttonMoyen.addEventListener("click", evt => {
        clearGrid();
        clearDef();
        difficulte = myjson.moyen;
        title.textContent = "Mot croisé : Moyen";
        initWords(difficulte);
        initGrid(mots);
        showDef(); //dessin des définitions
        console.log("---------------------------------------------");
    });
    buttonDiffile.addEventListener("click", evt => {
        clearGrid();
        clearDef();
        difficulte = myjson.difficile;
        title.textContent = "Mot croisé : Difficile";
        initWords(difficulte);
        initGrid(mots);
        showDef(); //dessin des définitions
        console.log("---------------------------------------------");
    });

    // Envoye la réponse pour véerifier
    buttonVerify = document.querySelector("#button");
    buttonVerify.addEventListener("click", evt => {
        let input = document.querySelector("#input").value;
        console.log("Vous avez écrit : " + input + ".\n Est-il dans la grille ?");
        for(let i = 0; i < mots.length; i++){
            if (isCoorectWord(mots[i].toString(), input)) {
                for(let j = 0; j <  mots[i].lettres.length; j++) {
                    mots[i].lettres[j].isVisible();
                }
                if(compter == mots.length) {
                    //TODO faire apparaitre image de victoire avec animation
                    // Laisser l'accès au bouton de difficulté et accueil
                    let modaleSelector = document.querySelector(".modal");
                    modaleSelector.style.display = "block";
                    console.log("Fini");


                    let closeModale = document.getElementById("rejouer");
                    closeModale.addEventListener("click",event=>{
                        modaleSelector.style.display = "none";
                        document.location.reload();
                    });
                    let homePage = document.querySelector("#homePageImage")
                    homePage.addEventListener("click", goBack=>{
                        window.location = "../view/accueil.html";
                    });

                    console.log(" aya " + myjson.simple);

                    switch (difficulte) {
                        case myjson.simple :
                            boolSimpleVictory = true;
                            break;
                        case myjson.moyen :
                            boolMoyenVictory = true;
                            break;
                        case myjson.difficile :
                            boolDifficileVictory = true;
                            break;
                    }
                    populateStorageMC();
                    console.log("iiiiiiiiiiiiiiiiiiiiiiccccccccccccccccccccccccciiiiiiiiiiiiiiiiiiiiii");
                    console.log(boolDifficileVictory);
                    console.log(localStorage.getItem('difficile'));
                }
            }
        }
        console.log("Réinitialisation de la barre d'input.");
        document.getElementById("input").value = "";
    });

    buttonAccueil = document.getElementById("accueil");
    buttonAccueil.addEventListener("click", evt => {
        window.location = "../view/accueil.html";
    });

}

function initWords(difficulte) {
    mots = [];
    for(let i = 0; i < difficulte.length; i++) {
        let lettres = [];
        for(let j = 0; j <  difficulte[i].lettres.length; j++) {
            lettres[j] = new Lettre(difficulte[i].lettres[j], document.createElement("div"));
        }
        mots[i] = new Mot(difficulte[i].numero, lettres, difficulte[i].definition, difficulte[i].ligne, difficulte[i].colonne, difficulte[i].orientation);
    }
    console.log("Liste de mots :");
    console.log(mots);
}

function initGrid(mots) {
    console.log("Initialisation de la grille !");
    grille = new Grille(mots, 10,10);
}

/**
 * Permet d'ajouter les définitions des mots de la grille automatiquement
 */
function showDef() {
    console.log("Affichage des définitions");
    let mydiv = document.querySelector("#def");
    for(let i = 0; i < mots.length; i++) {
        let p = document.createElement("p");
        p.textContent = mots[i].numero + " - " + mots[i].definition;
        console.log("Définition du mot (" + mots[i].numero + ")-" + mots[i].toString() + " : OK !");
        p.id = i;
        mydiv.appendChild(p);
    }
}

/**
 * Permet de savoir si le mot envoyer par le joueur est dans la liste de ceux de la grille
 * @param jsonMot Mot dans la liste pour chercher une correspondance
 * @param inputMot Mot à vérifier
 * @returns {boolean} true si correspondance
 */
function isCoorectWord(jsonMot, inputMot) {
    if(inputMot.toUpperCase() == jsonMot) {
        console.log(jsonMot.toString() + " a été trouvé. Bravo !");
        compter++;
        console.log("Score = " + compter);
        return true;
    }
    return false;
}

//////////////////////////
/* Clear de l'affichage */
//////////////////////////
function clearGrid() {
    console.log("Clear de la grille");
    let divGrid = document.querySelector("#grille");
    for(let l = 0; l < grille.nbLignes; l++) {
        for(let c = 0; c < grille.nbColonnes; c++) {
            console.log("Remove");
            console.log(document.getElementById(l+","+c));
            divGrid.removeChild(document.getElementById(l+","+c));
        }
    }
}
function clearDef() {
    let mydiv = document.querySelector("#def");
    for(let i = 0; i < mots.length; i++) {
        mydiv.removeChild(document.getElementById(i));
    }
}

////////////////////////////////////
/* localStorage pour les trophées */
////////////////////////////////////
function populateStorageMC(){
    localStorage.setItem('simple', boolSimpleVictory);
    localStorage.setItem('moyen', boolMoyenVictory);
    localStorage.setItem('difficile', boolDifficileVictory);
    setStorageMC();
    console.log(localStorage.getItem('simple'));
}

function setStorageMC(){
    boolSimpleVictory = localStorage.getItem('simple');
    boolMoyenVictory = localStorage.getItem('moyen');
    boolDifficileVictory = localStorage.getItem('difficile');
}
function checkLocalStorageContentPuissance(){
    console.log(!localStorage.getItem('simple'));
    if(!localStorage.getItem('simple')){
        boolSimpleVictory = false;
        populateStorageMC();
    }
    if(!localStorage.getItem('moyen')){
        boolMoyenVictory = false;
        populateStorageMC();
    }
    if(!localStorage.getItem('difficile')){
        boolDifficileVictory = false;
        populateStorageMC();
    }
    else {
        setStorageMC();
    }
}