// @ts-check

class Deltaker {
    constructor(navn, adresse, epost, tlf, kurs){
        this.navn = navn;
        this.adresse = adresse;
        this.epost = epost;
        this.tlf = tlf;
        this.kurs = kurs;
    }
}

// dette er en global varable som simulerer lagring
// irl ville dette vært en database ...
let deltakerListe = [];

// jeg bruker indre funksjoner i setup
// slik at disse har tilgang til variablene definert
// i toppen (inpNavn ...)
// reduserer også bruken av globale variable (som er en god ting)
function setup(){
    Test.summary();
    let inpNavn = document.getElementById("navn");
    let inpAdresse = document.getElementById("adresse");
    let inpEpost = document.getElementById("epost");
    let inpTlf = document.getElementById("tlf");

    let selKurs = document.getElementById("kursValg");

    let divDeltakerliste = document.getElementById("deltakerliste");

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", sendTilLagring);

    let navn,adresse,epost,tlf,kurs;

    function sendTilLagring(e){
        lagreDeltaker(navn,adresse,epost,tlf,kurs);
        divDeltakerliste.innerHTML = "antall: " + tellOpp(deltakerListe);
        visDeltakerListe(divDeltakerliste);
    }

    let alleInputs = Array.from(document.querySelectorAll("#registrer input"));

    let frmRegistrer = document.getElementById("registrer");
    frmRegistrer.addEventListener("change", sjekkGyldig);

    function sjekkGyldig(e){
        //fjerner feilmelding fra alle inputs
        //alleInputs.forEach(inp => inp.classList.remove("feil"));
        alleInputs.forEach(inp => inp.className="riktig");
        navn = inpNavn.value;
        adresse = inpAdresse.value;
        epost = inpEpost.value;
        tlf = inpTlf.value;
        kurs = selKurs.value;
        if (navn !== "" && adresse !== "" && epost !== "" && tlf !== ""){
            btnLagre.disabled = false;
        } else {
            //  alleInputs.forEach(inp => {if(inp.value === ""){inp.classList.add("feil");}});
            // løkka under gjør det samme uten bruk av array-funksjoner
            /*
            for(let inp of alleInputs){
                if(inp.value === ""){
                    inp.classList.add("feil");
                }
            }
            */
            if (navn === ""){inpNavn.className="feil";}
            if (adresse === ""){inpAdresse.className="feil";}
            if (epost === ""){inpEpost.className="feil";}
            if (tlf === ""){inpTlf.className="feil";}
            btnLagre.disabled = true;
        }
    }
}

// funksjonen under er mest mulig uavhengige av andre
// deler av prosjektet - slik at testing blir enklere

/**
 * 
 * @param {string} navn Navn på deltaker
 * @param {string} adresse Adresse til deltaker
 * @param {string} epost Epost til deltaker
 * @param {string} tlf Telefon til deltaker
 */
function lagreDeltaker(navn,adresse,epost,tlf,kurs){
    let deltaker = new Deltaker(navn,adresse,epost,tlf,kurs);
    deltakerListe.push(deltaker);
}

// i visual studio code sjekker editoren typene på parametre
// dersom jeg har en jsdoc kommentar som vist under.
// jeg får da feilmelding dersom jeg sender noe som ikke er
// et html-element til denne funksjonen
/**
 * 
 * @param {HTMLElement} div ref til div hvor listen skal vises
 */
function visDeltakerListe(div){
    let liste = document.createElement("div");
    deltakerListe.forEach(e => {
        let divDeltaker = document.createElement("div");
        divDeltaker.innerHTML = `
        <div> Navn: ${e.navn} </div>
        <div> Adresse: ${e.adresse} </div>
        <div> Epost: ${e.epost} </div>
        <div> Tlf: ${e.tlf} </div>
        <div> Kurs: ${e.kurs} </div>
        `;
        liste.appendChild(divDeltaker);
    });
    div.appendChild(liste);
}

/**
 * Skal telle antall i listen
 * @param {Array} deltakerListe 
 */
function tellOpp(deltakerListe){
    let telefonListe = deltakerListe.map( e => e.tlf);
    let unike = new Set(telefonListe);
    return unike.size;
}


/*
Automatiserte tester av noen funksjoner.
I tilleg til disse testene må jeg ha brukertester,
feiltester (hva skjer dersom input er feil) osv
*/

// tellOpp med tom array
expect(tellOpp,[]).to.be(0);

// tellOpp med duplikate tlf. nr
expect(tellOpp,[{tlf:12},{tlf:12}]).to.be(1);

// tellOpp med 2 forskjellige tlf. nr
expect(tellOpp,[{tlf:12},{tlf:13}]).to.be(2);