// @ts-check

function setup(){
    let boxBorg = document.getElementById("borg");
    let boxRG = document.getElementById("rg");
    let boxAnnet = document.getElementById("annet");

    let divResultat = document.getElementById("resultat");


    let form = document.getElementById("form");
    form.addEventListener("change", visOppsummering);

    function visOppsummering(){
        divResultat.innerHTML = "";

        let inputBorgerlig = document.querySelectorAll(".borgerlig");
        let inputRodGronn = document.querySelectorAll(".rodgronn");
        let inputAnnet = document.querySelectorAll(".annet");

        let arrayBorgerlig = Array.from(inputBorgerlig);
        let arrayRodGronn = Array.from(inputRodGronn);
        let arrayAnnet = Array.from(inputAnnet);

        let borg = 0;
        let rg = 0;
        let annet = 0;
        for(let stemme of arrayBorgerlig){
            borg += Number(stemme.value);
        }
        for(let stemme of arrayRodGronn){
            rg += Number(stemme.value);
        }
        for(let stemme of arrayAnnet){
            annet += Number(stemme.value);
        }
        if((borg + rg + annet) > 99.9){
            divResultat.innerHTML = "retard... du har mærr enn hundre prosent";
        } else {
            divResultat.innerHTML = "borgerlig = " + borg + " rg = " + rg + " annet = " + annet;
        }

        boxBorg.style.width = borg*4 + "px";
        boxRG.style.width = rg*4 + "px";
        boxAnnet.style.width = annet*4 + "px";

        let storre; 
        if(borg < rg){
            storre = "rodgronn";
        } else {
            storre = "borgerlig";
        }
        let storst = document.getElementById("storst");
        storst.innerHTML = storre + " er størst";
    }
}