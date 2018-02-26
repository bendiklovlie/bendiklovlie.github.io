// @ts-check

function setup(){
    let divMain = document.querySelector("#main");
    let inpForbruk = document.getElementById("forbruk");
    let inpTank = document.getElementById("tank");
    let spnRekkevidde = document.getElementById("rekkevidde");
    let btnBeregn = document.getElementById("button");
    btnBeregn.addEventListener("click", beregn);

    function beregn(){
        let forbruk = Number(inpForbruk.value);
        let tank = inpTank.valueAsNumber;
        let rekkevidde = tank/forbruk;
        spnRekkevidde.innerHTML = rekkevidde.toFixed(2);

    }


}