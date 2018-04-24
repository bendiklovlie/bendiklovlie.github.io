// @ts-check
function setup(){
    let divMain = document.getElementById("main");
    let divProdukt1 = document.getElementById("produkt1");
    let divProdukt2 = document.getElementById("produkt2");
    let divProdukt3 = document.getElementById("produkt3");
    let divProdukt4 = document.getElementById("produkt4");
    let divProdukt5 = document.getElementById("produkt5");

    let divMelding = document.getElementById("melding");
    let divFerdig = document.getElementById("ferdig");

    let pris1 = 500;
    let pris2 = 600;
    let pris3 = 700;
    let pris4 = 800;
    let pris5 = 900;

    let divTotalPris = document.getElementById("totalpris");

    let btnBestill = document.getElementById("bestill");
    btnBestill.addEventListener("click", bestillVarer);

    let formBestill = document.getElementById("form2");
    formBestill.addEventListener("change", oppdaterPris);

    let totalsum;
    let fullPris = 0;
    let valgtEkstraProdukt = false;
    function bestillVarer(){
        let selSvan = document.getElementById("select");
        if(valgtEkstraProdukt){
            fullPris = totalsum + (Number(selSvan.value)/2);
            divFerdig.innerHTML = "Takk for ditt kjøp! totalprisen kom på: " + fullPris;
            return;
        }
        let inpFname = document.getElementById("fname").value;
        let inpLname = document.getElementById("lname").value;
        let inpAdresse = document.getElementById("adresse").value;
        let inpTlfnummer = document.getElementById("tlfnummer").valueAsNumber;
        let inpEmail = document.getElementById("email").value;

        if(totalsum === 0 || inpFname == "" || inpAdresse == ""){
            divMain.innerHTML = "retard, du krasja heila greiå";
        }
        if(totalsum > 1000){
            divMelding.innerHTML = "Siden du har handlet for over 1000kr kan du velge et produkt for halv pris!";
            selSvan.style.display = "inline";
            valgtEkstraProdukt = true;
            return;
        } else {
            selSvan.style.display = "none";
            return;
        }
    }
    function oppdaterPris(){
        let inp1 = document.getElementById("inp1").valueAsNumber;
        let inp2 = document.getElementById("inp2").valueAsNumber;
        let inp3 = document.getElementById("inp3").valueAsNumber;
        let inp4 = document.getElementById("inp4").valueAsNumber;
        let inp5 = document.getElementById("inp5").valueAsNumber;

        let sum1;
        let sum2;
        let sum3;
        let sum4;
        let sum5;

        if(isNaN(inp1)||inp1<0){
            sum1 = 0;
        } else {
            sum1 = inp1 * pris1;
        }
        if(isNaN(inp2)||inp2<0){
            sum2 = 0;
        } else {
            sum2 = inp2 * pris2;
        }
        if(isNaN(inp3)||inp3<0){
            sum3 = 0;
        } else {
            sum3 = inp3 * pris3;
        }
        if(isNaN(inp4)||inp4<0){
            sum4 = 0;
        } else {
            sum4 = inp4 * pris4;
        }
        if(isNaN(inp5)||inp5<0){
            sum5 = 0;
        } else {
            sum5 = inp5 * pris5;
        }
        totalsum = sum1 + sum2 + sum3 + sum4 + sum5;
        divTotalPris.innerHTML = "Dette er totalprisen for alle produktene du har valgt: " + totalsum;
    }
    

}