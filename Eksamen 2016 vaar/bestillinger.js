// @ts-check

function setup(){
    let hoteller = {};
    let prisliste = {
        newyork: {
            Sheraton: [2000, 2500],
            Raddison: [2200, 2300],
            BigBlue: [1200, 1500]
        }
    };
    

    let divPris = document.getElementById("pris");
    

    hoteller.newyork = "Sheraton,Raddison,BigBlue".split(",");
    //hoteller.roma = "Hilton,Sheraton,Eaton".split(",");

    let selBy = document.getElementById("byer");
    let divByInfo = document.getElementById("byinfo");

    selBy.addEventListener("change", valgtBy);

    document.addEventListener("change", sjekkPris);

    function sjekkPris(){
        let byValg = document.getElementById("byer").value;
        let enkeltrom = prisliste[byValg][hotellValg][0];
        let dobbeltrom = prisliste[byValg][hotellValg][1];
        let antallEnkel = document.getElementById("enkeltrom").valueAsNumber;
        let antallDobbel = document.getElementById("dobbeltrom").valueAsNumber;
        let kulturpris = 0;
        if (document.getElementById("kulturpass").checked){
            kulturpris = 700;
        } else {
            kulturpris = 0;
        }
        let total = kulturpris + antallEnkel*enkeltrom + antallDobbel*dobbeltrom;
        divPris.innerHTML = total + "kr";
        console.log(divByInfo);
    }
    let hotellValg;
    function valgtBy(e){
        let by = selBy.value;
        divByInfo.innerHTML = "";
        if (hoteller[by]) {
            let byHotell = hoteller[by];
            let selHotell = document.createElement("select");
            let s = "";
            for (let hotell of byHotell){
                s += `<option>${hotell}</option>`;
            }
            selHotell.innerHTML = s;
            hotellValg = selHotell.value;
            divByInfo.appendChild(selHotell);
        }
    }
}