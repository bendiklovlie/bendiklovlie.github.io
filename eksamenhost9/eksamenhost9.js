//@ts-check
function setup(){
  let spnKM = document.getElementById("spnKM");
  let spnTid = document.getElementById("spnTid");

  let selHavner = document.getElementById("selHavner");
  selHavner.addEventListener("change", gjetteFunksjon);

  let divSvar = document.getElementById("svar");
  let divSvarSoyle = document.getElementById("svarSoyle");

  let btnBeregnKM = document.getElementById("beregnKM");
  let btnBeregnTid = document.getElementById("beregnTid");
  let btnSjekkSvar = document.getElementById("sjekkSvar");

  btnBeregnKM.addEventListener("click", beregnKM);
  btnBeregnTid.addEventListener("click", beregnTid);
  btnSjekkSvar.addEventListener("click", sjekkSvar);

  let antallKilometer;
  let inpNautisk;
  function beregnKM(){
    inpNautisk = document.getElementById("nautiske").valueAsNumber;
    antallKilometer = (inpNautisk*1.852).toFixed(2);
    spnKM.innerHTML = ""+Number(antallKilometer)+"";
  }
  let antallTimer;
  function beregnTid(){
    inpNautisk = document.getElementById("nautiske").valueAsNumber;
    if(inpNautisk <= 0 || isNaN(inpNautisk)){
      return "mangler verdi";
    }
    let inpFartKnop = document.getElementById("fartIKnop").valueAsNumber;
    if(inpFartKnop <= 0 || isNaN(inpFartKnop)){
      return "mangler verdi";
    }
    antallTimer = (inpNautisk/inpFartKnop).toFixed(2);
    spnTid.innerHTML = ""+Number(antallTimer)+"";
  }

  let avstander = [14,23,32,46,85,109];
  let havner = ["Kragerø","Sandefjor","Lyngør","Stromstad","Kristiansand","Goteborg"];

  let currentValue;
  let antallFeil = 0;
  function gjetteFunksjon(){
    currentValue = document.getElementById("selHavner").value;
    antallFeil = 0;
  }

  let feilMarginOpp = 1.1;
  let feilMarginNed = 0.9;

  function sjekkSvar(){
    let inpGjettetVerdi = document.getElementById("gjettetVerdi").valueAsNumber;
    let feilOpp = currentValue*feilMarginOpp;
    let feilNed = currentValue*feilMarginNed;
    if(inpGjettetVerdi > feilNed && inpGjettetVerdi < feilOpp){
      divSvar.innerHTML = "Gratulerer, du gjettet rett med " + (antallFeil+1) + " forsøk";
      divSvarSoyle.style.width = 1 + "px";
      antallFeil = 0;
    } else {
      divSvar.innerHTML = "Beklager, men det ble feil";
      antallFeil ++;
      divSvarSoyle.style.width = antallFeil*10 + "px";
    }
  }


    Test.summary("#test");
}

function beregnKM(nautisk){
  let inpNautisk = nautisk;
  let antallKilometer = (inpNautisk*1.852).toFixed(3);
  return Number(antallKilometer);
}
function beregnTid(nautisk,fart){
  let inpNautisk = nautisk;
  if(inpNautisk <= 0 || isNaN(inpNautisk)){
    return "mangler verdi";
  }
  let inpFartKnop = fart;
  if(inpFartKnop <= 0 || isNaN(inpFartKnop)){
    return "mangler verdi";
  }
  let antallTimer = (inpNautisk/inpFartKnop).toFixed(2);
  return Number(antallTimer);
}
  
  /** Tester - sjekker at funksjonene virker virker */
  
  
  expect(beregnKM,1).to.be(1.852);
  expect(beregnTid,2,2).to.be(1);
  expect(beregnTid,0,4).to.be("mangler verdi");
  expect(beregnTid,4,0).to.be("mangler verdi");