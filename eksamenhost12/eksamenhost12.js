//@ts-check
function setup() {
  let divMain = document.getElementById("main");
  let divVektStativ = document.getElementById("vektStativ");
  let divVektStang = document.getElementById("vektStav");
  let divSkinke = document.getElementById("skinke");
  let divBotte = document.getElementById("botte");
  let divRespons = document.getElementById("respons");

  let inpTipping = document.getElementById("tipping");

  let audio1 = new Audio('lydfil1eksamenhost12.mp3');
  let audio2 = new Audio('lydfil2eksamenhost12.mp3');

  let spnFeilMelding = document.getElementById("feilMelding");

  let btnRegistrer = document.getElementById("registrer");
  btnRegistrer.addEventListener("click", sjekkTipping);

  const SKINKE = 8;
  let rotation = 0;
  let endringHoyde = 0;
  let feil = 0;
  let antallFeil = 0;

  function sjekkTipping() {
    let svar = Number(inpTipping.value);
    feil = (svar - SKINKE);
    if(feil !== 0){
      audio2.play();
      antallFeil ++;
      spnFeilMelding.innerHTML = `Du har gjettet feil ${antallFeil} ganger`;
    } else {
      audio1.play();
      spnFeilMelding.innerHTML = `Du trengte ${antallFeil} forsøk på å gjette rett`;
      antallFeil = 0;
    }
    rotation = feil*5;
    divRespons.innerHTML = `Du gjettet ${svar}kg og det var ${Math.abs(feil)}kg i fra`;
    animation();
  }

  function animation() {
    if(rotation < -35){
      rotation = -35;
    }else if(rotation > 35){
      rotation = 35;
    }
    endringHoyde = ((200*3.14)/360)*rotation;
    divVektStang.style.transform = `rotate(${rotation}deg)`;
    divSkinke.style.top = `${115-endringHoyde}px`;
    divBotte.style.top = `${115+endringHoyde}px`;
  }





  Test.summary("#test");
}

let powerprod = vindstyrker => {
  let produksjon = vindstyrker.map(e => vind2watt(e) * 6);
  return produksjon.reduce((s, p) => s + p, 0); // summer produksjonen
};

let vind2watt = fart => {
  let grenser = [0, 2.5, 3.4, 5.5, 8, 10.8, 13.9, 15, 100];
  let powerList = [0, 2, 10, 60, 150, 400, 500, 0, 0];
  let idx = grenser.findIndex(e => e > +fart) - 1;
  return powerList[idx] || 0;
};

/** Tester - sjekker at vind2watt virker */


expect(vind2watt, 2).to.be(0);
expect(vind2watt, 3).to.be(2);
expect(vind2watt, 4).to.be(10);
expect(vind2watt, 5.5).to.be(60);
expect(vind2watt, 7.99).to.be(60);
expect(vind2watt, 8).to.be(150);
expect(powerprod, [0, 0, 0, 0]).to.be(0);
expect(powerprod, [3, 3, 3, 3]).to.be(2 * 4 * 6);
expect(powerprod, [3, 4, 6, 8]).to.be(2 * 6 + 10 * 6 + 60 * 6 + 150 * 6);