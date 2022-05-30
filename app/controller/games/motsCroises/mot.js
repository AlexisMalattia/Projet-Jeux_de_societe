export default  class Mot {
    constructor(numero, lettres, definition, l, c, orientation) {
        this.lettres = lettres;
        this.numero = numero;
        this.definition = definition;
        this.ligne = l;
        this.colonne = c;
        this.orientation = orientation;
    }

    toString() {
        let mystring = "";
        for(let c = 0; c < this.lettres.length; c++) {
            mystring += this.lettres[c].caract;
        }
        return mystring;
    }
}