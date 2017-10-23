// flow

function setup() {
    let inpDecimal = document.getElementById("decimal");
    let inpBinary = document.getElementById("binary");
    let divSvar = document.getElementById("svar");


    inpDecimal.addEventListener("keyup", d2b);

    inpBinary.addEventListener("keyup", b2d);


    function d2b(event) {
        let decimal = inpDecimal.valueAsNumber;
        divSvar.innerHTML = decimal.toString(2);
    }
    function b2d(event) {
        let binary = inpBinary.valueAsNumber;
        divSvar.innerHTML = parseInt(binary, 2);
    }


   function lesTall(s, base) {
        let sum = 0;
        s = s.toUpperCase();
        for (let i = 0; i < s.length; i++){
            let c = s.charCodeAt(i) - 48;
            if(c>9){
                c-=7;
            }
            sum *= base;
            sum += c;
        }
        return sum;
    }
}