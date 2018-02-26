function setup(){

    let input = document.getElementById("input");
    let tilbakemeldingDiv = document.getElementById("tilbakemelding");
    let btn = document.getElementById("knapp");
    btn.addEventListener("click", niceName);


    function niceName(event){
        let ferdigNavnArray = [];
        let biterOriginal = input.value.toLowerCase();
        let biter = biterOriginal.split(" ");
        for(let n of biter){
            let m = n.charAt(0).toUpperCase();
            let o = n.substr(1);
            let p = m + o;
            ferdigNavnArray.push(p);
        }
        let ferdigNavn = ferdigNavnArray.join(" ");
        tilbakemeldingDiv.innerHTML = ferdigNavn;
    }


}