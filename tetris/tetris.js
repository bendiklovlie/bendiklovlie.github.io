// @ts-check

function setup(){
    let t = new Tetromino();
    let b = new Brett();
    console.log(t.name, b.name);
}

class Tetromino{
    constructor(){
        this.name = "tetro";
    }
}
class Brett{
    constructor(){
        this.name = "Brett";
    }
}