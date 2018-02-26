// @ts-check

function setup(){
    let txaTxt = document.getElementById("txt");
    let btnLagre = document.getElementById("lagre");
    btnLagre.addEventListener("click", lagreText);
    let words = [];

    function lagreText(event){
        let text = txaTxt.value;
        text.replace(/\|([^|]+)\|/gm, (hele, ordet) => {
            words.push(ordet);
            return '<span class="target"></span>';
        });
    }
}