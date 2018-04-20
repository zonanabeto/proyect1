var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d");

// //declaraciones
var imagesBatman = ["./assets/BATMANPARADO.png","./assets/BATMAN LEFT.png","./assets/BATMAN RIGHT.png","./assets/BATMAN BRINCA.png"]
var imagesRobin = ["./assets/ROBINNORMAL.png","./assets/ROBINleft.png","./assets/ROBINRIGHT.png","./assets/ROBIN JUMPS.png"]

var tablero = new Board();
var batman = new Personajes(imagesBatman);
var robin = new Personajes(imagesRobin);

var scores1 = [];

var player1 = false;
var player2 = false;
var startGames = false;




var plats =[];
var intervalo = 0;
var frames = 0;
var globalScore = 0;

var plaIni1 = new IntitialP(0);
var plaIni2 = new IntitialP(100);
var plaIni3 = new IntitialP(200);
var plaIni4 = new IntitialP(300);
var plaIni5 = new IntitialP(400);
var plaIni6 = new IntitialP(500);
var plaIni7 = new IntitialP(-100);
var plaIni8 = new IntitialP(-200);



plats.push(plaIni1,plaIni2,plaIni3,plaIni4,plaIni5,plaIni6,plaIni7,plaIni8);


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
    this.music = new Audio();
    this.music.src = "assets/editada.mp3" 
    
    
    this.pared = new Image();
    this.pared.src ="./assets/pared.jpg";
    
    this.img.onload = function(){
        this.draw();
        this.drawPared();
    }.bind(this);

    this.move= function(){
        this.score = globalScore;
        if(this.score<60 && this.score >= 5)this.y++;
        if(this.score>=60 && this.score < 120)this.y +=2;
        if(this.score>=120 && this.score < 180)this.y +=3;
        if(this.score>=180 && this.score < 240)this.y +=4;
        if(this.score>=240 )this.y +=6;

        if(this.y > canvas.height) this.y = 0;
    }

    this.drawScore = function(){

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
        this.drawPared();
        

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
    this.y = canvas.height - 200;
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
    this.friction = 0.8;
    this.gravity = 0.98;
    this.jumpStrength =  5;
    this.grounded = false;
    this.jumping = false;
    this.jumping2 = false;

    this.keys = [];
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);


    this.jump =function(){
        if(this.keys[38] || this.keys[32]){
            if(this.jumping) return;
            this.jumping = true;
            this.imgC = this.img4
            this.width = 80
            if((this.x + this.width) > (canvas.width - 100 + this.width)) this.x = (canvas.width - 100 - this.width);
            this.velY = -this.jumpStrength*4
            return true;
          }else {return false}
        }

        this.jump2 =function(){
            if(this.keys[87] || this.keys[83]){
                if(this.jumping2) return;
                this.jumping2 = true;
                this.imgC = this.img4
                this.width = 80
                if((this.x + this.width) > (canvas.width - 100 + this.width)) this.x = (canvas.width - 100 - this.width);
                this.velY = -this.jumpStrength*4
                return true;
              }else {return false}
            }



    this.move = function(){
 
    if(this.keys[39]){
        if (this.jump()){
            this.imgC = this.img4
        }else {this.imgC = this.img3}
        this.width = 50;
        if(this.velX < this.speed){
          this.velX++;
        }
    }
      if(this.keys[37]){
        if (this.jump()){
            this.imgC = this.img4
        }else {this.imgC = this.img2}
        this.width = 50;
        if(this.velX > -this.speed){
          this.velX--;
        }
      }
   
    }

    this.move2 = function(){
 
        if(this.keys[68]){
            if (this.jump()){
                this.imgC = this.img4
            }else {this.imgC = this.img3}
            this.width = 50;
            if(this.velX < this.speed){
              this.velX++;
            }
        }
          if(this.keys[65]){
            if (this.jump()){
                this.imgC = this.img4
            }else {this.imgC = this.img2}
            this.width = 50;
            if(this.velX > -this.speed){
              this.velX--;
            }
          }
       
        }

    

    this.draw = function(){

        this.jump();
        this.move();
      

        this.x += this.velX;
        this.velX *= this.friction;
     //jump
       this.y += this.velY;
       this.velY += this.gravity;
        
        ctx.drawImage(this.imgC,this.x,this.y,this.width,this.height);
       

        if (this.x >= 600 - this.width) {
            this.x = 600 - this.width;
        } else if (this.x <= 100) {
            this.x = 100;
        }

        
    
    }
    this.draw2 = function(){

        this.jump2();
        this.move2();
      

        this.x += this.velX;
        this.velX *= this.friction;
     //jump
       this.y += this.velY;
       this.velY += this.gravity;
        
        ctx.drawImage(this.imgC,this.x,this.y,this.width,this.height);
       

        if (this.x >= 600 - this.width) {
            this.x = 600 - this.width;
        } else if (this.x <= 100) {
            this.x = 100;
        }

        
    
    }

}

// plataforma

function Plataforma(x,width){
    this.x = x;
    this.width = width;
    this.height=30;
    this.y = 0 - this.height;
    this.score = 0 ;
    this.img = new Image();
    this.img.src = "./assets/Captura de pantalla 2018-04-18 a la(s) 5.51.25 p. m..png"

    this.draw = function(){
        this.score = globalScore;

        if(this.score<60 && this.score >= 5){this.y ++}
        else if(this.score>=60 && this.score < 120){this.y +=2}
        else if(this.score>=120 && this.score < 180){this.y +=3}
        else if(this.score>=180 && this.score < 240){this.y +=4}
        else if(this.score>=240 ){this.y +=6};

       
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
       
    }

    

   


}



function IntitialP(y){

    this.x = 200;
    this.width = 200;
    this.height=30;
    this.y = y;
    this.score = 0 ;
    this.img = new Image();
    this.img.src = "./assets/Captura de pantalla 2018-04-18 a la(s) 5.51.25 p. m..png"

    this.draw = function(){
       this.y ++
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }

    this.img.onload = function(){
        this.draw();
    }.bind(this);

}





// aux function
function generatePlat(){
    
        if(!(frames % 80 === 0))return;
        var randomWidth = Math.floor(Math.random()* 200 ) + 50;
        var randomX = 100 + Math.floor(Math.random()*(500 -randomWidth)) 
        var plat = new Plataforma(randomX,randomWidth);
        plats.push(plat);
}

function generatePlat2(){
    
    if(!(frames % 3600 === 0))return;
    var randomWidth = Math.floor(Math.random()* 200 ) + 50;
    var randomX = 100 + Math.floor(Math.random()*(500 -randomWidth)) 
    var plat2 = new Plataforma(100,500);
    plats.push(plat2);
}

function drawPlats(){
    plats.forEach(function(plat){
        plat.draw();
    })
    
}





function gameOver(){
    stop();
    console.log(scores1[0])

    ctx.fillStyle= "gray";
    ctx.fillRect(100,100,500,300);
    ctx.fillStyle ="black";
    ctx.lineWidth=10;
    ctx.strokeRect(100,100,500,300)
    


    ctx.fillStyle = "red";
    ctx.font = "100px Black Han Sans";
    ctx.fillText("You Lost", 110,200);
    ctx.fillStyle = "red";
    ctx.font = "50px Black Han Sans";
    ctx.fillText("Your Score:  " + scores1[0], 110,300);
    ctx.fillStyle = "blue";
    ctx.font = "50px Black Han Sans";
    ctx.fillText("Press R to reload", 110, 380);
}


function checkCollition(beto){

    beto.grounded = false;
    plats.forEach(function(plat){
    var direction = collisionCheck(beto, plat);
    if(direction == "left" || direction == "right"){
      //beto.velX *= -1;
    }else if(direction == "bottom"){
      beto.jumping = false;
      beto.jumping2=false;
      beto.grounded = true;
      //player.velY = -player.jumpStrength*2
    }else if(direction == "top"){
      //player.velY *= -1;
    }
  });
  
  if(beto.grounded){
    beto.velY = 0;
  }
  
}
 
//funcion de collision

function collisionCheck(char, plat){
    var vectorX = (char.x + (char.width/2)) - (plat.x + (plat.width/2));
    var vectorY = (char.y + (char.height/2)) - (plat.y + (plat.height/2));
    
    var halfWidths = (char.width/2) + (plat.width/2);
    var halfHeights = (char.height/2) + (plat.height/2);
    
    var collisionDirection = null;
    
    if(Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights){
      var offsetX = halfWidths - Math.abs(vectorX);
      var offsetY = halfHeights - Math.abs(vectorY);
      if(offsetX < offsetY){
        if(vectorX > 0){
          collisionDirection = "left";
          //char.x += offsetX;
        }else{
          collisionDirection = "right";
          //char.x -= offsetX;
        }
      }else{
        if(vectorY > 0){
          collisionDirection = "top";
          //char.y += offsetY;
        }else{
          collisionDirection = "bottom";
          char.y -= offsetY;
        }
      }
    }
    return collisionDirection;
    
}




//main function

function update(){

    if (frames % 60 ===0) {
        globalScore++
    }
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    tablero.draw();
    generatePlat();
    generatePlat2();
    drawPlats();
    tablero.drawScore();
    tablero.drawTimer();
    batman.draw();
    checkCollition(batman);
    scores1.unshift(tablero.score);
    if(batman.y > canvas.height + batman.height){
        gameOver();
    }

}
function update2(){

    if (frames % 60 ===0) {
        globalScore++
    }
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    tablero.draw();
    generatePlat();
    generatePlat2();
    drawPlats();
    tablero.drawScore();
    tablero.drawTimer();
    batman.draw();

    robin.draw2();
    checkCollition(robin);
    checkCollition(batman)
    scores1.unshift(tablero.score);
    if(batman.y > canvas.height + batman.height && robin.y > canvas.height + robin.height){
        gameOver();
    }
}

function start(){
    //extras que necesitemos inicializar
   
    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update();  
    } , 1000/60)
    // pipes=[]
    tablero.music.play();
    
    
    
}

function start2(){
    //extras que necesitemos inicializar
   
    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update2();  
    } , 1000/60)
    // pipes=[]
    tablero.music.play();
    
    
    
}

function stop(){
   
    clearInterval(intervalo);
    intervalo = 0;
    tablero.music.pause();
    
}

//listeners (observadores)

//comienza el juego

document.getElementById("startButton")
    .addEventListener("click",function(){
        startGames = true;
        startGame();
    })


document.getElementById("pauseGame")
    .addEventListener("click",function(){
        stop();
    })

document.getElementById("onePlayer")
.addEventListener("click",function(){
    console.log("onePlayer")
    player1 = true;
    player2 = false;
    })

document.getElementById("twoPlayers")
.addEventListener("click",function(){
    console.log("twoPlayer")
        player1 = false;
        player2 = true;
        })



function startGame(){

    if(player1===true && startGames === true){
        start();
    }else if(player2===true && startGames === true){
        start2();
    }else{
        ctx.fillStyle= "gray";
        ctx.fillRect(100,100,500,300);
        ctx.fillStyle ="black";
        ctx.lineWidth=10;
        ctx.strokeRect(100,100,500,300)
        ctx.fillStyle = "red";
        ctx.font = "30px Black Han Sans";
        ctx.fillText("Select number of  players...", 110,250);

    }
} 



//movimiento de jugadores

document.body.addEventListener("keydown", function (e) {
    robin.keys[e.keyCode] = true;
    batman.keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    robin.keys[e.keyCode] = false;
    batman.keys[e.keyCode] = false;
});

addEventListener('keydown',function(e){
    if(e.keyCode === 82){
        location.reload();
        event.preventDefault();
    }
 })