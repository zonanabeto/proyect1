var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d");

// //declaraciones

var imagesBatman = ["./assets/BATMANPARADO.png","./assets/BATMAN LEFT.png","./assets/BATMAN RIGHT.png","./assets/BATMAN BRINCA.png"]

var imagesRobin = ["./assets/ROBINNORMAL.png","./assets/ROBINleft.png","./assets/ROBINRIGHT.png","./assets/ROBIN JUMPS.png"]


var tablero = new Board();
var batman = new Personajes(imagesBatman);
var robin = new Personajes(imagesRobin);




// var pipes =[];

var intervalo = 0;
var frames = 0;



//classes

function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "./assets/fondo1.jpg";
    this.timer = 60;
    this.score = 0 
    this.pared = new Image();
    this.pared.src ="./assets/pared.jpg";
    
    this.img.onload = function(){
        this.draw();
        this.drawPared();
    }.bind(this);

    this.move= function(){

        if(this.score<60 && this.score >= 5)this.y++;
        if(this.score>=60 && this.score < 120)this.y +=2;
        if(this.score>=120 && this.score < 180)this.y +=3;
        if(this.score>=180 && this.score < 240)this.y +=4;
        if(this.score>=240 )this.y +=6;

        if(this.y > canvas.height) this.y = 0;
    }

    this.drawScore = function(){

        if(frames % 60 === 0) this.score++;
        ctx.font = "50px Avenir";
        ctx.fillStyle = "white";    
        ctx.fillText(this.score,125,100);
        ctx.font = "30px Avenir";
        ctx.fillText("Score:",100,50);
    }

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.img,this.x,this.y - canvas.height,this.width,this.height)
        

    }
    
    this.drawPared = function(){
        ctx.drawImage(this.pared,0,0,100,this.height);
        ctx.drawImage(this.pared,canvas.width -100 ,0,100,this.height);

    }
    

    this.drawTimer= function(){
        if(this.timer === 0) this.timer = 60;
        if(frames % 60 === 0) this.timer--;
        ctx.font = "50px Avenir";
        ctx.fillStyle = "white";    
        ctx.fillText(this.timer,this.width*(3/4),100);
        ctx.font = "30px Avenir";
        ctx.fillText("Speed up in:",400,50);
        
    }

}

//Personajes

function Personajes(img){
    this.x =(canvas.width/2);
    this.y = canvas.height - 120;
    this.width = 40;
    this.height=100;
    this.img = new Image();
    this.img.src = img[0];
    this.img2 = new Image();
    this.img2.src = img[1];
    this.img3 = new Image();
    this.img3.src = img[2];
    this.img4 = new Image();
    this.img4.src = img[3];
    this.imgC = this.img

    this.velY = 0;
    this.velX = 0;
    this.speed = 5;
    this.friction = 0.98;
    this.keys = [];
    this.alturaEscalones = (canvas.height-120)
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.draw = function(){
        if(this.y <  this.alturaEscalones) this.y += 5;
        
        ctx.drawImage(this.imgC,this.x,this.y,this.width,this.height);
        // if(this.y < 0 || this.y > canvas.height - this.height){
        //     // gameOver();
        // }
        this.velY *= this.friction;
        this.y += this.velY;
        this.velX *= this.friction;
        this.x += this.velX;

        if (this.x >= 600 - this.width) {
            this.x = 600 - this.width;
        } else if (this.x <= 100) {
            this.x = 100;
        }
    
        if (player.y > 495) {
            player.y = 495;
        } else if (player.y <= 5) {
            player.y = 5;
        }
    }

    this.move = function(){
    if (this.keys[32]) {
        this.imgC = this.img4
        this.width = 80
       if((this.x+this.width) > (canvas.width-100-this.width))this.x = canvas.width - 100 - this.width;
        if (this.velY > -this.speed) {
            this.velY=-20;
        }
    }

   
    if (this.keys[39]) {
        if(this.y < this.alturaEscalones - 5){
            this.imgC = this.img4;
            this.width = 80;
        }
        else if(this.y >= this.alturaEscalones){
            this.imgC = this.img3;
            this.width = 40;}
        if (this.velX < this.speed) {
            this.velX++;
        }
    }
    if (this.keys[37]) {
        if(this.y < this.alturaEscalones -5 ){
            this.imgC = this.img4;
            this.width = 80;
        }
        else if(this.y >= this.alturaEscalones){
            this.imgC = this.img2;
            this.width = 40;}
        if (this.velX > -this.speed) {
            this.velX--;
        }
    }
    }
    // this.jump = function(){
    //     this.imgC = this.img4
    //     this.y -=20;
    //     this.width = 80
    //     if((this.x+this.width) > (canvas.width-100-this.width))this.x = canvas.width - 100 - this.width;
    // }
    // this.moveLeft = function(){
    //     this.imgC = this.img2
    //     
    //    this.width = 40;
       
    // }

    // this.moveRight = function(){
    //     this.imgC = this.img3
    //     this.width = 40;
    //     if(this.x < canvas.width - 100 - this.width) this.x +=5;
        
    // }
    

    // this.isTouching = function(pipe){
    //     return (this.x < pipe.x + pipe.width) &&
    //             (this.x + this.width > pipe.x)&&
    //             (this.y < pipe.y + pipe.height)&&
    //             (this.y + this.height > pipe.y);

    // }


    

}

// //pipes

// function Pipe(y,height){
//     this.x = canvas.width;
//     this.y = y;
//     this.width = 50;
//     this.height=height;

//     this.draw = function(){
//         this.x --;
//         ctx.fillStyle = "green"; 
//         ctx.fillRect(this.x,this.y,this.width,this.height);
//     }


// }





// //aux function
// function generatePipes(){
//         if(!(frames % 200 === 0))return;
//         var ventana = Math.floor(Math.random()*100)+50;
//         var randomHeight = Math.floor(Math.random()* 200 ) + 50;
//         var pipe = new Pipe(0,randomHeight);
//         var pipe2 = new Pipe(randomHeight+ventana ,canvas.height-(randomHeight+ventana));
//         pipes.push(pipe);
//         pipes.push(pipe2);
// }

// function drawPipes(){
//     pipes.forEach(function(pipe){
//         pipe.draw();
//     })
// }

// function gameOver(){
//     stop();
//     ctx.fillStyle = "red";
//     ctx.font = "100px courier";
//     ctx.fillText("Game Over", 100,130);
// }

// //funcion de validacion

// function checkCollition(){
//     pipes.forEach(function(pipe){
//        if(flappy.isTouching(pipe)) gameOver();
//     })
// }



//main function

function update(){
    // generatePipes();
    frames ++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    tablero.drawPared();
    // drawPipes();
    
    tablero.drawScore();
    tablero.drawTimer();
    batman.move();
    batman.draw();
    // checkCollition();
}

function start(){
    //extras que necesitemos inicializar
   
    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update();  
    } , 1000/60)
    // pipes=[]
    // flappy.y = 150;
    frames = 0;
    
}

function stop(){
    // tablero.music.pause();
    clearInterval(intervalo);
    intervalo = 0;
    
    
}

//listeners (observadores)

//comienza el juego

document.getElementById("startButton")
    .addEventListener("click",function(){
        start();
    })
document.getElementById("pauseGame")
    .addEventListener("click",function(){
        stop();
    })

// addEventListener("keydown",function(e){
//     if(e.keyCode===37){
//         batman.moveLeft();
//     }
   
//     if(e.keyCode===39){
//         batman.moveRight();
//     }
//     if(e.keyCode===32){
//         batman.jump();
//     }

// })


document.body.addEventListener("keydown", function (e) {
    batman.keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    batman.keys[e.keyCode] = false;
});