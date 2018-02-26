function setup(){

    let divSvar = document.getElementById("svar");
    divSvar.addEventListener("click",test);

    divSvar.innerHTML = "hallo";


    let a = [3,4,5,6,7,8];
    let b = [8,7,6,5,4,3];


    function test(){
        let aSum = 0;
        let bSum = 0;
        for (let i=0;i<a.length;i++){
        aSum += a[i];
        }
        for (let i=0;i<b.length;i++){
        bSum += b[i];
        }
        let aReverse = a.slice();
        aReverse = aReverse.reverse();
        let aReverseSammen = aReverse.join("");
        let bSammen = b.join("");
        if(aSum === bSum || bSammen === aReverseSammen){
        console.log("Sann");
        } else {
        console.log("Usann");
        }
    
    }
}