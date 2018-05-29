//@ts-check
function setup(){

  let divMain = document.getElementById("main");
  let divBilde1 = document.getElementById("bilde1");
  let divBilde2 = document.getElementById("bilde2");
  let divBilde3 = document.getElementById("bilde3");
  let divTilbakeMelding = document.getElementById("tilbakeMelding");

  let spnTekst1 = document.getElementById("tekst1");
  let spnTekst2 = document.getElementById("tekst2");
  let spnTekst3 = document.getElementById("tekst3");

  let btnSvar = document.getElementById("resultat");
  btnSvar.addEventListener("click", visSvar);

  let divTest = document.getElementById("test");


  document.addEventListener("click", saveValue);
  document.addEventListener("click", checkValue);



  let value;
  let antallKorrekte = 0;
  let valueCheckedTekst = "";
  let valueCheckedBilde = "";
  let hvemVarRett = "";

  function saveValue(e){
    if(e.target.nodeName === "SPAN"){
      value = e.target.id;
      e.target.innerHTML = "";
      valueCheckedTekst = value.charAt(5);
    }
  }
  function checkValue(e){
    if(e.target.classList[0] === "bilde"){
      valueCheckedBilde = e.target.attributes[2].value.charAt(5);
      if(valueCheckedTekst === valueCheckedBilde){
        hvemVarRett += `bilde${valueCheckedBilde} og tekst${valueCheckedTekst} var rett kombinasjon`;
        antallKorrekte ++;
        valueCheckedTekst = "";
        valueCheckedBilde = "";
      } else{
        hvemVarRett += ` bilde${valueCheckedBilde} og tekst${valueCheckedTekst} var ikke rett kombinasjon`;
        valueCheckedTekst = "";
        valueCheckedBilde = "";
      }
    }
  }
  function visSvar(){
    if(antallKorrekte === 3){
      divTest.innerHTML = `du fikk alt rett`;
    } else if(antallKorrekte !== 0){
      divTest.innerHTML = ` ${antallKorrekte} av kombinasjonene var rette, her 
      er de som var rette/feil: ${hvemVarRett}`;
    }
  }
}
