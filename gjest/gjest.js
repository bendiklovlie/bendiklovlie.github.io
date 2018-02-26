// @ts-check

function setup(){
    let inpFornavn = document.getElementById("fornavn");
    let inpEtternavn = document.getElementById("etternavn");
    let inpAdresse = document.getElementById("adresse");
    let inpEmail = document.getElementById("epost");

    let btnRegistrer = document.getElementById("registrer");
    btnRegistrer.addEventListener("click", registrer);

    let btnVisListe = document.getElementById("visListe");
    btnVisListe.addEventListener("click", visListe);

    let divListe = document.getElementById("liste");


    let gjesteListe = [];

    function registrer(){
        let fornavn = inpFornavn.value;
        let etternavn = inpEtternavn.value;
        let adresse = inpAdresse.value;
        let email = inpEmail.value;

        let g = new Gjest(fornavn,etternavn,adresse,email);
        gjesteListe.push(g);
        listeOpen = false;
        liste = "";
        visListe();
    }

    let listeOpen = false;
    let liste = "";
    let antallKnapper = [];
    let z = 0;

    function visListe(){
        z = 0;
        if (!listeOpen) {
            listeOpen = true;
            divListe.style.visibility = "visible";
            for (let gjest of gjesteListe) {
                    liste += `Fornavn: ${gjest.fornavn} - Etternavn: ${gjest.etternavn}
                    - Adresse: ${gjest.adresse} - Email: ${gjest.epost}
                    - rabatt?: ${gjest.tilbud}
                    - <button type="button" value="${z}" class="selg">Rabatt</button> <br> <hr>`;
                    antallKnapper.push("1");
                    z++;
                }
            divListe.innerHTML = liste;
            lagEvent();
        } else if (listeOpen) {
            listeOpen = false;
            divListe.style.visibility = "hidden";
            liste = "";
        }
    }

    let btnRabatt;

    function lagEvent(){
        btnRabatt = document.getElementsByClassName('selg');
        for(let i = 0; i < antallKnapper.length; i++){
            btnRabatt[i].addEventListener("click", rabatt);
        }
        antallKnapper = [];
    }

    function rabatt(e){
        let x = e.target.value;
        if(!gjesteListe[x].tilbud){
        gjesteListe[x].rabatt();
        } else {
            return;
        }
        liste = "";
        listeOpen = false;
        visListe();
    }
}

class Gjest {

    constructor(fornavn,etternavn,adresse,epost){
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.adresse = adresse;
        this.epost = epost;
        this.tilbud = false;
    }

    rabatt(){
        this.tilbud = true;
    }

}