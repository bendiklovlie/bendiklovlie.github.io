// @ts-check

function setup(){

    // lager her koblinger mellom HTML-elementene

    let divRegbox = document.getElementById("regbox");
    let divGamebox = document.getElementById("gamebox");
    let divLagreBox = document.getElementById("lagrebox");
    let divRotate = document.getElementById("rotate");
    let divTest = document.getElementById("test");

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

    // defender (name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse, skuddFart)
    // her er tre ferdilagte instanser av klassen defender,
    // men har tenkt å åpne for at brukeren
    // kan lage en custom defender

    let range = new Defender("range",100,70,10,5,10,10,10,340,0,10);
    let mage = new Defender("mage",100,50,8,6,8,8,10,350,0,8);
    let melee = new Defender("melee",100,100,2,10,5,5,10,310,0,5);


    window.addEventListener("keydown", registrerKey);
    window.addEventListener("keyup", cancelKey);
    window.addEventListener("keydown", lastKeyPressed);

    let lastKey;
    function lastKeyPressed(keyEvent){
        lastKey = keyEvent.keyCode;
    }

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
    let animation;
    let counter = 0;
    
    let enemy;
    let randHP = Math.random()*200;
    let randRange = Math.random()*10;
    let randDMG = Math.random()*10;
    let randSpeedX = Math.random()*10;
    let randSpeedY = Math.random()*10;
    let randSkuddFart = Math.random()*10;

    // her lager/tegner vi og figuren vi skal bruke
    function startSpill(){
        if(gameInPlay){
            character.speedY = gravity;
            character.posX = startX;
            character.posY = startY;
        }
        divGamebox.innerHTML = "";
        counter = 0;

        // (name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse, skuddFart)
        enemy = new Enemy("enemy",100,randHP,randRange,randDMG,randSpeedY,randSpeedX,10,310,0,randSkuddFart);

        //sjekker hvilken instans av defender brukeren har valgt
        if(inpMelee.checked){
            character = melee;
            grenseBunn = 390 - character.size;
        } else if(inpRange.checked){
            character = range;
            grenseBunn = 390 - character.size;
        } else if(inpMage.checked){
            character = mage;
            grenseBunn = 390 - character.size;
        }

        box = document.createElement('div');
        box.className = character.name;
        box.style.left = character.posX + "px";
        grenseSide = 10;
        startX = character.posX;
        box.style.top = 390 - character.size + "px";
        startY = 390 - character.size;
        character.posY = startY;
        box.style.width = character.size/2 + "px";
        box.style.height = character.size + "px";
        divGamebox.appendChild(box);
        gravity = character.speedY;
        if(inpMelee.checked){
            meleeIdle();
        } else if(inpRange.checked){
            rangeIdle();
        } else if(inpMage.checked){
            mageIdle();
        }

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
        if(skutt){
            for(let s of skuddArray){
                s.move(character.skuddFart,0);
                s.render();
            }
        }
    }

    let bevegelse;
    let hopp = false;
    let antallHopp = 0;
    let skutt = false;
    let bevegelseVenstre = false;
    

    // Styrer hvordan figuren beveger seg ved
    // hjelp av piltastene
    function styrSpillet() {
        if (keys[39] === 1) { //piltast høyre
            bevegelse = 2; //går mot høyre
            bevegelseVenstre = false;
            box.style.transform = "scaleX(1)";
            if(inpMelee.checked){
                meleeWalking();
            } else if(inpRange.checked){
                rangeWalking();
            } else if(inpMage.checked){
                mageWalking();
            }
        } else if(keys[37] === 1){ //piltast venstre
            bevegelse = 1; //går mot venstre
            bevegelseVenstre = true;
            box.style.transform = "scaleX(-1)";
            if(inpMelee.checked){
                meleeWalking();
            } else if(inpRange.checked){
                rangeWalking();
            } else if(inpMage.checked){
                mageWalking();
            }
        } else if (keys[39] === 0 && keys[37] === 0) { // verken piltast høyre eller venstre
            bevegelse = 0; //står i ro
            if(inpMelee.checked){
                meleeIdle();
            } else if(inpRange.checked){
                rangeIdle();
            } else if(inpMage.checked){
                mageIdle();
            }
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
            if(inpMelee.checked){
                meleeAttacking();
            } else if(inpRange.checked){
                rangeAttacking();
            } else if(inpMage.checked){
                mageAttacking();
            }
            skutt = true;
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
    let skudd;
    let skuddArray = [];
    function shoot(){
        skudd = document.createElement("div");
        let yPos
            if(inpMelee.checked){
                yPos = character.posY + character.size/2;
            } else if(inpRange.checked){
                yPos = character.posY + character.size/2 - 30;
            } else if(inpMage.checked){
                yPos = character.posY + character.size/2 - 25;
            }
        let xPos;
        if(bevegelseVenstre){
            xPos = character.posX - 15;
        } else {
            xPos = character.posX + 30;
        }
        skudd = new Skudd(divGamebox,xPos,yPos,character.skuddFart,0,"skudd" + " " + character.name + "Skudd",bevegelseVenstre);
        skuddArray.push(skudd);
        for(let o of skuddArray){
            if(o.title !== "skutt"){
                if(bevegelseVenstre){
                    skuddAnimationFrames = [
                        { transform: "rotate(-180deg)" },
                        { transform: "rotate(-270deg)" }
                    ];
                } else {
                    skuddAnimationFrames = [
                        { transform: "rotate(0deg)" },
                        { transform: "rotate(90deg)" }
                    ];
                }
                o.animate(skuddAnimationFrames,skuddAnimationSettings);
                o.title = "skutt";
            }
            if(o.div.className === "hidden"){
                divGamebox.removeChild(divGamebox.childNodes[1]);
                skuddArray.shift();
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


    let doingTheWalk = false;
    let doingIdle = false;

    let meleeIdleFrames = [
        { backgroundPositionX: "0px", backgroundPositionY: "0px"},
        { backgroundPositionX: "-761px", backgroundPositionY: "0px" }
    ];
    let meleeIdleSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(8)"
    };
    function meleeIdle(){
        if (!doingIdle){
        animation = box.animate(meleeIdleFrames,meleeIdleSettings);
        doingTheWalk = false;
        doingIdle = true;
        }
    }
    let meleeWalkingFrames = [
        { backgroundPositionX: "0px", backgroundPositionY: "-111px"},
        { backgroundPositionX: "-795px", backgroundPositionY: "-111px" }
    ];
    let meleeWalkingSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(8)"
    };
    function meleeWalking(){
        if (!doingTheWalk) {
        animation = box.animate(meleeWalkingFrames,meleeWalkingSettings);
        doingTheWalk = true;
        doingIdle = false;
        }
    }
    let meleeAttackingFrames = [
        { backgroundPositionX: "0px", backgroundPositionY: "-236px"},
        { backgroundPositionX: "-761px", backgroundPositionY: "-236px" }
    ];
    let meleeAttackingSettings = {
        duration: 500,
        iterations: 1,
        easing: "steps(8)"
    };
    function meleeAttacking(){
        animation = box.animate(meleeAttackingFrames,meleeAttackingSettings);
        animation.onfinish = shoot;
    }
        
    let rangeIdleFrames = [
        { backgroundPositionX: "-15px", backgroundPositionY: "0px"},
        { backgroundPositionX: "-15px", backgroundPositionY: "0px" }
    ];
    let rangeIdleSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(7)"
    };
    function rangeIdle(){
        if (!doingIdle){
        animation = box.animate(rangeIdleFrames,rangeIdleSettings);
        doingTheWalk = false;
        doingIdle = true;
        }
    }
    let rangeWalkingFrames = [
        { backgroundPositionX: "-10px", backgroundPositionY: "-241px"},
        { backgroundPositionX: "-280px", backgroundPositionY: "-241px" }
    ];
    let rangeWalkingSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(6)"
    };

    function rangeWalking(){
        if (!doingTheWalk) {
            animation = box.animate(rangeWalkingFrames,rangeWalkingSettings);
            doingTheWalk = true;
            doingIdle = false;
        }
    }
    let rangeAttackingFrames = [
        { backgroundPositionX: "-20px", backgroundPositionY: "275px"},
        { backgroundPositionX: "-300px", backgroundPositionY: "275px" }
    ];
    let rangeAttackingSettings = {
        duration: 200,
        iterations: 1,
        easing: "steps(4)"
    };

    function rangeAttacking(){
        animation = box.animate(rangeAttackingFrames,rangeAttackingSettings);
        animation.onfinish = shoot;
    }

    let mageIdleFrames = [
        { backgroundPositionX: "-15px", backgroundPositionY: "0px"},
        { backgroundPositionX: "-15px", backgroundPositionY: "0px" }
    ];
    let mageIdleSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(7)"
    };
    function mageIdle(){
        if (!doingIdle){
        animation = box.animate(mageIdleFrames,mageIdleSettings);
        doingTheWalk = false;
        doingIdle = true;
        }
    }
    let mageWalkingFrames = [
        { backgroundPositionX: "-10px", backgroundPositionY: "-350px" },
        { backgroundPositionX: "-390px", backgroundPositionY: "-350px" }
    ];
    let mageWalkingSettings = {
        duration: 600,
        iterations: Infinity,
        easing: "steps(6)"
    };
    function mageWalking(){
        if (!doingTheWalk) {
            animation = box.animate(mageWalkingFrames,mageWalkingSettings);
            doingTheWalk = true;
            doingIdle = false;
        }
    }
    let mageAttackingFrames = [
        { backgroundPositionX: "-20px", backgroundPositionY: "223px" },
        { backgroundPositionX: "-310px", backgroundPositionY: "223px" }
    ];
    let mageAttackingSettings = {
        duration: 150,
        iterations: 1,
        easing: "steps(4)"
    };
    function mageAttacking(){
        animation = box.animate(mageAttackingFrames,mageAttackingSettings);
        animation.onfinish = shoot;
    }

    let skuddAnimationFrames = [
        { transform: "rotate(0deg)" },
        { transform: "rotate(90deg)" }
    ];

    let skuddAnimationSettings = {
        duration: 1500,
        iterations: 1,
    };

}

// lager her en klasse med egenskapene jeg vil at "defenderen" skal ha.

class Defender {
    constructor(name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse, skuddFart){
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
        this.skuddFart = skuddFart;
        this.dead = false;
    }

    // åpner muligheten for at defenderen kan dø,
    // selv om jeg ikke har tatt i bruk denne funksjonen enda
    die() {
        this.dead = true;
    }
}
class Enemy {
    constructor(name, size, health, range, damage, speedY, speedX, posX, posY, bevegelse, skuddFart){
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
        this.skuddFart = skuddFart;
        this.dead = false;
    }

    die() {
        this.dead = true;
    }
}
class Skudd{
    constructor(mainDiv,x,y,vx,vy,klasse,bevegelse){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        let div = document.createElement('div');
        mainDiv.appendChild(div);
        div.className = klasse;
        this.div = div;
        let bulletTime = 0;
        this.bulletTime = bulletTime;
        this.bevegelse = bevegelse;
    }
    render(){
        this.div.style.top = this.y + "px";
        this.div.style.left = this.x + "px";
    }

    move(dx,dy) {
        this.bulletTime += 0.2;
        if(this.bevegelse){
            this.x -= 3*dx;
        } else {
            this.x += 3*dx;
        }
        this.y += 0.5*9.81*this.bulletTime*this.bulletTime;
        if(this.x > 500){
            this.div.className = "hidden";
        }
    }
    animate(frames,settings){
        this.div.animate(frames,settings);
    }
}