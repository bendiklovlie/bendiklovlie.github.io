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
    
    let divAnimasjon = document.getElementById("animasjon");
    let isbreFrames = [
        { left: "0px", height: "100px", border: "0px"},
        { left: "-300px", height: "40px", border: "20px" }
    ];
    let isbreSettings = {
        duration: 15000,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
    };
    let planteFrames = [
        { height: "0px", border: "0px"},
        { height: "40px", border: "20px" }
    ];
    let plante1Settings = {
        delay: 5200,
        duration: 10000,
        iterations: 1,
        easing: "linear",
        fill: "forwards"
    };
    let plante2Settings = {
        delay: 7500,
        duration: 10000,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
    };
    let plante3Settings = {
        delay: 10000,
        duration: 10000,
        iterations: 1,
        easing: "ease-out",
        fill: "forwards"
    };
    let animasjon = divAnimasjon.childNodes[1].animate(isbreFrames,isbreSettings);
    let plante1 = divAnimasjon.childNodes[3].animate(planteFrames,plante1Settings);
    let plante2 = divAnimasjon.childNodes[5].animate(planteFrames,plante2Settings);
    let plante3 = divAnimasjon.childNodes[7].animate(planteFrames,plante3Settings);



    let inpTreslag = document.getElementById("treslag");
    inpTreslag.addEventListener("change", visVerdier);
    let divSoyler = document.getElementById("soyler");
    let divOppsummering = document.getElementById("oppsummering");

    const treVolum = {
        furu: [12,16,20,24,28,20],
        lauv: [1,2,3,4,5,6],
        gran: [123,124,1,12141,12,12]
    };

    function visVerdier(e){
        let tre = inpTreslag.value;
        let soyler = tegnSoyler(treVolum[tre], klikkMeg);
        divSoyler.innerHTML = "";
        for(let s of soyler){
            divSoyler.appendChild(s);
        }
    }
    let ingenValgt = true;
    let klikkTeller = 0;
    function klikkMeg(e){
        e.target.classList.add("valgt");
        e.target.dataset.tall = klikkTeller;
        klikkTeller ++;
        let soyler = Array.from(document.querySelectorAll("#soyler > div"));
        let gamle = soyler.filter( e => +e.dataset.tall === klikkTeller-3);
        gamle.forEach(e => e.classList.remove("valgt"));
        let valgte = soyler.filter( e => e.classList.contains("valgt"));
        if(valgte.length === 2){
           let oppsum = lagOppsummering(valgte);
            divOppsummering.innerHTML = `Endringen er på
            ${oppsum.diff}, det tilsvarer ${oppsum.prosent.toFixed(2)}%`;
        }
    }


    Test.summary("#test");
}

function tegnSoyler(verdier, noenKlikkerMeg){
    const aarsTall = [1915,1940,1950,1980,1990,2000];
    let ret = [];
    for(let i = 0; i < verdier.length; i++){
        let v = verdier[i];
        let aar = aarsTall[i];
        let s = document.createElement("div");
        s.addEventListener("click", noenKlikkerMeg);
        s.className = "soyle";
        s.dataset.aar = aar;
        s.dataset.volum = v;
        s.innerHTML = aar + " " + v + "m<sup>3</sup>";
        s.style.width = (v * 3 + 80) + "px";
        ret.push(s);
    }
    return ret;
}
function lagOppsummering(valgte){
    let [a,b] = valgte;
    let diff = b.dataset.volum - a.dataset.volum;
    let prosent = (diff/a.dataset.volum) * 100;
    return {diff, prosent};
}


expect(tegnSoyler,[]).to.have("length").eq(0);
expect(tegnSoyler,[1,2]).to.have("length").eq(2);
expect(tegnSoyler,[1,2]).to.have("0.className").eq("soyle");
expect(tegnSoyler,[1,2]).to.have("0.style.width").eq("83px");
expect(tegnSoyler,[1,2]).to.have("1.style.width").eq("86px");

expect(lagOppsummering,[
    {dataset:{volum:12}},
    {dataset:{volum:24}}
]).to.have("diff").eq(12);
expect(lagOppsummering,[
    {dataset:{volum:12}},
    {dataset:{volum:24}}
]).to.have("prosent").eq(100);
expect(lagOppsummering,[
    {dataset:{volum:8}},
    {dataset:{volum:10}}
]).to.have("prosent").eq(25);