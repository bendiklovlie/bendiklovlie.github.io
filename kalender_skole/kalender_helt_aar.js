// @ts-check

function setup(){
    let divRamme = document.getElementById("ramme");

    for(let i = 1; i < 13; i++){
        let div = document.createElement("div");
        div.className = "miniKalender";
        divRamme.appendChild(div);
        tegnKalender(div, 2018, i);
    }

    function tegnKalender(divMonth, year, month){
        let monthNames = "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(",");
        let maanedsNavn = monthNames[month - 1];
        let d = document.createElement("div");
        d.className = "maanad";
        d.innerHTML = maanedsNavn;
        divMonth.appendChild(d);
        let dagnavn = ["M","T","O","T","F","L","S"];
        d = document.createElement("div");
        d.className = "ukedager";
        for (let dn of dagnavn){
            let dd = document.createElement("div");
            dd.className = "dag";
            dd.innerHTML = dn;
            d.appendChild(dd);
        }
        divMonth.appendChild(d);
    }
}