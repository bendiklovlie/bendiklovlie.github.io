// @flow
function setup() {

    let fra = document.getElementById("fra");
    let til = document.getElementById("til");
    let divSvar = document.getElementById("svar");
    let avstand = [
        [0, 463, 493],
        [463, 0, 639],
        [493, 629, 0]
    ];
    

    let btnTest = document.getElementById("test");
    btnTest.addEventListener("click", testAvstand);



    
    function testAvstand(event) {
        let value1 = 0;
        let value2 = 0;
        let tid = 0;
        let svarAvstand = 0;
        if (fra.value === "Oslo") {
            value1 = 0;
        }
        if (fra.value === "Bergen") {
            value1 = 1;
        }
        if (fra.value === "Trondheim") {
            value1 = 2;
        }

        if (til.value === "Oslo") {
            value2 = 0;
        }
        if (til.value === "Bergen") {
            value2 = 1;
        }
        if (til.value === "Trondheim") {
            value2 = 2;
        }

        tid = ((avstand[value1][value2])/60);
        svarAvstand = avstand[value1][value2];
       
        melding = "Denne turen vil ta "+ tid.toFixed(2) + " timer og er " + svarAvstand + " kilometer";
        divSvar.innerHTML = melding;
    }












}