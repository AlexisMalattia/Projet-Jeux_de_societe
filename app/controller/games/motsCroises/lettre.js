export default  class Lettre {
    constructor(caract, balise) {
        this.caract = caract;
        this.balise = balise;
    }

    /**
     * Cache la balise devant le caractère en retirant la classe css.
     */
    isVisible() {
        this.balise.classList.remove("lettre-cachee");
        console.log(this.caract + " n'est plus caché");
    }
}