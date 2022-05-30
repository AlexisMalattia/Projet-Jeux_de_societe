import Jetons from "./jetons.js";
import {create2DArray} from "../utils.js";

/**
 * Author : Alexis MALATTIA
 */

export default class Modele{
    plateauTab = [];
    posX;
    posY;
    termine = false;
    gagnant;
    constructor(ligne,colonne,largeurCanvas,hauteurCanvas,assets) {
        this.ligne = ligne;
        this.colonne = colonne;
        this.tour = "";
        this.largeurCanvas = largeurCanvas;
        this.hauteurCanvas = hauteurCanvas;
        this.largeurColonne = largeurCanvas/colonne;
        this.hauteurLigne = hauteurCanvas/ligne;
        this.assets = assets;
    }

    setTour(tour){
        this.tour = tour;
    }

    initGrid(){
        this.plateauTab = create2DArray(this.colonne);
        for(let i = 0; i<this.colonne; i++){
            for(let y = 0; y<this.ligne; y++){
                this.plateauTab[i][y] = {};
                //console.log(this.plateauTab[i][y]);
            }
        }
       // console.log(this.plateauTab);
    }
    /*createJeton(joueur,ligne,colonne,image) {
        let jetons = new Jetons(joueur, ligne, colonne, image)
    }
    addJetonToList(joueur,jeton){
        if(jeton.joueur === this.joueurRouge){
            this.jetonsRouges.push(jeton);
        }
        else{
            this.jetonsOranges.push(jeton);
        }
    }*/
    getPosCase(x,y){
        this.posX = Math.floor(x/this.largeurColonne);
        this.posY = Math.floor(y/this.hauteurLigne);
        //console.log(this.posX);
        //console.log(this.posY);
        return this.plateauTab[this.posX][this.posY];
    }
    /**
     *
     * @param obj un objet
     * Si la case entrée en paramètre est vide, renvoie true;
     * en revanche, si la case n'est pas un object ou si elle contient un jeton, renvoie faux
     * @returns {boolean}
     */
    verifierCaseDuDessous(obj) {
        if(typeof(obj) === "object"){ //Au cas où je suis à la dernière ligne du tableau et que la ligne i+1 n'est pas définie
            return Object.keys(obj).length === 0;
        }
        else{
            return false;
        }

    }


    ajouterJeton(caseSelectionne, couleur) {
        if (this.verifierCaseDuDessous(caseSelectionne)) {
            let i = this.posY
            while (i < this.plateauTab[0].length) {
                if (this.verifierCaseDuDessous(this.plateauTab[this.posX][i + 1])) {
                    i++
                } else {
                    let jeton;
                    if(couleur === "orange"){
                        jeton = new Jetons(couleur, this.posX, i, this.assets.jetonOrange);
                    }else{
                        jeton = new Jetons(couleur, this.posX, i, this.assets.jetonRouge);
                    }
                    this.posY = i;
                    this.plateauTab[this.posX][i] = jeton;

                    //console.log(this.posX);
                    //console.log(this.posY)
                    return jeton;
                }
            }
        } else {
            alert("Case déjà utilisée");
            return null;
        }

    }
    checkVictoryTLignes(){
        for(let l = 0; l < this.colonne;l++){
            this.checkVictoryLigne(l)
        }
    }
    checkVictoryLigne(ligne){
        let tableauLigne = this.plateauTab[ligne];
        for(let j = 0; j <= this.ligne-4;j++){
            let premier = tableauLigne[j];
            let deuxieme = tableauLigne[j+1];
            let troisieme = tableauLigne[j+2];
            let quatrieme =tableauLigne[j+3];
            /*if(this.notAnEmptyObject(premier,deuxieme,troisieme,quatrieme)){
                if((premier.joueur === deuxieme.joueur)&&(deuxieme.joueur === troisieme.joueur)&&(troisieme.joueur === quatrieme.joueur)&&(premier.joueur!=null)){
                    this.endGame(premier.joueur);
                    break
                }
            }*/
            if(this.doCompare(premier,deuxieme,troisieme,quatrieme)){
                break
            }
        }
    }
    alignementDiagonalesPos(){
        for(let c = 0; c <= this.ligne-3; c++ ){
            for(let i = 0; i <= this.colonne-2  ; i++){
                let c1 = this.plateauTab[c][i];
                let c2 = this.plateauTab[c+1][i-1];
                let c3 = this.plateauTab[c+2][i-2];
                let c4 = this.plateauTab[c+3][i-3];
                if(this.doCompare(c1,c2,c3,c4)){
                    break
                }
            }
        }
    }
    alignementDiagonalesNeg(){
        for(let c = this.ligne; c >= 3; c-- ){
            for(let i = this.colonne; i >= 3; i--){
                let c1 = this.plateauTab[c][i];
                let c2 = this.plateauTab[c-1][i-1];
                let c3 = this.plateauTab[c-2][i-2];
                let c4 = this.plateauTab[c-3][i-3];
                if(this.doCompare(c1,c2,c3,c4)){
                    break
                }
            }
        }
    }
    checkVictoryTColonnes(){
        for(let c = 0; c < this.ligne;c++){
            this.checkVictoryColonne(c)
        }
    }
    checkVictoryColonne(colonne){
        let tableauColonne = this.plateauTab;
        for(let j = 0; j <= this.colonne-4;j++){
            let premier = tableauColonne[j][colonne];
            let deuxieme = tableauColonne[j+1][colonne];
            let troisieme = tableauColonne[j+2][colonne];
            let quatrieme = tableauColonne[j+3][colonne];
            //if ((typeof(premier.joueur) !== "undefined")&&typeof(deuxieme.joueur)!=="undefined"&&(typeof(troisieme.joueur) !== "undefined")&&(typeof(quatrieme.joueur) !== "undefined")){
            /*if(this.notAnEmptyObject(premier,deuxieme,troisieme,quatrieme)){
                if((premier.joueur === deuxieme.joueur)&&(deuxieme.joueur === troisieme.joueur)&&(troisieme.joueur === quatrieme.joueur)&&(premier.joueur!=null)){
                    this.endGame(premier.joueur);
                    break
                }
            }*/
            if(this.doCompare(premier,deuxieme,troisieme,quatrieme)){
                break
            }
        }


    }
    notAnEmptyObject(c1,c2,c3,c4){
        return typeof (c1) === "object" && typeof (c2) === "object" && typeof (c3) === "object" && typeof (c4) === "object";
        //return Object.entries(c1).length !== 0 && Object.entries(c2).length !== 0 && Object.entries(c3).length !== 0 && Object.entries(c4).length !== 0;

    }
    doCompare(premier,deuxieme,troisieme,quatrieme){
        if(this.notAnEmptyObject(premier,deuxieme,troisieme,quatrieme)){
            if((premier.joueur === deuxieme.joueur)&&(deuxieme.joueur === troisieme.joueur)&&(troisieme.joueur === quatrieme.joueur)&&(premier.joueur!=null)){
                this.gagnant = premier.joueur;
                this.terminal = true;
                return true;
            }
        }
    }
    checkVictory(){
        this.alignementDiagonalesPos();
        this.alignementDiagonalesNeg();
        this.checkVictoryTColonnes();
        this.checkVictoryTLignes();
    }
    plateauComplet(){
        let tableau = this.plateauTab;
        let compteur = 0;
        for(let i = 0; i< this.colonne; i++){
            for(let j = 0; j<this.ligne; j++){
                if(Object.keys(tableau[i][j]).length !== 0){
                    compteur++;
                }
            }
        }
        return compteur === 42;

    }

    endGame(){
        if(this.terminal){
            return true;
        }
        return false;
    }

}