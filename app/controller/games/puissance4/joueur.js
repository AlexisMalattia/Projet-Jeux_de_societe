export default class Joueur{
    constructor(canvas,color,modele) {
        this.color = color;
        this.canvas = canvas;
        this.modele = modele;
        this.hasPlayed = false;
        this.posX = 0;
        this.posY = 0;
        //modele.test();
        canvas.addEventListener("click", (event)=>{
            if(this.modele.tour !== "" && this.modele.tour === this.color) {
                this.posX = event.offsetX;
                this.posY = event.offsetY;
                let case1 = this.modele.getPosCase(this.posX, this.posY);
                this.caseSelectionne = this.modele.ajouterJeton(case1, this.color);
                console.log(this.modele.plateauTab)
                this.hasPlayed = true;
            }
        });
    }
}
