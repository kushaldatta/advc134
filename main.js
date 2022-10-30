//JS Code
var img = "";
var status = "";
var objects = [];

function preload() { 
    sound = loadSound("alarm.mp3");
}

function start() {
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function setup() {
    canvas = createCanvas(450, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 450, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status : Person Detected";
                sound.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status : Person Not Detected";
                sound.play();
            }
            if (objects[i].label < 0) {
                document.getElementById("status").innerHTML = "Status : Person Not Detected";
                sound.play();
            }
            fill(r, g, b);
            stroke(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        
    }
}

function modelLoaded() {
    console.log("Model Is Loaded.");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}