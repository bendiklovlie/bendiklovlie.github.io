// flow

function setup() {
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

    function convertK(kilometer) {
        return kilometer / 1.852;
    }
    function convertN(nautisk) {
        return nautisk * 1.852;
    }
}


/* function lagreData(event) {
    let kilometer = inpKilometer.value;
    let nautisk = inpNautisk.valueAsNumber;

    if(kilometer > 0){
        divSvar.innerHTML = "Det er " + convertK(kilometer).toFixed(2) + " nautiske mil.";
    }
if (nautisk > 0) {
    /      divSvar.innerHTML = "Det er " + convertN(nautisk).toFixed(2) + " kilometer.";   }
    if (nautisk > 0 && kilometer > 0) {
        divSvar.innerHTML = "Du kan bare teste en om gangen";
    }
    if (nautisk != true && kilometer != true) {
        divSvar.innerHTML = "Skriv inn en verdi";
    }

}*/