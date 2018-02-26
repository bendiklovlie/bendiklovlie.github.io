// @ts-check

function setup(){
    let divHalden = document.getElementById("halden");
    let divFredrikstad = document.getElementById("fredrikstad");
    let divTest = document.getElementById("test");

    divHalden.addEventListener("click", openHalden);
    divFredrikstad.addEventListener("click", openFredrikstad)

    function openFredrikstad(){
        divTest.innerHTML = "hei";
        window.open("fredrikstad_film.mp4", "_blank", "resizable=yes,width=600,height=400");
    }
    function openHalden(){
        divTest.innerHTML = "hei";
        window.open("halden_film.mp4", "_blank", "resizable=yes,width=600,height=400");
    }

    //link til window.open() https://www.w3schools.com/jsref/met_win_open.asp
}