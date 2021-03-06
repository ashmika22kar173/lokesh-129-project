song = "";
song2 = "";
leftwristY = 0;
rightwristX = 0;
leftwristX = 0;
rightwristY = 0;
scoreleft = 0;
scoreright = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelloded);
    posenet.on('pose', gotresult);


}

function draw() {
    image(video, 0, 0, 500, 400);

    song1status = song.isPlaying();
    song2status = song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");


    if (scoreleft > 0.2) {
        circle(leftwristX, leftwristY, 20);
        song.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song Name = Peter Pan Song";
        }
    }
}


function modelloded() {
    console.log("modelloded");

}


function gotresult(results) {
    if (results.length > 0) {
        console.log(results);

        scoreleft = results[0].pose.keypoints[9].scoreleft;
        scoreright = results[0].pose.keypoints[10].scoreleft;
        console.log("scoreleft =" + scoreleft + "scoreright =" + scoreright);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightwrist.x;
        rightwristY = results[0].pose.rightwrist.y;

        console.log(" leftwrist = " + leftwrist + " rigthwrist = " + rightwrist);
    }
}