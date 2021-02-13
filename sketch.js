var ball;
var localDatabase, position;
function setup(){
    createCanvas(500,500);
    //we are connecting firebase's database to our program--- this will open real time database
    localDatabase=firebase.database();
    ball = createSprite(400,400,10,10);
    ball.shapeColor = "red";
    //ref -- refer the location from where the data needs to be read
    var ballPositionRef=localDatabase.ref("ball/position");
    //on -- continous listening/reading
    //value= {x:200, y:200} 
    ballPositionRef.on ("value",readData,showError);
}

function draw(){
    background("white");
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
  }
}

function writePosition(x,y){
    //ball.x=190+(-1)=189                       
    //ball.x = ball.x + x;
    //ball.y = ball.y + y;
    localDatabase.ref("ball/position").set({
        //x, y these are your database variables
        x:position.x+x,
        y:position.y+y
    })
}
//data = "value"= {x:200,y:200}
function readData(data){
//data.val -- it will fetch teh x and y values
// position.x- u will get x value
//position.y - u will get y value
position = data.val();
ball.x= position.x;
ball.y=position.y;
}

function showError(){
    console.log ("error");
}

/*ball 
---position
---x:200
y:200

this.body.position.x --- ball.position.x----ball/position/x*/