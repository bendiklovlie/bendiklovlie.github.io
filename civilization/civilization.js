function setup() {
    let divMain = document.getElementById("main");
    let yTop = 43.3;

    let randResource = ['hexagonTundra', 'hexagonSkog', 'hexagonFjell', 'hexagonOrken', 'hexagonGress'];
    let random = '';
    let randomForhold = "";
    let brett = [];

    for (let i = 0; i < 100; i++) {
        brett[i] = [];
        for (let j = 0; j < 30; j++) {
            random = randResource[Math.floor(Math.random() * randResource.length)];
            randomForhold = Math.floor(Math.random() * 10);
            if (randomForhold < 3) {
                random = 'hexagonGress';
            } else if (randomForhold >= 3 && randomForhold < 5) {
                random = 'hexagonSkog';
            } else if (randomForhold >= 5 && randomForhold < 6) {
                random = 'hexagonFjell';
            } else if (randomForhold >= 6 && randomForhold < 8) {
                random = 'hexagonOrken';
            } else {
                random = 'hexagonTundra';
            }

            if (i <= 2 || i >= 97 || j <= 0 || j >= 29) {
                random = 'hex';
            }
            brett[i][j] = random;
            let t = document.createElement('div');
            t.className = random;
            t.style.left = i * 26 + "px";
            t.style.top = j * 87 + yTop + "px";
            divMain.appendChild(t);
        }
        if (yTop < 44) {
            yTop += 43.8;
        } else {
            yTop -= 43.8;
        }
    }

    let char = document.getElementById("char");
    char.addEventListener("click", moveChar);

    let xPos = "";
    let yPos = "";

    function moveChar(e) {
        xPos = e.clientX;
        yPos = e.clientY;
    }
}