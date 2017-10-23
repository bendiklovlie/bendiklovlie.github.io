function setup() {
    let inpFornavn = document.getElementById("fornavn");
    let inpEtternavn = document.getElementById("etternavn");
    let inpAlder = document.getElementById("alder");
    let inpEmail = document.getElementById("epost");
    let inpColor = document.getElementById("color");
    let inpDate = document.getElementById("date");

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", lagreData);

    function lagreData(event) {
        let fornavn = inpFornavn.value;
        let etternavn = inpEtternavn.value;
        let alder = inpAlder.valueAsNumber;
        let email = inpEmail.value;
        let color = inpColor.value;
        let dato = inpDate.value;

        

        //  Kommer vi inn på senere
        let person = { fornavn, etternavn, alder, email, color, dato };
        let spillerData = JSON.stringify(person);
        localStorage.setItem("spiller", spillerData);
        location = "floppy.html";
    }
}