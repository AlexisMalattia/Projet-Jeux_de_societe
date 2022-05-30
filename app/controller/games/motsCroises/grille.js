import { create2DArray } from "../utils.js";
export default class Grille {
    myGrid;

    constructor(listeMots, ligne, colonne) {
        this.listeMots = listeMots;
        this.nbLignes = ligne;
        this.nbColonnes = colonne;
        this.drawGrid();
        this.createGrid();
        this.insertGridInDiv();
        console.log(listeMots);
    }

    /**
     * Créer une grille de div pour l'affichage
     */
    drawGrid() {
        let grille = document.querySelector("#grille");

        for(let l = 0; l < this.nbLignes; l++) {
            for(let c = 0; c < this.nbColonnes; c++) {
                let motDiv = document.createElement("div");
                motDiv.id = l+','+c;
                grille.appendChild(motDiv);
            }
        }
        console.log(grille)
    }

    createGrid() {
        this.myGrid = create2DArray(this.nbLignes);
        for(let i = 0; i < this.listeMots.length; i++) {
            console.log("Ajout du mot " + this.listeMots[i].toString() + " dans la grille.");
            let indexLettre = 0;
            switch (this.listeMots[i].orientation) {
                case 'verticale' : {
                    for(let l = this.listeMots[i].ligne; l < this.listeMots[i].lettres.length + this.listeMots[i].ligne; l++) {
                        if(this.myGrid[l][this.listeMots[i].colonne] == null) {
                            this.myGrid[l][this.listeMots[i].colonne] = this.listeMots[i].lettres[indexLettre];
                            console.log(this.listeMots[i].lettres[indexLettre]);
                            console.log(this.myGrid[l][this.listeMots[i].colonne]);
                        }
                        else {
                            this.listeMots[i].lettres[indexLettre] = this.myGrid[l][this.listeMots[i].colonne];
                            console.log(this.listeMots[i].lettres[indexLettre]);
                            console.log(this.myGrid[l][this.listeMots[i].colonne]);
                        }
                        indexLettre++;
                    }
                    break;
                };
                case 'horizontale' : {
                    for(let c = this.listeMots[i].colonne; c < this.listeMots[i].lettres.length + this.listeMots[i].colonne; c++) {
                        if(this.myGrid[this.listeMots[i].ligne][c] == null) {
                            this.myGrid[this.listeMots[i].ligne][c] = this.listeMots[i].lettres[indexLettre];
                            console.log(this.listeMots[i].lettres[indexLettre]);
                            console.log(this.myGrid[this.listeMots[i].ligne][c]);
                        }
                        else {
                            this.listeMots[i].lettres[indexLettre] = this.myGrid[this.listeMots[i].ligne][c];
                            console.log(this.listeMots[i].lettres[indexLettre]);
                            console.log(this.myGrid[this.listeMots[i].ligne][c]);
                        }
                        indexLettre++;
                    }
                    break;
                };
            }
        }
        //console.log(this.myGrid);
    }

    insertGridInDiv() {
        let div;
        for(let l = 0; l < this.nbLignes; l++) {
            for (let c = 0; c < this.nbColonnes; c++) {
                div = document.getElementById(l+','+c);
                if(this.myGrid[l][c] != null) {
                    div.classList.add("lettre");
                    this.myGrid[l][c].balise.classList.add("lettre-cachee");
                    this.myGrid[l][c].balise.textContent = this.myGrid[l][c].caract;
                    div.appendChild(this.myGrid[l][c].balise);
                    console.log("Création de la div");
                    console.log(div);
                }
            }
        }
    }
}