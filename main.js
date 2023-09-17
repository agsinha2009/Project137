status="";
object_searched="";
var objects=[];

const synth=window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance("Object found");

function setup(){
    canvas=createCanvas(480,380);
    canvas.position(650,300);
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(status!=""){
        objectDetector.detect(video,gotResults)   

        for(i=0;i<objects.length;i++){
            document.getElementById("number").innerHTML="Number of detected objects= "+objects.length;
            document.getElementById("object_name").innerHTML="Name of object= "+objects[i].label;

            percent=floor(objects[i].confidence+100);

            object_searched=document.getElementById("input_box").value;
            if(objects[i].label==object_searched){

            fill("red");
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

           video.stop();
           objectDetector.detect(gotResults);
           synth.speak(utterThis);

            }

        }
     }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting object";
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}