// @ts-check
function setup(){
    let divForsteKombo = document.getElementById("forsteKombo");
    let divAndreKombo = document.getElementById("andreKombo");

    let land = ["norge","danmark","sverige"];

    let kombo = "<select id='kombo1'>";
    let index = 0;
    for(let l of land){
        kombo += `<option value="${index}">${l}</option>`;
        index++;
    }
    kombo += "</select>";
    divForsteKombo.innerHTML = kombo;

    document.getElementById("kombo1").addEventListener("change", oppdaterKombo2);
    // Norge = 0, Danmark = 1, Sverige = 2
    let byer = [
        ["stavanger","bergen","oslo","haugesund"],
        ["aarhus","copenhagen","odense"],
        ["stokkholm","gauteborg","kalmar"]
    ];

    function oppdaterKombo2(){
        let verdi = Number(document.getElementById("kombo1").value);
        let retteByer = byer[verdi];
        let kombo2 = "<select id='kombo2'>";
        let index2 = 0;
        for(let b of retteByer){
            kombo2 += `<option value="${index2}">${b}</option>`;
            index2++;
        }
        kombo2 += "</select>";
        divAndreKombo.innerHTML = kombo2;
    }
}