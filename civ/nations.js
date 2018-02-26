

class Nation{
    constructor(navn,leder,tittel,hovedstad){
        this.navn = navn; 
        this.leder = leder;
        this.tittel = tittel;
        this.hovedstad = hovedstad;
    }
}

class Player{
    constructor(navn,nation){
        this.navn = navn;
        this.nation = nation;
    }

    greet() {
        console.log("Hello - the mighty", this.nation.navn, "greets you");
    }
}

let norge = new Nasjon ("Norge","Harald","King","Oslo");
let england = new Nasjon ("England","Elizabeth","Queen","London");
let danmark = new Nasjon ("Danmark","Tove Grete","Pharao","København");

let thomas = new Spiller("Thomas",england);
let james = new Spiller("James",norge);
let john = new Spiller("John", danmark);

let playerList = [thomas, james, john];

for(let spiller of playerList){
    console.log(spiller.navn + ", "+spiller.nation.tittel);
}