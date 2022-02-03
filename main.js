Status="";
objects=[];
song="";
function preload(){
song = loadSound("mixkit-facility-alarm-908.wav");
}

function setup(){
canvas= createCanvas(380,380);
canvas.center();

video=createCapture(VIDEO);
video.hide();

objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
document.getElementById("status").innerHTML="Status : Detecting for Baby";
}

function modelLoaded(){
    console.log("model loaded");
    Status=true;
}



function gotResult(error , results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
image(video,0,0,380,380);

if(Status != ""){
    objectDetector.detect(video , gotResult);
    r = random(255);
    g = random(255);
    b = random(255);

    for(i=0; i<objects.length; i++){
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        if(objects[i].label == "person"){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("fnd_nfnd").innerHTML="Baby Found";
            song.stop();
            }
            else{
                document.getElementById("fnd_nfnd").innerHTML="Baby Not Found";
                document.getElementById("status").innerHTML = "Status : Object Detected";
                song.play();
            }
    }
}
}
