// @ts-check

function setup() {

    let btnFunksjon = document.getElementById("visListe");
    btnFunksjon.addEventListener("click", selg);

    

    let a = new Ting("sølv", 3, 3);
    let b = new SalgbarTing("melk", 2, 3, 50);
    let c = new SalgbarTing("Fisk", 4, 4, 120);
    let d = new Ting("bamse", 2, 4);
    let e = new SalgbarTing("Fsk", 4, 4, 20);

    e.selg();


    let arrayMedTing = [a,b,c,d,e];

    function test(){
        console.log(a);
    }

    function selg() {
        let sum = 0;
        for (let ting of arrayMedTing) {
            if (ting.constructor.name === "SalgbarTing" && ting.solgt === false) {
                sum += ting.pris();
                ting.selg();
            }
        }
        return sum;
    }
}

class Ting {

    constructor(navn, masse, volum) {
        this.navn = navn;
        this.masse = masse;
        this.volum = volum;
    }

    // beregner tettheten til denne tingen
    tettehet() {
        return this.masse / this.volum;
    }
}
class SalgbarTing extends Ting {

    constructor(navn, masse, volum, kilopris) {
        // må lage den vanlige tingen først
        super(navn, masse, volum);
        this.kilopris = kilopris;
        this.solgt = false;  // vi har ikke solgt den ennå
    }

    // hva koster denne tingen
    pris() {
        return this.masse * this.kilopris;
    }

    // selg tingen
    selg() {
        this.solgt = true;
    }
}