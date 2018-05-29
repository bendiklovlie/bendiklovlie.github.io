// @ts-check
function setup(){
    let fellesfag = Array.from(document.querySelectorAll("div.felles input"));
    let programfag = Array.from(document.querySelectorAll("div.programfag input"));


    const fagnavn = `Engelsk,Geografi,Historie,Kroppsøving,Naturfag
    ,Matematikk,NorskHovedmål,NorskSidemål,NorskMuntlig
    ,ReligionEtikk,Samfunnsfag`.split(",");

    let divOppsummering = document.getElementById("oppsummering");

    let vitnemaal = {};
    let karakterliste = [];

    let frmRegistrer = document.getElementById("registrer");
    frmRegistrer.addEventListener("change", visOppsummering);

    function visOppsummering(e){
        let innhold = "";
        for(let i = 0; i<fellesfag.length; i++){
            let inputFag = fellesfag[i];
            let karakter = Number(inputFag.value) || 0;
            let fnavn = fagnavn[i];
            vitnemaal[fnavn] = karakter;
            innhold +=`${fnavn}:${karakter} <br>`;
            karakterliste.push({fnavn,karakter});
        }
        for(let i = 0; i<programfag.length; i+=2){
            let fag = programfag[i].value;
            let karakter = Number(programfag[i+1].value) || 0;
            vitnemaal[fag] = karakter;
            innhold += `${fag}:${karakter} <br>`;
        }
        divOppsummering.innerHTML = innhold;
    }
}