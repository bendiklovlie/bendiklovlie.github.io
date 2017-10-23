function setup() {






    let divFuggel = document.getElementById("bird");
    let divPoeng = document.getElementById("poeng");

   


    setInterval(flytt, 60);
    let fart = 0;
    let top = 255;
    let soylepos = 650;
    const PXperMS = 18;

    let crashed = false;

    let poeng = 0;

    let melding = "du har vunnet";


    /*
    regnetr ut hvor mye søylene flytter seg på 60ms:
    900px på 3000ms
    60*(900/3000)
    = 18px
    */

    addEventListener("keydown", giFart);

    function flytt() {
        divFuggel.style.top = top + "px";
        top = top - fart;
        fart = fart - 1;
        if (top > 550) {
            fart = 0;
        }
        if (top < 0) {
            fart = 0;
            top = 0;
        }
        soylepos = soylepos - PXperMS;

        // dersom vi har fullført en runde 
        if (soylepos < -250) {
            soylepos = 650;
            poeng += 2;
            crashed = false;
        }

        // oppdaterer posisjonen til søyler
        if (!crashed) {
            if (soylepos < 345 && soylepos > 255 - 50) {
                if (top < 120 || top > 410) {
                    divFuggel.style.top = "550px";
                    top = 550;
                    poeng -= 2;
                    crashed = true;
                }
            }
        }
        divPoeng.innerHTML = String(poeng);
        if (poeng > 20) {
            divPoeng.innerHTML = melding;
        }
    }
    function giFart() {
        fart = 10;
    }
}