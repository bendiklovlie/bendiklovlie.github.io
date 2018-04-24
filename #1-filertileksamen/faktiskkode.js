//@ts-check
function setup(){











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