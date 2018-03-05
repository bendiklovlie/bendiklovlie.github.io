// @ts-check

//lage ulike variabler
let string = "string";
let integer = 123;
let array = [];
let object = {};
let boolean = false;

//lage funksjon
function funksjonsnavn(){

}
//while-løkke
let i = 0;
while(i<integer){
    i++;
}
//for-løkker
for(let i = 0; i < array.length; i++){
    
}
for(let i of array){

}
array.forEach(verdi => {
    
});
//if-statement
if(integer === 123){
    boolean = true;
} else if (integer !== 123){
    boolean = false;
} 

// test = (condition ? value1 : value2);

//sortere
array.sort(); //sorterer alfabetisk A B C a b c 11 12 14 23 25 4
array.sort((x,y)=>(x-y)); //sorterer tall i stigende rekkefølge 0 1 2 3 4 

//legger sammen alle tallene i en array
array.reduce((x,y)=>(x+y));

// hente navnene inne i obkjektet
Object.keys(objektet);

// hente verdiene til navnene inne i objektet
Object.values(objektet);