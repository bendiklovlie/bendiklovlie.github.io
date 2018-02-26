// @ts-check

function setup(){

    let divFig1 = document.querySelector("#fig1");
    let divBoks = document.querySelector("#boks1");

    //link til "oppskrift" for animasjon
    //https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API

    let moveFrames = [
        { left: "0vw" },
        { left: "600px" }
    ];
    let moveSettings = {
        duration: 2000,
        iterations: 1,
        fill: "forwards"
    };

    let move = divFig1.animate(moveFrames,moveSettings);

    let stepFrames = [
        { backgroundPositionX: "0px" },
        { backgroundPositionX: "-894px" }
    ];
    let stepSettings = {
        duration: 800,
        iterations: Infinity,
        easing: "steps(8)"
    };

    let step = divFig1.animate(stepFrames,stepSettings);

    move.onfinish = ferdigMove;

    let lift;

    function ferdigMove(e) {
        step.cancel();
        divFig1.style.backgroundPositionY = "calc(-114px * 8)";
        stepSettings.iterations = 1;
        stepSettings.duration = 1000;
        let bend = divFig1.animate(stepFrames,stepSettings);
        bend.play();

        let liftFrames = [
            { top: "calc(100vh - 70px)" },
            { top: "calc(100vh - 100px)" }
        ];
        let liftSettings = {
            duration: 1000,
            delay: 500,
            iterations: 1,
            fill: "forwards",
            easing: "ease-out"
        };
    
        lift = divBoks.animate(liftFrames,liftSettings);

        lift.onfinish = gaaTilbake;
    }

    
    function gaaTilbake(){
        divBoks.parentNode.removeChild(divBoks);
        let divBoks2 = document.getElementById("boks2");
        divBoks2.style.opacity = 1;
        //divBoks2.style.left = "0px";
        divFig1.style.transform = "scaleX(-1)";
        divFig1.style.backgroundPositionY = "calc(-119px * 2)";
        //divFig1.style.transition = "none";
        //divFig1.style.transform = "scaleX(1)";
        //divBoks2.style.left = "0px";
        setTimeout(function(){ step.play();move.playbackRate = -1; }, 1000);
    }

}