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

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
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
    
    if(Status!=true){
        document.getElementById("fnd_nfnd").innerHTML="Baby found";
        }
        else if(Status=true){
            document.getElementById("fnd_nfnd").innerHTML="Baby Not found";
            song=song.play();

    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
}
}
}