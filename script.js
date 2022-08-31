var can=document.querySelector("canvas");
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext("2d");
// score and points
var level=0;
var score=0;
var points=0;

// Game Arena

const XOFGAMESTART=500;
const YOFGAMESTART=100;
const WIDTHOFGAME=400;
const HEIGTHOFGAMESPACE=500;
const HEIGTHOFGAME=800;
const NUMBEROFPARTITIONS=2;
const WIDTHOFPART1=WIDTHOFGAME/2;
const YOFREDLINE=0.8*HEIGTHOFGAME;


///

const LEVEL1_SCOREREQUIRED=1;
const LEVEL2_SCOREREQUIRED=10;
const LEVEL3_SCOREREQUIRED=15;
const LEVEL4_SCOREREQUIRED=20;
function levelDecider(){
    if(points>LEVEL1_SCOREREQUIRED){
        level=1;
        COLORSSET.push('pink');
        console.log(COLORSSET);
        NUMBEROFCOLORS+=1;

    }
    
}


///



var COLORKEYSET=['s','d']

function drawLevelAndPointTable(){
    c.font ="30px Comic Sans MS";
    c.fillStyle = 'black';
    c.fillText('Level :'+level,100,100);

    c.font ="30px Comic Sans MS";
    c.fillStyle = 'black';
    c.fillText('points :'+points,100,150);
}
function drawBackGround(){

    c.beginPath();
    c.moveTo(XOFGAMESTART,YOFGAMESTART);
    c.lineTo(XOFGAMESTART+WIDTHOFGAME,YOFGAMESTART);
    c.lineTo(XOFGAMESTART+WIDTHOFGAME,YOFGAMESTART+HEIGTHOFGAME);
    c.lineTo(XOFGAMESTART,YOFGAMESTART+HEIGTHOFGAME);
    c.lineTo(XOFGAMESTART,YOFGAMESTART);
    c.strokeStyle='black';
    c.stroke();
    
    //
    c.beginPath();
    c.moveTo(XOFGAMESTART+WIDTHOFPART1,YOFGAMESTART);
    c.lineTo(XOFGAMESTART+WIDTHOFPART1,YOFGAMESTART+HEIGTHOFGAME);
    c.strokeStyle='black';
    c.stroke();
    
    // RED LINE
    
    c.beginPath();
    c.moveTo(XOFGAMESTART/2,YOFGAMESTART+YOFREDLINE);
    c.lineTo(XOFGAMESTART/2+WIDTHOFGAME*2,YOFGAMESTART+YOFREDLINE);
    c.strokeStyle='red';
    c.stroke();
}

// BLOCKS
const WIDTHOFBLOCK=WIDTHOFPART1;
const HEIGTHOFBLOCK=WIDTHOFPART1;//+10;
var blocks=[[0,0,0]];

function drawSingleBlock(x,y,color){
    var width=WIDTHOFBLOCK;
    var heigth=HEIGTHOFBLOCK;
    if(x!=0 && y!=0 && color!=0){
        c.fillStyle=color;
        c.fillRect(x,y,width,heigth); 

    }   
}

function drawAllBlocks(){
    for(let i=0;i<blocks.length;i++){
        drawSingleBlock(blocks[i][0],blocks[i][1],blocks[i][2]);
    }


}

function remove(i){
    blocks.splice(i,1);
}


function outOfFrameBlocks(){
    for(var i=1;i<blocks.length;i++){
        if((blocks[i][2]!=0) &&blocks[i][1]>(YOFGAMESTART+HEIGTHOFGAME)){
            remove(i);
        }
    }
}

var COLORSSET=['blue','green'];//,'pink','yellow'];

var timeOfLastBlockCall=0;
var NUMBEROFCOLORS=2;
function addBlock(){
    var col= Math.floor(Math.random() * NUMBEROFCOLORS);
    var rownum= Math.floor(Math.random() * NUMBEROFPARTITIONS); 
    var newBlock=[0,0,0];
    var x=XOFGAMESTART;
    var y=YOFGAMESTART;
    if(col==0){
        newBlock[0]=x;
        newBlock[1]=y;
    }
    else if(col==1){
        newBlock[0]=x+WIDTHOFPART1;
        newBlock[1]=y;
    }
    if(rownum==0){
        newBlock[2]=COLORSSET[0];
    }
    else if(rownum==1){
        newBlock[2]=COLORSSET[1];
    }
    blocks.push(newBlock);
    timeOfLastBlockCall = new Date().getTime();

}

const XOFBUTTONS=XOFGAMESTART+WIDTHOFGAME+40;
const XDIIFERENCEOFCOLORNAMES=40;
// center of first button
const YOFFIRSTBUTTON=200;

// distance between consecutive centers 
const SPACEBETWEENBUTTONS=100;

// radius of each button
const RADIUSOFEACHBUTTON=30;

var lengthOfColorSet=COLORSSET.length;


function drawButton(x,y,r,color,colorKey){
    c.beginPath();
    c.arc(x, y,r, 0, 2 * Math.PI, false);
    c.fillStyle = color;
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = '#000';
    c.stroke();

    c.font = '30px calibri';//"30px Comic Sans MS";
    c.fillStyle = color;
    c.fillText(colorKey, x+XDIIFERENCEOFCOLORNAMES,y);

    //c.textAlign = "center";
    //c.fillText(color, x+XDIIFERENCEOFCOLORNAMES,y);
}


function drawButtons(){
    for(let i=0;i<lengthOfColorSet;i++){
        drawButton(XOFBUTTONS,YOFFIRSTBUTTON+i*SPACEBETWEENBUTTONS,RADIUSOFEACHBUTTON,COLORSSET[i],COLORKEYSET[i]);
        
    }

}

function draw(){
    drawBackGround();
    drawAllBlocks();
    drawButtons();
    drawLevelAndPointTable();
}

const VELOCITYOFBLOCKS=5;
const MINIMUMSEPERATIONBETWEENTWOBLOCKSINDIFFERENTLINE=10;
const MINIMUMTIMEGAPBETWEENTWOBLOCKS=500*MINIMUMSEPERATIONBETWEENTWOBLOCKSINDIFFERENTLINE/VELOCITYOFBLOCKS;
function updateBlocksVelocities(){
    for(let i=0;i<blocks.length;i++){
        blocks[i][1]+=VELOCITYOFBLOCKS;
    }
}

function updateBlocks(){
    // time now
    var timeNow = new Date().getTime();
    var diffTime=timeNow-timeOfLastBlockCall;
    if(diffTime>MINIMUMTIMEGAPBETWEENTWOBLOCKS){
        addBlock();
    }                       
    outOfFrameBlocks();
    updateBlocksVelocities();
}

var kill=-1;
document.addEventListener('keydown', (event) => {
    if(event.key=='s'){
        // kill first color
        kill=0;
        //points increment
       // points=points+1;
    }
    else if(event.key=='d'){
        // kill second color
        kill=1;
        //points increment
       // points=points+1;
    }
        }

)

function updateBlockHit(){
    for(i=0;i<blocks.length;i++){
        if(blocks[i][1]>=YOFREDLINE){
            if(blocks[i][2]==COLORSSET[0] && kill==0){
                remove(i);
                points=points+1;
                kill=-1;
            }
            if(blocks[i][2]==COLORSSET[1] && kill==1){
                remove(i);
                points=points+1;
                kill=-1;
            }
        }
    

    }
}


function clearLevelAndPointsTable(){
c.clearRect(0,0,can.width,can.height);
}


function update(){
    c.clearRect(XOFGAMESTART,YOFGAMESTART,WIDTHOFGAME,HEIGTHOFGAME);
    updateBlocks();
    updateBlockHit();
    clearLevelAndPointsTable();
    killPlayer();
}

function stopGame(){
    console.log("gameOver");

}

function killPlayer(){
    for(let i=0;i<blocks.length;i++){
        if((blocks[i][1])>HEIGTHOFGAME){
           // block[i][2]='black';
            //remove(i);
            stopGame();
        }
    }
}

function main(){
   // drawBackGround();
   var time=new Date().getTime();
    requestAnimationFrame(main);
    score=Math.floor((time-timeOfGameStart)/100);
    update();
    draw();
    levelDecider();
    console.log();
}

var timeOfGameStart=0;
function game(){
    timeOfGameStart=new Date().getTime();
    main();
}

game();




