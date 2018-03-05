// @ts-check
function setup(){
    let divVisning = document.getElementById("visning");

    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", vis);

    function vis(){
        let inpNavn = document.getElementById("navn").value;
        let inpAlder = document.getElementById("alder").value;
        divVisning.innerHTML = "" + inpAlder + inpNavn + "";
    }
}