//@ts-check
function setup() {

    let divMain = document.getElementById("main");
    let divSporsmaal = document.getElementById("sporsmaal");
    let divSvarAlternativer = document.getElementById("svarAlternativer");
    let divTilbakeMelding = document.getElementById("tilbakeMelding");
    let divOversikt = document.getElementById("oversikt");
    let divAnimasjon = document.getElementById("animasjon");

    let divTest = document.getElementById("test");

    let btnStart = document.getElementById("start");
    btnStart.addEventListener("click", startTest);

    //ved å legge filen inn i variabele lydfil kan jeg senere
    //spille av filen når jeg vil med å skrive lydfil.play()
    let lydfil = new Audio("lydfilHeldag.mp3");

    let sporsmal = [];
    // her er det enkelt å legge til flere spørsmål senere
    // oppskrift på spørsmål:(`spørsmål br <img src="" class""> : alternativ1,alternativ2`)
    
    //har gjort barre lagt til rett på midterste alternativ på alle
    //for å gjøre det enklere når jeg tester, vet ikke hva som faktisk
    //skulle vært rett
    sporsmal.push(`Hva er rett her? <br> 
    <img src='images/image1.png' class='bilde'>
    :Den passerende bilisten setter andre trafikanter i unøding fare og det er lang kø
    ,+Har du kommet litt forbi den bilen du passerer er det bare å svinge inn foran
    ,Den passerte bilen burde ha holdt mindre avstand til bilen foran og det er ikke så glatt`);
    sporsmal.push(`Hva er rett her? <br> 
    <img src='images/image2.png' class='bilde'>
    :Hvis det er plass mellom to biler er det bare å kjøre på
    ,+Når man skal kjøre forbi viser man det ved å kjøre nært bilen foran
    ,Krysse sperrelinjer er brudd på trafikkreglene`);
    sporsmal.push(`Hva er rett her? <br> 
    <img src='images/image3.png' class='bilde'>
    :Når veimerking som sperrelinje og skilter gir motsatte signaler gjelder  det strengeste signalet
    ,+Du kan selv velge hva som gjelder for deg
    ,Sperrelinjer er kun ment for lastebiler`);
    sporsmal.push(`Hva er rett her? <br> 
    <img src='images/image4.png' class='bilde'>
    :Tut kraftig med bilhornet slik at syklistene danner en rekke
    ,+Vent med å kjøre forbi til det blir fri sikt fremover
    ,Gass på slik at du rekker å passere før svingen`);

    //bruker array sin sorteringsfunksjon for å få spørsmålene
    //i tilfeldig rekkefølge hver gang noen gjør testen
    sporsmal.sort(function(a, b){return 0.5 - Math.random();});

    let riktigsvar = "";
    let index = 0;
    let antallPoeng = 0;

    //viser neste spørsmål i arrayen
    function visNeste() {
        visSporsmaal(index);
    }

    let riktig = 0;
    let feil = 0;
    //lager en oversiktsliste
    let oversiktsListe = "";
    function vurder() {
        let valgte = Array.from(document.querySelectorAll("input:checked"));
        if (valgte.length === 0) {
            feil ++;
            antallPoeng -= 1;
            oversiktsListe += `På spørsmål ${index +1} svarte du ikke <br>`;
        }
        for (let valg of valgte) {
            if (valg.value === riktigsvar) {
                riktig ++;
                antallPoeng += 2;
                oversiktsListe += `På spørsmål ${index +1} svarte du rett <br>`;
            } else {
                feil ++;
                antallPoeng -= 1;
                oversiktsListe += `På spørsmål ${index +1} svarte du feil,
                riktig svar var: ${riktigsvar} <br>`;
            }
        }
        if (sporsmal.length > index + 1) {
            index++;
            visNeste();
            divTilbakeMelding.innerHTML = ""+antallPoeng+"";
        } else {
            visResultat();
            oversiktsListe += `Det ble totalt ${riktig} rette og ${feil} feil`;
            divOversikt.innerHTML = oversiktsListe;
        }

    }

    function visResultat() {
        let melding = "";
        if (antallPoeng < 3) {
            melding = "Du får nok aldri sertifikatet";
        }
        if (antallPoeng === 8) {
            melding = "alt rett";
        }
        if (antallPoeng >= 4 && antallPoeng < 8) {
            melding = "Med litt mer øving kan du fortsatt ikke få sertifikatet";
        }
        divTilbakeMelding.innerHTML = melding;
    }

    //Får fram spørsmålet med bilde og alternativer som ligger på plassen
    //index i arrayen sporsmal
    function visSporsmaal(index) {
        let sprmsl = sporsmal[index];
        // Dette er en ny funksjon fra es7 som heter destructuring assignment
        let [sporsmaalet, svarAlt] = sprmsl.split(":");
        let svarAlternativer = svarAlt.split(",");
        //neste linje gjør at spørsmålet blir vist
        divSporsmaal.innerHTML = sporsmaalet;

        //lager en liste her for å registrere alle alternativene som senere
        //i funksjonen blir vist i divSvarAlternativer
        let liste = '';
        for (let valg of svarAlternativer) {
            if (valg.charAt(0) === "+") {
                //sjekker hvilket alternativ som inneholder +
                //og setter dette alternativet som det riktige valget
                valg = valg.substr(1);
                riktigsvar = valg;
            }
            liste += `<br><input value="${valg}" type="checkbox">` + valg;
        }
        liste += '<div><button id="vurder" type="button">Vurder</button></div>';

        //neste linje gjør at alternativene blir vist i lag med en knapp
        //som gjør at du kan kjøre funksjonen vurder(), som igjen
        //tar deg videre til neste spørsmål
        divSvarAlternativer.innerHTML = liste;
        document.getElementById("vurder").addEventListener("click", vurder);
    }
    
    visNeste();

    let animation;
    function startTest(){
        btnStart.style.left = -1000 + "px";
        animationRun();
        lydfil.play();
    }
    //velger å bruke alle bildene som var i vedlegget

    //velger å bare bruke contain på bildene jeg kjører i bakgrunnen,
    //det ser litt dumt ut når bildene blir delt/vist flere ganger,
    //men tenker at det tar for lang tid å finne noe som passer perfekt
    //med en animasjon med målene 800*600

    //siden det var meningen å vekke oppmerksomheten med lydfilen, 
    //tenker jeg at en rotasjon og flytting fram og tilbake på 
    //skjermen også passer for animasjonen til kjøreskolen
    let animationFrames = [
        { backgroundImage: "url('images/image1.png')", backgroundSize: "contain",
        transform: "rotate(0deg)", left: "0px"},
        { backgroundImage: "url('images/image2.png')"},
        { backgroundImage: "url('images/image3.png')"},
        { backgroundImage: "url('images/image4.png')"},
        { backgroundImage: "url('images/image5.png')", left: "500px"},
        { backgroundImage: "url('images/image6.png')"},
        { backgroundImage: "url('images/image7.png')"},
        { backgroundImage: "url('images/image8.png')", backgroundSize: "contain",
        transform: "rotate(360deg)", left: "0px"},
    ];
    let animationSettings = {
        duration: 15000,
        iterations: 1,
        easing: "linear"
    };

    //skjuler testen fram til animasjonen er ferdig, 
    //deretter skjuler jeg div-en som viste animasjonen
    function visMain(){
        divMain.classList.remove("hidden");
        divAnimasjon.classList.add("hidden");
    }
    function animationRun(){      
        animation = divAnimasjon.animate(animationFrames,animationSettings);
        animation.onfinish = visMain;
    }
    


    Test.summary("#test");
}

//funksjonene i koden min bruker ikke tilsendte verdier (funksjon(tilsendt, verdi))
//Så jeg må endre litt på funksjonen slik at jeg kan teste funksjonen
//med tilsendt verdi
//Funksjonen er bygget opp likt med tanke på poengdelingen som er det
//jeg tester


//funksjonen er kortet ned for å bare vise hvor mye poeng du får
function vurderPoeng(alternativ) {
    let valgt = alternativ;
    let antallPoeng = 0;
    let riktigsvar = "testRettSvar";
    if (valgt.length === 0) {
        antallPoeng -= 1;
        return antallPoeng;
    }
    for (let valg of valgt) {
        if (valg === riktigsvar) {
            antallPoeng += 2;
            return antallPoeng;
        } else {
            antallPoeng -= 1;
            return antallPoeng;
        }
    }
}

//her er funksjonen kortet ned for å bare vise om det blir registrert
//en endring i antall feil/galt
function vurderRettGalt(alternativ) {
    let valgt = alternativ;
    let riktig = 0;
    let feil = 0;
    let riktigsvar = "testRettSvar";
    if (valgt.length === 0) {
        feil ++;
        return feil;
    }
    for (let valg of valgt) {
        if (valg === riktigsvar) {
            riktig ++;
            return riktig;
        } else {
            feil ++;
            return feil;
        }
    }
}

expect("Tester om poengene brukeren får stemmer").to.be();
let testArray = [];
expect(vurderPoeng, testArray).to.be(-1);
testArray = ["testRettSvar"];
expect(vurderPoeng, testArray).to.be(2);
testArray = ["feilSvar"];
expect(vurderPoeng, testArray).to.be(-1);

expect("Tester om det stemmer med rett/gale svar").to.be();
testArray = [];
expect("Tester først om galt svar blir registrert").to.be();
expect(vurderRettGalt, testArray).to.be(1);
testArray = ["feilSvar"];
expect(vurderRettGalt, testArray).to.be(1);
expect("Tester så om rett svar blir registrert").to.be();
testArray = ["testRettSvar"];
expect(vurderRettGalt, testArray).to.be(1);