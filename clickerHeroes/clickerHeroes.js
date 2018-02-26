function setup(){

    let divClickBox = document.getElementById("clickBox");
    divClickBox.addEventListener("click", attackBox);

    let divMoneyBox = document.getElementById("moneyBox");

    let divMonstersLeft = document.getElementById("monstersLeft");

    let divHealthLeft = document.getElementById("healthLeft");

    let divZoneBox = document.getElementById("zoneBox");

    let divFirstHero = document.getElementById("firstHero");
    divFirstHero.addEventListener("click", upgradeFirst);


    let attackDamage = 10;
    let zone = 1;
    let baseMonsterAmount = 10;
    let monsterAmount = baseMonsterAmount;
    let money = 0;
    let baseMoneyGather = Math.floor(zone*1.25);
    let moneyGather = baseMoneyGather;
    let baseMonsterHealth = 10;
    let monsterHealth = baseMonsterHealth;
    let firstHeroCost = 1;
    let firstHeroAmount = 0;

    function attackBox(event){

        if(monsterHealth - attackDamage <= 0){
            respawnMonster();
        } else if(monsterHealth > 0){
            lowerHealth();
        }
        if(monsterAmount < 1){
            zoneUp();
        }
        showItems();
    }

    function lowerHealth(){
        monsterHealth = monsterHealth - attackDamage;
    }
    function respawnMonster(){
        monsterHealth = baseMonsterHealth;
        money += moneyGather;
        monsterAmount = monsterAmount-1;
    }
    function zoneUp(){
        zone += 1;
        monsterAmount += 10;
        baseMonsterHealth = Math.floor(baseMonsterHealth*1.5);
        moneyGather = Math.ceil(moneyGather*1.2);
    }
    function showItems(){
        divMonstersLeft.innerHTML = monsterAmount + "/" + baseMonsterAmount;
        divHealthLeft.innerHTML = monsterHealth;
        divMoneyBox.innerHTML = money;
        divZoneBox.innerHTML = "zone " + zone;
    }
    function upgradeFirst(){
        if(money >= firstHeroCost){
            firstHeroAmount += 1;
            money -= firstHeroCost;
            firstHeroCost = Math.ceil(firstHeroCost * 1.2);
            attackDamage += 1;
            divFirstHero.innerHTML = firstHeroAmount + "<br> cost: " + Math.floor(firstHeroCost);
            divMoneyBox.innerHTML = money;
        }
    }
    divFirstHero.innerHTML = firstHeroAmount + "<br> cost: " + Math.floor(firstHeroCost);
    divMonstersLeft.innerHTML = monsterAmount + "/" + baseMonsterAmount;
    divHealthLeft.innerHTML = monsterHealth;
    divMoneyBox.innerHTML = money;
    divZoneBox.innerHTML = "zone " + zone;
}