status = false;
objects = [];
objectName = "";
function preload() {

}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(400, 260);
    cam = createCapture(VIDEO);
    cam.hide();
    coco = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
    console.log("Guess what... Model is Loaded!!!!!!!!!!!!!!!!!!!");
    status = true;
}
function gotResult(error, result)
{
if(error){
    console.log(error);
}
else{
    console.log(result);
    objects = result;
}
}
function start() {
    document.getElementById("stats").innerHTML = "Status: Detecting Objects";
    objectName = document.getElementById("object_inp").value;
}
function draw() {
    image(cam, 0, 0, 600, 400)

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        coco.detect(cam,gotResult);
        for(i=0; i < objects.length; i++){
        document.getElementById("stats").innerHTML = "Status: Objects Detected";
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        if(objects[i].label == objectName){
            cam.stop();
            coco.detect(gotResult);
            document.getElementById("foundo").innerHTML = objectName + " was found";
            synth = window.speechSynthesis;
            utter = new SpeechSynthesisUtterance(objectName + " is Found");
            synth.speak(utter);
        }
        else{
            document.getElementById("foundo").innerHTML = objectName + " not found";
        }
        }
    }
    }


