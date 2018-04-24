// @ts-check
function setup(){
    let divVisning = document.getElementById("visning");

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", vis);

    function vis(){
        let inpNavn = document.getElementById("navn").value;
        let inpAlder = document.getElementById("alder").value;
        let kapittel = Math.random()*8;
        let oppgave = Math.random()*40;
        divVisning.innerHTML = "" + kapittel.toFixed(0) + "  ee  " + oppgave.toFixed(0) + "";
    }
}