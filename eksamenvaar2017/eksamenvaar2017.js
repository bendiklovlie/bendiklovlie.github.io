// @ts-check

function setup() {
    let divVindmolle = document.getElementById("vindmolleHode");
    let selVindstyrke = document.getElementById("vindstyrke");
    let inpVindstyrkeMS = document.getElementById("vindstyrkeMS");
    let spnWatt = document.getElementById("wattSpan");
    let btnBeregn = document.getElementById("beregn");

    btnBeregn.addEventListener("click", findWatt);




    let inpVindstyrkeMS1 = document.getElementById("vindstyrkeMS1");
    let inpVindstyrkeMS2 = document.getElementById("vindstyrkeMS2");
    let inpVindstyrkeMS3 = document.getElementById("vindstyrkeMS3");
    let inpVindstyrkeMS4 = document.getElementById("vindstyrkeMS4");
    let spnWatt2 = document.getElementById("wattSpan2");
    let btnBeregn2 = document.getElementById("beregn2");

    btnBeregn2.addEventListener("click", findWatt2);





    selVindstyrke.addEventListener("change", vindmolle);

    let animasjon;
    let vindmolleFrames = [
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" }
    ];
    let vindmolleSettings = {
        duration: 1000,
        iterations: Infinity
    };
    animasjon = divVindmolle.animate(vindmolleFrames, vindmolleSettings);
    function vindmolle() {
        let vindstyrke = Number(selVindstyrke.value);
        if (vindstyrke === 0) {
            animasjon.playbackRate = 0;
        } else if (vindstyrke === 1) {
            animasjon.playbackRate = 1;
        } else if (vindstyrke === 2) {
            animasjon.playbackRate = 2;
        }
    }
    vindmolle();

    function findWatt() {
        let vindstyrkeMS = inpVindstyrkeMS.valueAsNumber;
        if(isNaN(vindstyrkeMS) || vindstyrkeMS < 0){
            return;
        }

        let wattProduksjon = [0,2,10,60,150,400,500,0];
        let vindGrenser = [0,2.5,3.4,5.5,8,10.8,13.9,15];
    
        let idx = vindGrenser.findIndex(v => v > vindstyrkeMS) - 1;
        spnWatt.innerHTML = "" + wattProduksjon[idx] + "";
    }
    function findWatt2() {
        let vindstyrkeMS1 = inpVindstyrkeMS1.valueAsNumber;
        let vindstyrkeMS2 = inpVindstyrkeMS2.valueAsNumber;
        let vindstyrkeMS3 = inpVindstyrkeMS3.valueAsNumber;
        let vindstyrkeMS4 = inpVindstyrkeMS4.valueAsNumber;

        let wattProduksjon = [0,2,10,60,150,400,500,0];
        let vindGrenser = [0,2.5,3.4,5.5,8,10.8,13.9,15];
    
        let idx1 = vindGrenser.findIndex(v => v > vindstyrkeMS1) - 1;
        let idx2 = vindGrenser.findIndex(v => v > vindstyrkeMS2) - 1;
        let idx3 = vindGrenser.findIndex(v => v > vindstyrkeMS3) - 1;
        let idx4 = vindGrenser.findIndex(v => v > vindstyrkeMS4) - 1;

        let sum = wattProduksjon[idx1] * 6 + wattProduksjon[idx2] * 6 + wattProduksjon[idx3] * 6 + wattProduksjon[idx4] * 6;
        spnWatt2.innerHTML = "" + sum + "";
    }
}