//@ts-check
function setup(){
  let inpUke = document.getElementById("uke");
  let inpMiddag = document.getElementById("middag");
  let inpBarn = document.getElementById("barn");
  let inpUngdom = document.getElementById("ungdom");
  let inpVoksne = document.getElementById("voksen");

  let divVisning = document.getElementById("visning");
  let divVisningBehov = document.getElementById("visningBehov");

  let btnRegistrer = document.getElementById("registrer");
  btnRegistrer.addEventListener("click", registrerBestilling);

  let btnBehov = document.getElementById("behov");
  btnBehov.addEventListener("click", finnBehov);

  let bestillingsRegister = [];

  function registrerBestilling(){
    let ukeNr = inpUke.valueAsNumber;
    let middagNr = inpMiddag.valueAsNumber;
    let antallBarn = inpBarn.valueAsNumber;
    let antallUngdom = inpUngdom.valueAsNumber;
    let antallVoksne = inpVoksne.valueAsNumber;
    
    let bestilling = [ukeNr,middagNr,antallBarn,antallUngdom,antallVoksne];
    bestillingsRegister.push(bestilling);

    let string = `<table><tr><th>bestilling</th><th>uke</th>
    <th>middager</th><th>barn</th><th>ungdom</th><th>voksen</th></tr>`;
    for(let i = 0; i<bestillingsRegister.length; i++){
      let nummer = bestillingsRegister[i][0];
      let middag = bestillingsRegister[i][1];
      let barn = bestillingsRegister[i][2];
      let ungdom = bestillingsRegister[i][3];
      let voksen = bestillingsRegister[i][4];
      string += `<tr> <td>${i}</td><td>${nummer}</td><td>${middag}</td>
      <td>${barn}</td><td>${ungdom}</td><td>${voksen}</td></tr>`;
    }
    string += `</table`;
    divVisning.innerHTML = string;
  }

  // barn(0),undgom(1),voksen(2)
  // Torsk(0),Sei(1),Makrell(2),Reker(3),Krabbe(4),Laks(5)
  let raavareTabell = [
    [200,200,200,250,300,200],
    [300,300,300,500,500,300],
    [350,350,350,500,600,350]
  ];

  /*
  Middag 1: Sørlandsk krabbesuppe
  Middag 2: Mandalstorsk i smørsaus med Holumspoteter
  Middag 3: Laks fra Laudal i spinat (bare for dem som har bestilt tre middager)
  */

  let barn1 = 0;
  let barn2 = 0;
  let barn3 = 0;
  let ungdom1 = 0;
  let ungdom2 = 0;
  let ungdom3 = 0;
  let voksen1 = 0;
  let voksen2 = 0;
  let voksen3 = 0;
  let krabbe = 0;
  let torsk = 0;
  let laks = 0;
  function finnBehov(){
    barn1 = 0;
    barn2 = 0;
    barn3 = 0;
    ungdom1 = 0;
    ungdom2 = 0;
    ungdom3 = 0;
    voksen1 = 0;
    voksen2 = 0;
    voksen3 = 0;
    for(let i = 0; i<bestillingsRegister.length; i++){
      if(bestillingsRegister[i][0]===26){
        if(bestillingsRegister[i][1]===1){
          barn1 += bestillingsRegister[i][2];
          ungdom1 += bestillingsRegister[i][3];
          voksen1 += bestillingsRegister[i][4];
        } else if(bestillingsRegister[i][1]===2){
          barn2 += bestillingsRegister[i][2];
          ungdom2 += bestillingsRegister[i][3];
          voksen2 += bestillingsRegister[i][4];
        } else if(bestillingsRegister[i][1]===3){
          barn3 += bestillingsRegister[i][2];
          ungdom3 += bestillingsRegister[i][3];
          voksen3 += bestillingsRegister[i][4];
        }
      }
    }
    krabbe = 2*barn2*raavareTabell[0][4] + 
    2*ungdom2*raavareTabell[1][4] + 
    2*voksen2*raavareTabell[2][4] +
    3*barn3*raavareTabell[0][4] +
    3*ungdom3*raavareTabell[1][4] +
    3*voksen3*raavareTabell[2][4];

    torsk = 2*barn2*raavareTabell[0][0] + 
    2*ungdom2*raavareTabell[1][0] + 
    2*voksen2*raavareTabell[2][0] +
    3*barn3*raavareTabell[0][0] +
    3*ungdom3*raavareTabell[1][0] +
    3*voksen3*raavareTabell[2][0];

    laks =  3*barn3*raavareTabell[0][5] +
    3*ungdom3*raavareTabell[1][5] +
    3*voksen3*raavareTabell[2][5];

    divVisningBehov.innerHTML = `total krabbe: ${krabbe} total
    torsk: ${torsk} total laks: ${laks}`;
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
  
  
  expect(vind2watt,2).to.be(0);
  expect(vind2watt,3).to.be(2);
  expect(vind2watt,4).to.be(10);
  expect(vind2watt,5.5).to.be(60);
  expect(vind2watt,7.99).to.be(60);
  expect(vind2watt,8).to.be(150);
  expect(powerprod,[0,0,0,0]).to.be(0);
  expect(powerprod,[3,3,3,3]).to.be(2*4*6);
  expect(powerprod,[3,4,6,8]).to.be(2*6+10*6+60*6+150*6);