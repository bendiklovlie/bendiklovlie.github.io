// @ts-check
function setup() {
    let divPicture = document.getElementById("picture");
    let divTerninger = document.getElementById("terninger");

    let pLedeTekst = document.getElementById("ledeTekst");

    divTerninger.addEventListener("click", registrerKast);

    let btnNextPic = document.getElementById("nextPic");
    btnNextPic.addEventListener("click", nesteBilde);


    let pictures = [];
    pictures.push(`<img src='terningkastmedia/image1.jpg' class='bilde'>`);
    pictures.push(`<img src='terningkastmedia/image2.jpeg' class='bilde'>`);
    pictures.push(`<img src='terningkastmedia/image3.jpeg' class='bilde'>`);
    pictures.push(`<img src='terningkastmedia/image4.jpg' class='bilde'>`);

    let index = 0;
    divPicture.innerHTML = pictures[index];
    function nesteBilde(){
        kastListe.push({bilde,terningkast});
        terningkast = 0;
        if(index >= pictures.length-1){
            visOppsummering();
            return;
        }
        index++;
        divPicture.innerHTML = pictures[index];
    }

    let score = {};
    let kastListe = [];
    let bilde = pictures[index];
    let terningkast = 0;
    function registrerKast(e) {
        bilde = pictures[index];
        terningkast = e.path[0].id.charAt(e.path[0].id.length-1);
        score[bilde] = terningkast;
    }

    function visOppsummering(){
        //let ferdigListe = [...new Set(kastListe)];
        kastListe.sort( (x,y) => {
            if (x.terningkast < y.terningkast) return 1;
            if (x.terningkast === y.terningkast) return 0;
            return -1;
          } );
        console.log(kastListe);
        pLedeTekst.innerHTML = `Dette bildet var blant de du 
        likte best med terningkastet: ${kastListe[0].terningkast}`;
        divPicture.innerHTML = kastListe[0].bilde;
    }

}