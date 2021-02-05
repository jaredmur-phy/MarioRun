function start() {                                              //So the game won't start until the Canvas is in focus
    var bottom = document.getElementById("myCanvas0");          //Set up for the second canvas to avoid epileptic fits

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    var row1 = 0, row2 = 0, row3 = 0;                           //These variables are going to be used to check how many dogs are in each row

    var parent = document.getElementById("div1");               //This is setting up for the "GAME OVER" screen when the game ends
    var child = document.getElementById("myCanvas");
    var child0 = document.getElementById("myCanvas0");

    var marioRun = new Image();                                 //Set up for the mario sprite cycle
    marioRun.src = "marioRun.png";
    var marioW = 14, marioH = 18, marioX = 5, marioY = 20;

    var background = new Image();                               //Set up for the background image
    background.src = "mariobackground.png";
    
    background.onload = function(){                             //More set up for the two-part canvas
        var bottomCtx = bottom.getContext("2d");
        bottomCtx.drawImage(background, 0, 0);
    }

    var doggoRun = new Image();                                 //Dog sprite cycle set up
    doggoRun.src = "doggo.png";
    var doggoW = 22, doggoH = 19;

    var event = document.getElementById("myCanvas");                //Variable set up for the arrow key events

    var audio = new Audio("mario.mp3");                             //Set up for the background music
    audio.play();

    var time = 0, placement = 0;                                   //Initalizing timer and generator variables

    marioRun.onload = function() {                                  //Initalizing the mario sprite cycle function
        var cycle = 0;
        marioInterval = setInterval(function() {
            ctx.clearRect(marioX, marioY, 14, 18);                  //Draws the dividing lane lines
            ctx.setLineDash([5, 3]);
            ctx.beginPath();
            ctx.moveTo(0,20);
            ctx.lineTo(200, 20);
            ctx.moveTo(0, 40);
            ctx.lineTo(200, 40);
            ctx.stroke();
            ctx.drawImage(marioRun, cycle*marioW, 0, marioW, marioH, marioX, marioY, marioW, marioH);   //Draws mario, and cycles through the sprite sheet
            cycle = (cycle+1) % 3;
        }, 150);                                                                                        //Waits 150ms before moving to the next sprite image
}

    doggoRun.onload = function(doggoX, doggoY) {                                //Initalizes the dog sprite cycle, but will only run when envoked by the random number generator
        var cycle = 0;
        var doggoInterval = setInterval(function() {
        if(doggoX >= -22) {
            ctx.clearRect(doggoX, doggoY, 27, 19);
            ctx.drawImage(doggoRun, cycle*doggoW, 0, doggoW, doggoH, doggoX, doggoY, doggoW, doggoH);
            cycle = (cycle+1) % 2;
            doggoX -= 5;
                if ((doggoY == 0) && (doggoX == 0) && (marioY == 0)) {                     //Checks for colission in each of the lanes
                    clearInterval(timer);
                    clearInterval(doggoInterval);
                    clearInterval(marioInterval);
                    var para = document.createElement("p");                                //If there is colission, the game will replace the canvas with GAME OVER text
                    var node = document.createTextNode("GAME OVER");
                    para.appendChild(node);
                    var parent = document.getElementById("div1");
                    var child = document.getElementById("myCanvas");
                    parent.removeChild(child0);
                    parent.replaceChild(para, child);
                } else if((doggoY == 20) && (doggoX == 0) && (marioY == 20)) {
                    clearTimeout(timer);
                    clearInterval(doggoInterval);
                    clearInterval(marioInterval);
                    var para = document.createElement("p");
                    var node = document.createTextNode("GAME OVER");
                    para.appendChild(node);
                    var parent = document.getElementById("div1");                        var child = document.getElementById("myCanvas");
                      parent.removeChild(child0);
                    parent.replaceChild(para, child);
                } else if((doggoY == 40) && (doggoX == 0) && (marioY == 40)) {
                    clearTimeout(timer);
                    clearInterval(doggoInterval, 9);
                    clearInterval(marioInterval, 1);
                    var para = document.createElement("p");
                    var node = document.createTextNode("GAME OVER");
                    para.appendChild(node);
                    var parent = document.getElementById("div1");
                    var child = document.getElementById("myCanvas");
                    parent.removeChild(child0);
                    parent.replaceChild(para, child);
                }
        } else {
            clearInterval(doggoInterval);
            if(doggoY == 0)
                row1--;
            else if(doggoY == 20)
                row2--;
            else if(doggoY == 40)
                row3--;
        }
    }, 70);
}

    event.onkeydown = function(evt) {                           //This function checks for arrowkey presses
        if(evt.keyCode == 38) {
            ctx.clearRect(marioX, marioY, 14, 18);
            if(marioY > 0) {                                    //Mario is constrained to stay on the visible part of the canvas
                marioY -= 20;
            } else {
                marioY = 0;
            }
        } else if(evt.keyCode == 40) {
            ctx.clearRect(marioX, marioY, 14, 18);
            if(marioY < 40) {
                marioY += 20;
            } else {
                marioY = 40;
            }
        }
    }

    var timer = setInterval(function() { myTimer() }, 500);                            //This function will keep track of score, and also generate a new dog each cycle
    
     function myTimer() {
        time = (time + 1);
        document.getElementById("score").innerHTML = "<b>Your Score: <b>" + time;  //Score updating
        placement = Math.floor((Math.random() * 3) + 1);                           //Generating a random number, and will change the X and Y coordinates of the dog
        if(placement == 1 && row1 < 3) {
            doggoRun.onload(200, 0);
            row1++;
        } else if(placement == 2 && row2 < 3) {
            doggoRun.onload(200, 20);
            row2++;
        } else if(placement == 3 && row3 < 3) {
            doggoRun.onload(200, 40);
            row3++;
        }
    }
}

function restart() {                                                                //Simple button to reset the page since I don't have a more elegant solution
    location.reload();
}