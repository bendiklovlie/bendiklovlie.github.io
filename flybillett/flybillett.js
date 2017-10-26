// @flow
function setup() {

    let fra = document.getElementById("fra");
    let til = document.getElementById("til");
    let divSvar = document.getElementById("svar");
    let plasser = document.getElementById("plasser");
    

    let priser = [
   /*Oslo*/     [0,299,499,799,699,999],
   /*Trondheim*/[299,0,349,649,549,949],
   /*Haugesund*/[499,349,0,729,629,929],
   /*København*/[799,649,729,0,679,979],
   /*Stockholm*/[699,549,629,679,0,659],
   /*Berlin*/   [999,949,929,979,659,0]
    ];


    let priserObjekt = {
        Oslo : {Trondheim : 299, Haugesund : 499, København : 799, Stockholm : 699, Berlin : 999},
        Trondheim : {Haugesund : 349, København : 649, Stockholm : 549, Berlin : 949},
        Haugesund : {København : 729, Stockholm : 629, Berlin : 929},
        København : {Stockholm : 679, Berlin : 979},
        Stockholm : {Berlin : 659}
    };

    let divSvarTest = document.getElementById("svarTest");

    let btnTestKnapp = document.getElementById("testKnapp");
    btnTestKnapp.addEventListener("click", testKnappFunction);
   
    function testKnappFunction() {
        let start = fra.value;
        let slutt = til.value;
        let meldingTest = priserObjekt[start][slutt];
        let antallPlasser = plasser.valueAsNumber;
        let omLeiebil = 2000;
        let leiebil = document.getElementById("leiebil").checked;
        let manglerPlasser = "Velg antall plasser";

        if (meldingTest === undefined){
             meldingTest = priserObjekt[slutt][start];
        }

        if(leiebil === true){
            meldingTest = (priserObjekt[start][slutt])*antallPlasser+omLeiebil;
        }   else {
            meldingTest = (priserObjekt[start][slutt])*antallPlasser;
        }

        if(isNaN(antallPlasser) || antallPlasser <= 0 ){
            divSvarTest.innerHTML = manglerPlasser;
        } else {
            divSvarTest.innerHTML = meldingTest;
        }

    }

    let btnTest = document.getElementById("test");
    btnTest.addEventListener("click", testFunction);


    function testFunction(event) {
        let xFra = 0;
        let xTil = 0;
        let melding = 0;
        let antallPlasser = plasser.valueAsNumber;
        let omLeiebil = 2000;
        let leiebil = document.getElementById("leiebil").checked;
        

        if(fra.value === "Oslo"){
            xFra = 0;
        }   else if (fra.value === "Trondheim"){
            xFra = 1;
        }   else if (fra.value === "Haugesund"){
            xFra = 2;
        }   else if (fra.value === "København"){
            xFra = 3;
        }   else if (fra.value === "Stockholm"){
            xFra = 4;
        }   else if (fra.value === "Berlin"){
            xFra = 5;
        }

        if(til.value === "oslo"){
            xTil = 0;
        }   else if (til.value === "Trondheim"){
            xTil = 1;
        }   else if (til.value === "Haugesund"){
            xTil = 2;
        }   else if (til.value === "København"){
            xTil = 3;
        }   else if (til.value === "Stockholm"){
            xTil = 4;
        }   else if (til.value === "Berlin"){
            xTil = 5;
        }

        if(leiebil === true){
            pris = (priser[xFra][xTil])*antallPlasser+omLeiebil;
        }   else {
            pris = (priser[xFra][xTil])*antallPlasser;
        }
        
        melding = "Denne turen koster "+pris+" kroner";
        feilmelding = "Velg antall plasser";

        if(isNaN(antallPlasser) || antallPlasser <= 0 ){
            divSvar.innerHTML = feilmelding;
        } else {
            divSvar.innerHTML = melding;
        }
    }





}