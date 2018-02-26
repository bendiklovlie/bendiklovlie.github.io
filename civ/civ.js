// flow

function civ() {
    let divMain = document.getElementById("main");
    let divBoard = document.getElementById("board");
    let ctx = document.getElementById("minimap").getContext("2d");
    let terrain = "sea,grass,plain,swamp,forest,hill,mountain,desert".split(",");
    let colors = "blue,green,yellow,sandybrown,teal,olive,darkgray,orange".split(",");



    const W = 55;   // antall brikker i bredden
    const H = 55;    // antall brikker i høyden
    const HexH = 115;  // høde bredde på hex-tile
    const hexW = 100;
    const hexD = 115 * 17 / 23;  // forskyvning i høyde mellom rader

    let brett;
    let board = [];
    let islands;
    let units = [];
    // fetch uits from firebase



    [brett, islands] = build(W, H);

    myland = islands[0];
    let t;
    let px = myland.x;
    let py = myland.y;
    do {
        px++;
        t = brett[px][py]
    } while (t === MOUNTAIN || t === SEA);
    px = (px + W - 8) % W;
    py = (py + H - 4) % H;

    // just a test to see if we can render a unit
    units.push({ x: px, y: py, type: "setler" });

    for (let i = 0; i < 17; i++) {
        board[i] = [];
        for (let j = 0; j < 9; j++) {
            let t = document.createElement('div');
            t.className = "hex";
            t.style.top = (-hexD + j * hexD) + "px";
            t.style.left = (-hexW * 7 + i * hexW + hexW * j / 2) + "px";
            divBoard.appendChild(t);
            board[i][j] = t;
        }
    }

    let u = document.createElement('div');
    u.className = "unit setler";
    u.style.top = (-hexD + 4 * hexD) + "px";
    u.style.left = (-hexW * 7 + 8 * hexW + hexW * 4 / 2) + "px";
    divMain.appendChild(u);





    function render(px, py) {
        for (let i = 0; i < 17; i++) {
            for (let j = 0; j < 9; j++) {
                let t = board[i][j];
                let tile = brett[(px + i) % W][(py + j) % H];
                t.className = "hex " + terrain[tile];
            }
        }
        renderUnits();
        minimap();
        drawFrame();

    }

    function renderUnits() {
        units.forEach(e => {

        });
    }

    function drawFrame() {
        ctx.strokeStyle = "white";
        ctx.strokeRect(((px + 6) * 4 + 4 * (py / 2)) % (W * 4), ((py + 1) * 4) % (H * 4), 28, 28);
    }

    function minimap() {
        brett.forEach((e, x) => e.forEach((e, y) => {
            let px = (x + Math.floor(y / 2)) % W;
            let py = y;
            let color = colors[brett[x][y]];
            ctx.fillStyle = color;
            ctx.fillRect(px * 4, py * 4, 4, 4);
        }));
    }

    render(px, py);

    document.addEventListener("keyup", move);

    let wait = false;
    let facing = "right";


    divMain.addEventListener("click", clickMove);

    function clickMove(e){
        let top = e.clientY;
        let left = e.clientX;
        if(top <= 360 && top >= 280 && left <= 390 && left >= 320){
            divMain.innerHTML = "test qwgrabefdbsgears";
        }
    }


    function move(e) {
        if (wait) return;
        let dx = 0, dy = 0;
        let nx, ny;
        wait = true;
        switch (e.keyCode) {
            case 87:  // w opp til venstre
                ny = (py + H - 1 + 4) % H;
                nx = (px + W - 0 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boatReverse";
                    py = (py + H - 1) % H;
                    dx = hexW / 2; dy = hexD;
                } else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setlerReverse";
                    py = (py + H - 1) % H;
                    dx = hexW / 2; dy = hexD;
                }
                break;
            case 88: // x ned til høyre
                ny = (py + H + 1 + 4) % H;
                nx = (px + W - 0 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boat";
                    py = (py + 1) % H;
                    dx = -hexW / 2; dy = -hexD;
                } else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setler";
                    py = (py + 1) % H;
                    dx = -hexW / 2; dy = -hexD;
                                    }
                break;
            case 65:  // a venstre
                ny = (py + H + 0 + 4) % H;
                nx = (px + W - 1 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boatReverse";
                    px = (px + W - 1) % W;
                    dx = hexW; dy = 0;
                }else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setlerReverse";
                    px = (px + W - 1) % W;
                    dx = hexW; dy = 0;
                                    }
                break;
            case 68:   // d høyre
                ny = (py + H + 0 + 4) % H;
                nx = (px + W + 1 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boat";
                    px = (px + 1) % W;
                    dx = -hexW; dy = 0;
                }else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setler";
                    px = (px + 1) % W;
                    dx = -hexW; dy = 0;
                                    }
                break;
            case 90:  // z - ned til venstre
                ny = (py + H + 1 + 4) % H;
                nx = (px + W - 1 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boatReverse";
                    px = (px + W - 1) % W;
                    py = (py + 1) % H;
                    dx = 50; dy = -85;
                }else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setlerReverse";
                    px = (px + W - 1) % W;
                    py = (py + 1) % H;
                    dx = 50; dy = -85;
                                    }
                break;
            case 69:  // e - opp til høyre
                ny = (py + H - 1 + 4) % H;
                nx = (px + W + 1 + 8) % W;
                if (brett[nx][ny] === SEA && brett[nx][ny] !== MOUNTAIN) {
                    u.className = "unit boat";
                    px = (px + 1) % W;
                    py = (py + H - 1) % H;
                    dx = -50; dy = 85;
                }else if (brett[nx][ny] !== SEA && brett[nx][ny] !== MOUNTAIN){
                    u.className = "unit setler";
                    px = (px + 1) % W;
                    py = (py + H - 1) % H;
                    dx = -50; dy = 85;
                                    }
                break;
            default:
                wait = false;
                return;
        }
        event.preventDefault();

        let smooth;
        
        if(u.className === "unit setler" || u.className === "unit setlerReverse" ){
            smooth = divBoard.animate(
                [
                    { left: "0px", top: "0px" },
                    { left: dx + "px", top: dy + "px" }
                ], {
                    duration: 180,
                }
            )
        } else if(u.className === "unit boat" || u.className === "unit boatReverse"){
            smooth = divBoard.animate(
                [
                    { left: "0px", top: "0px" },
                    { left: dx + "px", top: dy + "px" }
                ], {
                    duration: 100,
                }
            )
        }

        smooth.onfinish = () => {
            render(px, py);
            wait = false;
        }

    }

}


function rndTerrain(terr) {
    let idx = Math.floor(Math.random() * terr.length);
    return terr[idx];
}