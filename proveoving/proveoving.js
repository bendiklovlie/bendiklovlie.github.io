function setup() {

    let divSvar = document.getElementById("svar");

    let inputText = document.getElementById("input");

    let btnKnapp = document.getElementById("knapp");
    btnKnapp.addEventListener("click", endreTekst);

    let original = "";
    let fulltnavn = "";
    function endreTekst(event) {
        let ferdigArray = [];
        original = inputText.value;
        originalLowerCase = original.toLowerCase();
        navnArray = originalLowerCase.split(" ");
        for (i = 0; i < navnArray.length; i++) {
            navn = navnArray[i];
            forbokstav = navn.substring(0,1);
            storForbokstav = forbokstav.toUpperCase();
            restenAvNavn = navn.substr(1);
            ferdig = storForbokstav + restenAvNavn;
            ferdigArray.push(ferdig);
        }
        let fulltNavn = ""+ferdigArray+"";
        let fulltNavnFerdig = fulltNavn.replace(/,/g," ");
        divSvar.innerHTML = fulltNavnFerdig;

    }

    
function niceName(a){
    let nameArray = a.split(" ");
    let ferdigArray = [];
    let navn;
    for(let i = 0; i<nameArray.length; i++){
        let firstLetter = nameArray[i].charAt(0).toUpperCase();
        let nameBody = nameArray[i].substr(1).toLowerCase();
        if(i === 0 || i === (nameArray.length-1)){
            ferdigArray.push(firstLetter+nameBody)
        } else {
        ferdigArray.push(firstLetter+".")
        }
        navn = ferdigArray.join(" ");
    
    }
    return navn;
    }


}