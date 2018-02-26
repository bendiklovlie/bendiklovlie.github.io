// @ts-check

function setup(){

    let divUkedager = document.getElementById("ukedager");
    let divDatoer = document.getElementById("datoer");
    let divTinyed = document.getElementById("tinyed");

    let btnPrevYear = document.getElementById("prev_year");
    let btnNextYear = document.getElementById("next_year");
    let btnPrevMonth = document.getElementById("prev_month");
    let btnNextMonth = document.getElementById("next_month");

    btnPrevYear.addEventListener("click", PrevYear);
    btnNextYear.addEventListener("click", NextYear);
    btnPrevMonth.addEventListener("click", PrevMonth);
    btnNextMonth.addEventListener("click", NextMonth);

    let year = 2018;
    let month = 2;
    let day = 8;

    function PrevYear(){
        year -= 1;
        visKalender(year,month,day);
    }
    function NextYear(){
        year += 1;
        visKalender(year,month,day);
    }
    function PrevMonth(){
       if(month > 0){
           month -= 1;
       } else if (month === 0){
           month = 11;
           year -= 1;
       }
        
        visKalender(year,month,day);
    }
    function NextMonth(){
        if(month < 11){
            month += 1;
        } else if (month === 11){
            month = 0;
            year += 1;
        }
        visKalender(year,month,day);
    }

    let mndNavn = "Januar,Februar,Mars,April,Mai,Juni,Juli,August,September,Oktober,November,Desember".split(",");
    let mndDager = "31,28,31,30,31,30,31,31,30,31,30,31".split(",");

    function visKalender(y,m,d){
        let divYear = document.getElementById("year");
        let divMonth = document.getElementById("month");
        divYear.innerHTML = String(y);
        divMonth.innerHTML = mndNavn[m];
    }

    let ukedager = "ma,ti,on,to,fr,lø,sø".split(",");

    for(let dag of ukedager){
        let div = document.createElement("div");
        div.className = "dag";
        div.innerHTML = dag;
        divUkedager.appendChild(div);
    }

    let datoer = [];

    for(let i = 1; i < 43; i++ ){
        datoer.push(i);
    }
    for(let dato of datoer){
        let div = document.createElement("div");
        div.className = "dato";
        div.innerHTML = "" + dato + "";
        divDatoer.appendChild(div);
    }
}