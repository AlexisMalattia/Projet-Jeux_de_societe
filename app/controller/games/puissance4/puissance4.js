import Plateau from "./plateau.js";
import {loadAssets} from "../../assets.js";
import Modele from "./modele.js";
import Joueur from "./joueur.js";

/**
 * Author : Alexis MALATTIA
 */

window.onload = init;
let plateau;
let canvas, ctx, largeurCanvas, hauteurCanvas;
let joueurRouge, joueurJaune;
let modele;
let joueur;
let tour;
let listeJoueurs;
let caseSelectionne;
let compteurVictoire;
let compteurDefaite;

function init() {

    loadAssets((assetLoaded) => {
        canvas = document.querySelector("canvas");
        checkLocalStorageContentPuissance();
        console.log("La valeur du compteur est " + localStorage.getItem('compteurP4'));
        console.log(localStorage);
        listeJoueurs = [];
        tour = "Joueur 1";
        ctx = canvas.getContext("2d");
        let container = document.querySelector(".game-container");
        fitToContainer(canvas);
        console.log(container)
        largeurCanvas = canvas.width;
        hauteurCanvas = canvas.height;
        modele = new Modele(6, 7, largeurCanvas, hauteurCanvas, assetLoaded);
        plateau = new Plateau(6, 7, largeurCanvas, hauteurCanvas, assetLoaded);
        joueurRouge = new Joueur(canvas, "orange", modele);
        joueurJaune = new Joueur(canvas, "rouge", modele);
        listeJoueurs.push(joueurRouge);
        listeJoueurs.push(joueurJaune);
        modele.initGrid();
        plateau.dessinerPlateau(ctx);
        plateau.displayPseudo(localStorage.getItem("pseudo"));
        plateau.quit();
        console.log(modele.plateauTab[1][1]);
        requestAnimationFrame(jouer.bind(this));
        //jouer();


        //console.log(caseSelectionne);

    })
}
function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
function jouer(){
    switch (tour) {
        case "Joueur 1":
            joueur = listeJoueurs[0];
            modele.setTour(joueur.color);
            plateau.displayPlayer(joueur.color);
            if(joueur.hasPlayed){
                //alert("je suis dans la boucle");
                gestionTour(joueur.caseSelectionne);
                if(modele.plateauComplet()){
                    plateau.endScreen("autre");
                }
                if (modele.endGame()) {
                    if(modele.gagnant === "orange"){
                        compteurVictoire++;
                        populateStoragePuissance();
                    }
                    console.log(modele.gagnant);
                    plateau.endScreen(modele.gagnant);
                }
                tour = "Joueur 2";
                joueur.hasPlayed = false;
            }
            break
        case "Joueur 2":
            joueur = listeJoueurs[1];
            modele.setTour(joueur.color);
            plateau.displayPlayer(joueur.color);
            //console.log("je suis la")
            if(joueur.hasPlayed){
                //alert("je suis dans la boucle");
                gestionTour(joueur.caseSelectionne);
                if(modele.plateauComplet()){
                    plateau.endScreen("autre");
                }
                if (modele.endGame()) {
                    if(modele.gagnant === "rouge"){
                        compteurDefaite++;
                        populateStoragePuissance();
                    }
                    plateau.endScreen(modele.gagnant);
                }
                tour = "Joueur 1";
                joueur.hasPlayed = false;
            }
            break
    }
    //plateau.ajouterJeton(ctx, modele.posX, modele.posY, caseSelectionne);
    modele.checkVictory();
    requestAnimationFrame(jouer.bind(this));
}

function gestionTour(caseSelectionne) {
    //caseSelectionne = this.modele.getPosCase(joueur.posX,joueur.posY);
    //console.log(caseSelectionne);
   // console.log(modele.posX);
   // console.log(modele.posY);
    //let jeton = modele.ajouterJeton(ctx, caseSelectionne);
    let posX = modele.posX;
    let posY = modele.posY;
    if (caseSelectionne != null) {
        plateau.ajouterJeton(ctx, posX, posY, caseSelectionne);
        modele.checkVictory();
    }
}

function populateStoragePuissance(){
    localStorage.setItem('compteurP4',compteurVictoire);
    localStorage.setItem('compteurDefaiteP4',compteurDefaite);
    setStoragePuissance();
}
function setStoragePuissance(){
    compteurVictoire = localStorage.getItem('compteurP4');
    compteurDefaite = localStorage.getItem('compteurDefaiteP4');
}

function checkLocalStorageContentPuissance(){
    if(!localStorage.getItem('compteurP4')){
        compteurVictoire = 0;
        populateStoragePuissance();
    }
    if(!localStorage.getItem('compteurDefaiteP4')){
        compteurDefaite = 0;
        populateStoragePuissance();
    }
    else{
        setStoragePuissance();
    }
}
