function setup() {

    let xpos = 0;
    let ypos = 0;


    let firkantDiv = document.getElementById("firkant");
    firkantDiv.addEventListener("click", lagFirkant);

    let trekantDiv = document.getElementById("trekant");
    trekantDiv.addEventListener("click", lagTrekant);

    let sirkelDiv = document.getElementById("sirkel");
    sirkelDiv.addEventListener("click", lagSirkel);

    let fyltDiv = document.getElementById("fylt");
    fyltDiv.addEventListener("click", fyll);

    let ikkefyltDiv = document.getElementById("ikkefylt");
    ikkefyltDiv.addEventListener("click", ikkefyll);

    let restartDiv = document.getElementById("restart");
    restartDiv.addEventListener("click", restartFunksjon);

    let rodDiv = document.getElementById("rod");
    rodDiv.addEventListener("click", fargeRod);

    let gronnDiv = document.getElementById("gronn");
    gronnDiv.addEventListener("click", fargeGronn);

    let gulDiv = document.getElementById("gul");
    gulDiv.addEventListener("click", fargeGul);

    let blaDiv = document.getElementById("bla");
    blaDiv.addEventListener("click", fargeBla);


    let canvas = document.getElementById("tegning");
    let ctx = canvas.getContext('2d');


    canvas.addEventListener("click", posisjon);

    let type = "";
    let farge = "black";
    let fyllornot = "";

    function posisjon(e) {
        xpos = e.clientX - 140;
        ypos = e.clientY - 10;
        console.log(xpos + " " + ypos);
        switch (type) {
            case "firkant":
                tegnFirkant();
                break;
            case "trekant":
                tegnTrekant();
                break;
            case "sirkel":
                tegnSirkel();
                break;
        }
    }
    function lagFirkant(event) {
        type = "firkant";
    }
    function lagTrekant(event) {
        type = "trekant";
    }
    function lagSirkel(event) {
        type = "sirkel";
    }

    function tegnFirkant() {
        ctx.strokeStyle = farge;
        ctx.fillStyle = farge;
        ctx.beginPath();
        ctx.moveTo(xpos, ypos);
        ctx.lineTo(xpos, ypos + 50);
        ctx.lineTo(xpos + 50, ypos + 50);
        ctx.lineTo(xpos + 50, ypos);
        ctx.lineTo(xpos, ypos);
        if (fyllornot === "fill"){
            ctx.fill();
        } else if (fyllornot === "stroke"){
            ctx.stroke();
        }   else {
            ctx.stroke();
        }
    }
    function tegnTrekant(event) {
        ctx.strokeStyle = farge;
        ctx.fillStyle = farge;
        ctx.beginPath();
        ctx.moveTo(xpos, ypos);
        ctx.lineTo(xpos + 50, ypos);
        ctx.lineTo(xpos + 25, ypos - 50);
        ctx.lineTo(xpos, ypos);
        if (fyllornot === "fill"){
            ctx.fill();
        } else if (fyllornot === "stroke"){
            ctx.stroke();
        }   else {
            ctx.stroke();
        }
    }
    function tegnSirkel(event) {
        ctx.strokeStyle = farge;
        ctx.fillStyle = farge;
        ctx.beginPath();
        ctx.arc(xpos, (ypos), 20, 0, 2*Math.PI);
        if (fyllornot === "fill"){
            ctx.fill();
        } else if (fyllornot === "stroke"){
            ctx.stroke();
        }   else {
            ctx.stroke();
        }
    }

    function fargeRod(){
        farge = 'red';
    }
    function fargeGronn(){
        farge = 'green';
    }
    function fargeGul(){
        farge = 'yellow';
    }
    function fargeBla(){
        farge = 'blue';
    }

    function fyll() {
        fyllornot = "fill";
    }
    function ikkefyll() {
        fyllornot = "stroke";
    }

    function restartFunksjon(event) {
        location.reload();
    }



}