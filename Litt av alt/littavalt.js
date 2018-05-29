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


// splice array funksjon
var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at 1st index position
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at 4th index
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May']

//Starter fjerning på index 4 og fjerner 1 element
months.splice(4, 1);


//spille av lyd ved å bruke javascript

let audio = document.createElement('audio');
audio.src = 'alarm.mp3';
audio.play();

let audio1 = new Audio('lydfil1eksamenhost12.mp3');
audio1.play();



//lage en select i javascript

var myDiv = document.getElementById("myDiv");

//Create array of options to be added
var aray = ["Volvo","Saab","Mercades","Audi"];

//Create and append select list
var selectList = document.createElement("select");
selectList.id = "mySelect";
myDiv.appendChild(selectList);

//Create and append the options
for (var j = 0; j < aray.length; j++) {
    var option = document.createElement("option");
    option.value = array[j];
    option.text = array[j];
    selectList.appendChild(option);
}

//shortcut for å lage ny option
// new Option(text, value)



window.open("halden_film.mp4", "_blank", "resizable=yes,width=600,height=400");