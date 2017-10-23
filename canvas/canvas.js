function setup() {
    let canvas = document.getElementById("tegning");
    let ctx = canvas.getContext('2d');
    let xpos = 100;
    let vx = 2;
    let ypos = 100;
    let vy = 2;
    

    /**
     * Tegner en figur
     * @param {context} ctx - tegneområdet
     * @param {number} dx - avstand fra v.kant
     */
    function figur(ctx, dx, dy){
    ctx.beginPath();
    //kropp
    ctx.moveTo(dx, (dy+200));
    ctx.lineTo(dx, (dy+300));
    //venstre fot
    ctx.lineTo((dx-30), (dy+400));
    //høyre fot
    ctx.moveTo(dx, (dy+300));
    ctx.lineTo((dx+30), (dy+400));
    //høyre arm
    ctx.moveTo(dx, (dy+220));
    ctx.lineTo((dx+60), (dy+240));
    //venstre arm
    ctx.moveTo(dx, (dy+220));
    ctx.lineTo((dx-60), (dy+240));
    //hode
    ctx.moveTo((dx+20), (dy+180));
    ctx.arc(dx, (dy+180), 20, 0, 2*Math.PI);
    ctx.stroke();
    }

    function tegn(){
        ctx.clearRect(0,0,500,500);
        figur(ctx,xpos,ypos);
        xpos += vx;
        ypos += vy;
        if(xpos>450){
            vx = -2;
        }
        if(xpos<100){
            vx = 2;
        }
        if(ypos>50){
            vy = -2;
        }
        if(ypos<-150){
            vy = 2;
        }
    }
    setInterval(tegn,40);
    
}