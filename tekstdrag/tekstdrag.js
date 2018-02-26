function setup(){

    let lagreBTN = document.getElementById("lagre");
    lagreBTN.addEventListener("click", lagreTekst);

    let refreshBTN = document.getElementById("refresh");
    refreshBTN.addEventListener("click", refreshTekst);

    let ferdigTekstDiv = document.getElementById("ferdigTekst");

    let mainDiv = document.getElementById("main");

    let ferdigOrdDiv = document.getElementById("ferdigOrd");


    let tekstArray= [];
    let targetWords = [];
    let targetWordsFerdig = [];
    let everything = "";
    let verdi = "";
    let draElement;
    let tilElement;

    function lagreTekst(){
        let tekstBoks = document.getElementById("txtArea").value;
        let x = 20;
        let y = 0;
        tekstArray = tekstBoks.split(" ");
        targetWords = [];
        everything = "";

        tekstArray.forEach(w => {
            if(w.charAt(0) === "|" && w.charAt(w.length -1) === "|"){
                targetWords.push(w.substr(1,w.length-2));
                everything += " " + "<span class='flytteTekst'>______</span>";
            } else {
                everything += " " + w;
            }
        });
 
        for(let i = 0; i<targetWords.length; i++){
            let t = document.createElement('div');
            t.className = 'flytteOrd';
            if(300 + x + 12 * targetWords[i].length > 600){
                y += 30;
                x = 20;
            }
            t.style.left = 300 + x + "px";
            t.style.top = 320 + y + "px";
            t.style.width = 12 * targetWords[i].length + "px";
            t.innerHTML = targetWords[i];
            mainDiv.appendChild(t);
            x += 20 + 12 * targetWords[i].length;
        }
        ferdigTekstDiv.innerHTML = everything;
        
        tekstArray = [];

        draElement = document.getElementsByClassName('flytteOrd');
        for(let i = 0; i<targetWords.length; i++){
        draElement[i].addEventListener("click", saveData);
        }
        tilElement = document.getElementsByClassName('flytteTekst');
        for(let i = 0; i<targetWords.length; i++){
        tilElement[i].addEventListener("click", pasteData);
        }
    }

    function saveData(e){
        verdi = e.target.innerHTML;
    }
    function pasteData(e){
        e.target.innerHTML = verdi;
    }

    function refreshTekst(){
        location.reload();
    }
}