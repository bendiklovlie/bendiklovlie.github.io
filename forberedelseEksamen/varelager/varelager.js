// @ts-check
function setup() {
    let divSoyler = document.getElementById("soylediagram");
    let divKake = document.getElementById("kakediagram");

    let inpVare = document.getElementById("vare");
    let inpAntall = document.getElementById("antall");
    let inpPris = document.getElementById("pris");

    let btnLagre = document.getElementById("regVare");
    btnLagre.addEventListener("click", lagreVare);

    let btnVisKake = document.getElementById("visKake");
    btnVisKake.addEventListener("click", visKake);


    let vareArray = [];
    let vareIndex = 0;
    let vareOversikt = {};
    function lagreVare() {
        let a = inpVare.value;
        let b = inpAntall.valueAsNumber;
        let c = inpPris.valueAsNumber;
        let vare = {vare:`${a}`,antall:b,pris:c};
        vareArray.push(vare);
        vareOversikt[a] = vareIndex;
        divSoyler.innerHTML = "" + vare;
        lagSoyler(vareArray,divSoyler);
        vareIndex++;
    }

    let sumVerdi = 0;
    function lagSoyler(array,visning){
        sumVerdi = 0;
        let s = "";
        for(let i = 0; i < array.length; i++){
            sumVerdi += array[i].antall*array[i].pris;
        }
        let container = [];
        for(let i = 0; i < array.length; i++){
            let verdi = (array[i].antall*array[i].pris);
            s += `<div><span>${array[i].vare}:</span> 
            <div style="width:${(verdi/sumVerdi)*500}px;"></div> 
            <span>${verdi}</span></div><br>`;
            visning.innerHTML = s;
        }
    }

    function visKake(){
        let verdier = [];
        let varer = [];
        for(let i = 0; i < vareArray.length; i++){
            verdier.push(vareArray[i].antall*vareArray[i].pris);
            varer.push(vareArray[i].vare);
        }
        let data = (verdier.filter(e => e > 0)).map(e => (e * 360)/sumVerdi);
        let labels = varer.filter((e,i) => verdier[i] > 0);
        let farger = ["#FDB", "#7EF", "green", "red",
         "blue", "gray", "yellow", "orange", "brown", "purple"];
        let colors = farger.filter((e,i)=> verdier[i] > 0);
        var canvas = document.getElementById("diagram");
        var context = canvas.getContext("2d");
        // visk vekk alt fra canvas
        context.clearRect(0, 0, 500, 500);
        for (let idx = 0; idx < data.length; idx++) {
            // tegner ett kakesegment for hvert datasett
            drawSegment(canvas, context, data, colors, labels, idx);
        }
    }
/*
    let data = kcal.filter((e) => e > 0)
        .map((e) => 360 * e / total);
    // merk at vi ikke trenger å sjekke om total === 0
    // for da vil kcal.filter === [ ] og ingenting utføres

    // filtrerer navn på matvarer på samme måte                   
    let labels = mat.filter((e, i) => kcal[i] > 0);

    // filtrerer fargene slik at hver matvare alltid får samme farge
    let colors = ["#FDB", "#7EF", "green", "red", "blue"].filter((e, i) => kcal[i] > 0);

    // tegn kakediagram

    var canvas = document.getElementById("diagram");
    var context = canvas.getContext("2d");
    // visk vekk alt fra canvas
    context.clearRect(0, 0, 500, 500);

    // for alle data (de matvarene som er valgt)
    for (let idx = 0; idx < data.length; idx++) {
        // tegner ett kakesegment for hvert datasett
        drawSegment(canvas, context, data, colors, labels, idx);
    }

*/

    // hjelpefunksjoner for å tegne på canvas
    // kopiert fra http://www.wickedlysmart.com/how-to-make-a-pie-chart-with-html5s-canvas/
    // modifisert slik at ingen data er globale variable
    function drawSegment(canvas, context, data, colors, labels, i) {
        context.save();
        var centerX = Math.floor(canvas.width / 2);
        var centerY = Math.floor(canvas.height / 2);
        let radius = Math.floor(canvas.width / 2);
        var startingAngle = degreesToRadians(sumTo(data, i));
        var arcSize = degreesToRadians(data[i]);
        var endingAngle = startingAngle + arcSize;
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius,
            startingAngle, endingAngle, false);
        context.closePath();
        context.fillStyle = colors[i];
        context.fill();
        context.restore();
        drawSegmentLabel(canvas, context, data, labels, i);
    }
    function degreesToRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }
    function sumTo(a, i) {
        var sum = 0;
        for (var j = 0; j < i; j++) {
            sum += a[j];
        }
        return sum;
    }
    function drawSegmentLabel(canvas, context, data, labels, i) {
        context.save();
        var x = Math.floor(canvas.width / 2);
        var y = Math.floor(canvas.height / 2);
        var angle = degreesToRadians(sumTo(data, i));
        context.translate(x, y);
        context.rotate(angle);
        var dx = Math.floor(canvas.width * 0.5) - 10;
        var dy = Math.floor(canvas.height * 0.05);
        context.textAlign = "right";
        var fontSize = Math.floor(canvas.height / 25);
        context.font = fontSize + "pt Helvetica";
        context.fillText(labels[i], dx, dy);
        context.restore();
    }
}