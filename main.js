prediction = "";

Webcam.set({
   width:350,
   height:300,
   image_format:'png',
   png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("output").innerHTML = '<img id="CapturedImage" src=" '+data_uri+' "/>';
    });
}

console.log('ml5version: ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lLQ19FEQI/model.json', model_loaded);

function model_loaded(){
    console.log('model loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The first prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}

function check(){
 img = document.getElementById("CapturedImage");
 classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if (results[0].label == "Amazing"){
            document.getElementById("gesture").innerHTML = "&#128076;";
        }

        if (results[0].label == "Like"){
            document.getElementById("gesture").innerHTML = "&#128077;";
        }

        if (results[0].label == "Dislike"){
            document.getElementById("gesture").innerHTML = "&#128078;";
        }

        if (results[0].label == "Rock"){
            document.getElementById("gesture").innerHTML = ">&#129304;";
        }

        if (results[0].label == "Victory"){
            document.getElementById("gesture").innerHTML = "&#9996;";
        }

    }
}