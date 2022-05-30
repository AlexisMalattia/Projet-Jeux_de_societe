import {create2DArray} from "../utils.js";
import Jetons from "./jetons.js";

/**
 * Author : Alexis MALATTIA
 */

export default class Plateau{
    plateauTab = [];
    constructor(ligne,colonne,largeurCanvas,hauteurCanvas,assets) {
        this.nbLigne = ligne;
        this.nbColonne = colonne;
        this.assets = assets;
        this.largeurCanvas = largeurCanvas;
        this.hauteurCanvas = hauteurCanvas;
        this.largeurColonne = largeurCanvas/colonne;
        this.hauteurLigne = hauteurCanvas/ligne;
    }
    dessinerPlateau(ctx){
        //console.log(this.largeurColonne);
        //console.log(this.hauteurLigne);
        ctx.save();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "blue";
        for(let colonne = this.largeurColonne;colonne<this.largeurCanvas;colonne += this.largeurColonne ){
            ctx.moveTo(colonne,0);
            ctx.lineTo(colonne, this.hauteurCanvas);
        }
        for(let ligne = this.hauteurLigne;ligne<this.hauteurCanvas;ligne+=this.hauteurLigne){
            ctx.moveTo(0,ligne);
            ctx.lineTo(this.largeurCanvas,ligne);
        }
        ctx.stroke();
        ctx.restore();
    }

    ajouterJeton(ctx,posX,posY,jeton){

        jeton.dessinerJeton(ctx,posX*this.largeurColonne,posY*this.hauteurLigne,this.largeurColonne,this.hauteurLigne)
        /*let jeton = new Jetons("bleu",this.posX,this.posY,this.assets.jetonOrange);
        jeton.dessinerJeton(ctx,this.posX*this.largeurColonne,this.posY*this.hauteurLigne,this.largeurColonne,this.hauteurLigne)
        this.plateauTab[this.posX][this.posY] = jeton;
        console.log(this.plateauTab[0].length);*/
    }

    endScreen(couleur){
        let modaleSelector = document.querySelector(".modal");
        modaleSelector.style.display = "block";
        let modaleContent = document.querySelector("#textModal");
        if(couleur === "orange"){
            modaleContent.textContent = "Félicitations, vous avez gagné!"
        }
        else if(couleur ==="rouge"){
            modaleContent.textContent = "Vous avez perdu ..."
        }
        else{
            modaleContent.textContent = "C'est une égalité !";
        }
        let closeModale = document.querySelector(".rejouer");
        closeModale.addEventListener("click",event=>{
            modaleSelector.style.display = "none";
            document.location.reload();
        })
        let homePage = document.querySelector("#homePageImage")
        homePage.addEventListener("click", goBack=>{
            window.location = "../view/accueil.html";
        })
    }
    displayPseudo(pseudo){
        let pseudoPlace = document.querySelector(".user-fullName");
        pseudoPlace.textContent = pseudo;
    }
    displayPlayer(joueur){
        let player = document.querySelector(".score");
        player.textContent = "C'est au tour du joueur "+ joueur;
    }
    quit(){
        let buttonQuit = document.querySelector(".btn-turnBack");
        buttonQuit.addEventListener("click" ,quit=>{
            window.location = "../view/accueil.html";
        })
    }

}