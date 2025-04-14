class Pilota {
    constructor(x, y, velX, velY, color, mida) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }

    dibuxa(ctx) {
        ctx.beginPath(); // Per començar a dibuixar formes al canvas
        ctx.fillStyle = this.color; //Color amb que dibuixarem
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); //Dibuix d'un arc
        ctx.fill(); // Finalitza el dibuix i l'omple amb el color ja esmenat
    }

    //let Pilota1 = new Pilota(50, 100, 4, 4, "blue", 10);
    //Pilota1.dibuxa(ctx);

    mou(canvasWidth, canvasHeight) {

        //Aquest codi comproba les colisions horitzontals(esquerre i dreta)
        if (this.x + this.mida > canvasWidth || this.x - this.mida < 0) {
            this.velX = -this.velX;
        }

        //Comprovar colisions verticals (a dalt i a baix)
        if (this.y + this.mida > canvasHeight || this.y - this.mida < 0) {
            this.velY = -this.velY;
        }

        //Aixo mou la pilota
            //Afegeix la velocitat a la posicio per a que la pilota es desplaci
            //Si ha rebotat, anira en la nova direccio
        this.x += this.velX;
        this.y += this.velY;

    }

}
//Aixo exporta la classe Pilota, fent que pugui ser importada en altres arxius JS
    //export: li diu a JS que vols fer disponible alguna cosa fora de l'arxiu on esta definit
    //defualt: indica que aquest es el valor principal que s'exporta des d'aquest arxiu
export default Pilota;