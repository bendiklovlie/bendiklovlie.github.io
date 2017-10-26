function setup(){

    let firkantDiv = document.getElementById("firkant");
    let trekantDiv = document.getElementById("firkant");
    let sirkelDiv = document.getElementById("firkant");
    let restartDiv = document.getElementById("firkant");
    let rodDiv = document.getElementById("firkant");
    let gronnDiv = document.getElementById("firkant");
    let gulDiv = document.getElementById("firkant");
    let blaDiv = document.getElementById("firkant");








    let restartKnapp = document.getElementById("restart");
    restartKnapp.addEventListener("click",restartFunksjon);

    function restartFunksjon(event){
        location.reload();
    }



}