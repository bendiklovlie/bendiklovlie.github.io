function setup(){

    let divMain = document.getElementById("main");
    let divSanta = document.getElementById("santa");
    divSanta.addEventListener("click", dropPresent);
    let divTree = document.getElementById("tree");



    let test = 0;
    let randomClass;

    function dropPresent(e) {
        if(randomClass === 'santa1'){
            randomClass = 'santa2';
        } else if(randomClass === 'santa2'){
            randomClass = 'santa1';
        } else if(Math.random()<0.5){
            randomClass = 'santa1';
        } else { randomClass = 'santa2';}
        divSanta.className = randomClass;
        let t = document.createElement('div');
        t.className = 'package';
        t.style.left = e.clientX - 60 + "px";
        t.style.top = 400 + "px";
        divMain.appendChild(t);
    }

}