// @ts-check

function setup(){

    let divRegbox = document.getElementById("regbox");
    let divGamebox = document.getElementById("gamebox");
    let divLagreBox = document.getElementById("lagrebox");

    let inpName = document.getElementById("name");
    let inpLastName = document.getElementById("lastName");
    let inpUserName = document.getElementById("userName");

    let inpMelee = document.getElementById("mel");
    let inpRange = document.getElementById("ran");
    let inpMage = document.getElementById("mag");

    let btnRegistrer = document.getElementById("registrer");
    btnRegistrer.addEventListener("click", startSpill);

    let btnSaveScore = document.getElementById("saveScore");
    btnSaveScore.addEventListener("click", saveScore);

    // defender (name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse)

    let range = new defender("range",50,70,10,5,10,10,10,340,0);
    let mage = new defender("mage",40,50,8,6,8,8,10,350,0);
    let melee = new defender("melee",80,100,2,10,5,5,10,310,0);

    let score = 0;
    let scoreArray = [];

    let character;

    window.addEventListener("keydown", registrerKey);
    window.addEventListener("keyup", cancelKey);

    let keys = {};

    function registrerKey(keyEvent) {
        keys[keyEvent.keyCode] = 1; // marker at denne key er aktiv
    }

    function cancelKey(keyEvent) {
        keys[keyEvent.keyCode] = 0; // bruker slapp opp denne key-en
    }

    let gameInPlay = false;
    let box;
    let grenseBunn;
    let grenseSide;
    let gravity;
    let startX;
    let startY;
    function startSpill(){
        if(gameInPlay){
            character.speedY = gravity;
            character.posX = startX;
            character.posY = startY;
        }
        divGamebox.innerHTML = "";
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

        if(!gameInPlay){
            setInterval(gameEngine, 60);
            gameInPlay = true;
        }
    }

   

    function gameEngine(){
        styrSpillet();
        jump();
        flytt();
        tegnSpill();
    }

    function tegnSpill(){
        box.style.left = character.posX + "px";
        box.style.top = character.posY + "px";
    }

    let bevegelse;
    let hopp = false;
    let antallHopp = 0;
    function styrSpillet() {
        if (keys[39] === 1) {
            bevegelse = 2; //går mot høyre
        } else if(keys[37] === 1){
            bevegelse = 1; //går mot venstre
        } else if (keys[39] === 0 && keys[37] === 0) {
            bevegelse = 0; //står i ro
        }
        if (keys[38] === 1) {
            antallHopp ++;
            if(antallHopp >= 4){
                return;
            }
            character.speedY = 2 * gravity;
            hopp = true; //kjører funksjonen jump
        }
    }
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
}

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

    die() {
        this.dead = true;
    }
    
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
    shoot(){

    }
}