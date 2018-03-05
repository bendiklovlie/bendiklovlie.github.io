// @ts-check

function setup(){

    // lager her koblinger mellom HTML-elementene

    let divRegbox = document.getElementById("regbox");
    let divGamebox = document.getElementById("gamebox");
    let divLagreBox = document.getElementById("lagrebox");
    let divRotate = document.getElementById("rotate");

    let inpName = document.getElementById("name");
    let inpLastName = document.getElementById("lastName");
    let inpUserName = document.getElementById("userName");

    let inpMelee = document.getElementById("mel");
    let inpRange = document.getElementById("ran");
    let inpMage = document.getElementById("mag");

    // eventlistener for knappen som starter spill
    let btnRegistrer = document.getElementById("registrer");
    btnRegistrer.addEventListener("click", startSpill);

    // eventlistener for knappen som lagrer score
    let btnSaveScore = document.getElementById("saveScore");
    btnSaveScore.addEventListener("click", saveScore);

    // defender (name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse)
    // her er tre ferdilagte instanser av klassen defender,
    // men har tenkt å åpne for at brukeren
    // kan lage en custom defender

    let range = new defender("range",50,70,10,5,10,10,10,340,0);
    let mage = new defender("mage",40,50,8,6,8,8,10,350,0);
    let melee = new defender("melee",80,100,2,10,5,5,10,310,0);


    window.addEventListener("keydown", registrerKey);
    window.addEventListener("keyup", cancelKey);

    let keys = {};

    function registrerKey(keyEvent) {
        keys[keyEvent.keyCode] = 1; // markerer at denne key-en er aktiv
    }
    function cancelKey(keyEvent) {
        keys[keyEvent.keyCode] = 0; // bruker slapp opp denne key-en
    }

    let score = 0;
    let scoreArray = [];
    let gameInPlay = false;
    let box;
    let grenseBunn;
    let grenseSide;
    let gravity;
    let startX;
    let startY;
    let character;

    // her lager/tegner vi og figuren vi skal bruke
    function startSpill(){
        if(gameInPlay){
            character.speedY = gravity;
            character.posX = startX;
            character.posY = startY;
        }
        divGamebox.innerHTML = "";

        //sjekker hvilken instans av defender brukeren har valgt
        if(inpMelee.checked){
            character = melee;
            grenseBunn = 310;
        } else if(inpRange.checked){
            character = range;
            grenseBunn = 340;
        } else if(inpMage.checked){
            character = mage;
            grenseBunn = 350;
        }

        box = document.createElement('div');
        box.className = character.name;
        box.style.left = character.posX + "px";
        grenseSide = 10;
        startX = character.posX;
        box.style.top = character.posY + "px";
        startY = character.posY;
        box.style.width = character.size + "px";
        box.style.height = character.size + "px";
        divGamebox.appendChild(box);
        gravity = character.speedY;

        // her starter vi hele spillet
        if(!gameInPlay){
            setInterval(gameEngine, 60);
            gameInPlay = true;
        }
    }

   
    // det er denne funksjonen som er motoren i spillet.
    // Den kjører alle funksjonene som er nødvendig for 
    // at spillet skal fungere.
    // Den kjører ved hjelp av setInterval i startSpill() funksjonen
    function gameEngine(){
        styrSpillet();
        jump();
        flytt();
        tegnSpill();
    }

    // denne funksjonen oppdaterer hele tiden 
    // posisjonen til figuren vi styrer
    function tegnSpill(){
        box.style.left = character.posX + "px";
        box.style.top = character.posY + "px";
    }

    let bevegelse;
    let hopp = false;
    let antallHopp = 0;

    // Styrer hvordan figuren beveger seg ved
    // hjelp av piltastene
    function styrSpillet() {
        if (keys[39] === 1) { //piltast høyre
            bevegelse = 2; //går mot høyre
        } else if(keys[37] === 1){ //piltast venstre
            bevegelse = 1; //går mot venstre
        } else if (keys[39] === 0 && keys[37] === 0) { // verken piltast høyre eller venstre
            bevegelse = 0; //står i ro
        }
        if (keys[38] === 1) { //piltast opp
            antallHopp ++;
            if(antallHopp >= 4){       //gjør det mulig med dobbelhopp
                return;                //og egentlig trippel, men får det     
            }                          //ikke til å fungere i selve spillet     
            character.speedY = 2 * gravity;
            hopp = true; //kjører funksjonen jump
        }
        if (keys[32] === 1){
            if(rotert){
                rotate.playbackRate = -1;
                rotate.play();
                rotert = false;
            } else {                            // animasjonen vil gå
                rotate.playbackRate = 1;        // fram og tilbake ved 
                rotate.play();                  // trykk på space
                rotert = true;
            }
        }
    }
    // funksjonen styrer bevegelse i x-retning, altså høyre og venstre
    function flytt(){
        if(bevegelse === 0){
            return;
        } else if(bevegelse === 1){
            character.posX -= character.speedX;
        } else if (bevegelse === 2){
            character.posX += character.speedX;
        }
        if(character.posX <= grenseSide){
            character.posX = grenseSide;
        }
    }
    // funksjonen styrer bevegelse i y-retning, altså opp og ned
    function jump(){
        if(!hopp){
            return;
        } else {
            character.posY = character.posY - character.speedY;
            character.speedY = character.speedY - 2;
        if(character.posY >= grenseBunn){
            antallHopp = 0;
            character.speedY = 0;
            character.posY = grenseBunn;
            hopp = false;
        }
        }
        
    }
    // bruker array og for-løkke av typen for(let .. of ..) for
    // å gjøre det mulig å lagre scoren en får
    function saveScore(){
        let userName = inpUserName.value;
        if(userName === undefined || userName === ""){
            return;
        }
        scoreArray.push("" + userName + "___" + score);
        let s = "";
        for(let score of scoreArray){
            s += "" + score + "<br>";
        }
        divLagreBox.innerHTML = s;
    }


    //under her er for å dekke flere kompetansemål

    // her er en enkel konverterer som konverterer fra
    // nautiske mil til kilometer og omvendt
    let inpKilometer = document.getElementById("kilometer");
    let inpNautisk = document.getElementById("nautisk");
    let divSvar = document.getElementById("svar");

    let btnk2n = document.getElementById("k2n");
    btnk2n.addEventListener("click", k2n);

    let btnn2k = document.getElementById("n2k");
    btnn2k.addEventListener("click", n2k);

    function k2n(event) {
        let kilometer = inpKilometer.value;
        inpNautisk.value = convertK(kilometer).toFixed(2);

    }
    function n2k(event) {
        let nautisk = inpNautisk.valueAsNumber;
        inpKilometer.value = convertN(nautisk).toFixed(2);

    }

    //bruker her noen enkle beregninger
    function convertK(kilometer) {
        return kilometer / 1.852;
    }
    function convertN(nautisk) {
        return nautisk * 1.852;
    }

    //lager her en liten animasjon ved hjelp av web animation api

    let rotateFrames = [
        { transform: 'rotate(0) translate3D(-50%, -50%, 0)', left:"400px"},
        { transform: 'rotate(360deg) translate3D(-50%, -50%, 0)', left:"700px"}
    ];
    let rotateSettings = {
        duration: 2000,
        iterations: 1,
        fill: "forwards"
    };
    let rotate = divRotate.animate(rotateFrames,rotateSettings);
    let rotert = true;
    
}

// lager her en klasse med egenskapene jeg vil at "defenderen" skal ha.

class defender {
    constructor(name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse){
        this.name = name;
        this.size = size;
        this.health = health;
        this.range = range;
        this.damage = damage;
        this.speedX = speedX;
        this.speedY = speedY;
        this.posX = posX;
        this.posY = posY;
        this.bevegelse = bevegelse;
        this.dead = false;
    }

    // åpner muligheten for at defenderen kan dø,
    // selv om jeg ikke har tatt i bruk denne funksjonen enda
    die() {
        this.dead = true;
    }
    
    // synes det var lettere å kjøre disse funksjonene under setup()
    // og har derfor kommentert de ut dersom jeg kan trenge
    // de senere
   /* flytt(){
        if(this.bevegelse === 0){
            return;
        } else if(this.bevegelse === 1){
            this.posX -= this.speedX;
        } else if (this.bevegelse === 2){
            this.posX += this.speedX;
        }
    }*/
    /*jump(){
        this.posY = this.posY - this.speedY;
    }*/

    // Har ikke fått lagt til en skyte-funksjon, men har
    // tenkt å gjøre dette senere, kommer kanskje til å lage denne
    // under setup() også
    shoot(){

    }
}
//Lager bare et eksempel på extension av class,
//har ikke tatt det i bruk i koden
class moneyDefender extends defender {

    constructor(name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse,money){
        
        super(name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse);
        this.money = money;
        this.bought = false;
    }

    buy(){
        this.bought = true;
    }
}