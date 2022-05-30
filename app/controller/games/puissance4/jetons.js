export default class Jetons{
    constructor(joueur,ligne,colonne,image) {
        this.joueur = joueur;
        this.ligne = ligne;
        this.colonne = colonne;
        this.image = image;
        this.image.width = 80;
        this.image.height = 80;
        this.image.dataset.ligne = ligne;
        this.image.dataset.colonne = colonne;
    }
    dessinerJeton(ctx,x,y,width,height){
        ctx.save();
        ctx.drawImage(this.image,x,y,width,height);
        ctx.restore();
    }
}