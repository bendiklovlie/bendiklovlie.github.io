// @ts-check

function setup(){
    let spanYear = document.getElementById("year");
    let spanMonth = document.getElementById("month");
    let divUkedager = document.getElementById("ukedager");
    let divDatoer = document.getElementById("datoer");

    let btnNextYear = document.getElementById("nextYear");
    let btnPrevYear = document.getElementById("prevYear");
    let btnNextMonth = document.getElementById("nextMonth");
    let btnPrevMonth = document.getElementById("prevMonth");

    btnNextYear.addEventListener("click", nextYear);
    btnPrevYear.addEventListener("click", prevYear);
    btnNextMonth.addEventListener("click", nextMonth);
    btnPrevMonth.addEventListener("click", prevMonth);

    let months = "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(",");
    let mndDager = "31,28,31,30,31,30,31,31,30,31,30,31".split(",");

    let minDato = {
        year:2018,
        month:2,
        day:1
    };

    let arrDato = [];

    function lagUkedager(){
        let dagNavn = ["Man","Tir","Ons","Tor","Fre","Lør","Søn"];
        for (let d of dagNavn){
            let kort = d.substr(0,2);
            let div = document.createElement('div');
            div.className = "ukedag";
            div.innerHTML = kort;
            divUkedager.appendChild(div);
        }
    }

    
    function lagDatoer(){
        for(let d = 1; d < 43 ; d ++){
            let div = document.createElement("div");
            arrDato.push(div);
            div.className = "dato";
            div.innerHTML = String(d);
            divDatoer.appendChild(div);
        }
    }

    function nextYear(e){
        minDato.year ++;
        visMonth(minDato);
    }
    function prevYear(e){
        minDato.year --;
        visMonth(minDato);
    }
    function nextMonth(e){
        if(minDato.month < 12){
            minDato.month ++;
        } else {
            minDato.month = 1;
            minDato.year ++;
        }
    
        visMonth(minDato);
    }
    function prevMonth(e){
        if(minDato.month > 1){
            minDato.month --;
        } else {
            minDato.month = 12;
            minDato.year --;
        }
        
        visMonth(minDato);
    }



    function visMonth(dato) {
        // trenger å vite hvilken dag 1. av denne måneden er
        let d = new Date(`${dato.year}/${dato.month}/1`);
        let start = (d.getDay() + 6) % 7;
        spanYear.innerHTML = String(dato.year);
        spanMonth.innerHTML = months[minDato.month - 1];
        let lengde = +(mndDager[dato.month-1]);
        for (let i = 0; i < 42; i ++){
            let div = arrDato[i];
            div.classList.add("hidden");
        }
        for (let i = 0; i < lengde ; i ++){
            let div = arrDato[i + start];
            div.innerHTML = String(i+1);
            div.classList.remove("hidden");
        }
    }

    lagDatoer();
    lagUkedager();
    visMonth(minDato);
}