// @ts-check

function setup() {

    let divText = document.getElementById("text");
    let divAlternativer = document.getElementById("alternativ");
    let divKontroll = document.getElementById("kontroll");

    let spraak = [];

    let amerikansk = [];
    //her er det enkelt å legge til flere språk
    //her bør vi egentlig lese sprsml fra filen, men
    //det rekker jeg ikke nå

    spraak.push(amerikansk);

    //legger til spørsmål til amerikansk
    amerikansk.push("Hva er potet på amerikansk?:potet,+potato,pato");
    amerikansk.push("Hva er ost på amerikansk?:chec,choose,+cheese");
    amerikansk.push("Hva er fisk på amerikansk?:fash,fosh,+fish");

    let total = 0;
    let riktigsvar = "";
    let index = 0;
    let valgtSpraak = spraak[0];
    //dette er en forenkla løsning da vi bare har amerikansk
    //senere bør dette endres slik at bruker kan vege språk

    function visNeste() {
        visSporsmaal(index);
    }

    function vurder(){
        let valgte = Array.from(document.querySelectorAll("input:checked"));
        let riktig = 0;
        let feil = 0;
        for (let valg of valgte){
            if(valg.value === riktigsvar){
                riktig++;
            } else {
                feil++;
            }
        }
        total += riktig - feil;
        if(valgtSpraak.length > index + 1){
            index++;
            visNeste();
        } else {
            visResultat();
        }
    }

    function visResultat(){
        let melding = "";
        if (total < 0){
            melding = "ikke noe håp";
        } else if (total >= 0 && total < 3){
            melding = "du kan reise for å ta språk kurs";
        } else if (total === 3){
            melding = "alt rett";
        }
        document.getElementById("main").innerHTML = melding;
    }

    function visSporsmaal(index){
        let sprmsl = valgtSpraak[index];
        //bruker nye funksjoner fra es7, destructuring assignment
        let [ledetekst, resten] = sprmsl.split(":");
        let alternativer = resten.split(",");
        divText.innerHTML = ledetekst;

        let liste = "";
        alternativer.forEach(valg => {
            if (valg.charAt(0) === "+"){
                valg = valg.substr(1);
                riktigsvar = valg;
            }
            liste += `<br> <input value="${valg}" type="checkbox">` + valg;
        });

        liste += '<div><button type="button">Vurder</button></div>';

        divAlternativer.innerHTML = liste;
        divAlternativer.querySelector("button").addEventListener("click", vurder);       
    }

    visNeste();
}