function setup(){

    let fn = document.getElementById("fornavn");

    let alder = document.getElementById("alder").valueAsNumber;

    let button = document.getElementById("lagre");
    button.addEventListener("click",test);

    let fornavn = fn;

    function test(event){
        console.log(alder);
    }





}