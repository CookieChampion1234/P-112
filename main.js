var prediction_1 = " "
var prediction_2 = " "

Webcam.set({
    widhth:350,
    height:300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}

console.log("ml5 version", ml5.version);

classifier = imageClassifier("https://teachablemachine.withgoogle.com/models/NnyhkHaUC/model.json" ,modelLoaded);

function modelLoaded() {
    console.log("Model Loaded")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult() {
    if (error){
        console.log(error)
    } else {
        console.log(results);
        document.getElementById('result_emoji_name').innerHTML = results[0].label;
        document.getElementById('result_object_name').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediicition_2 = results[1].label;
        speak();
        if(results[0].label == 'Thumbs Up'){
            document.getElementById('updated_emoji').innerHTML = '&#128077'
        }
        if(results[0].label == 'Thumbs Down'){
            document.getElementById('updated_emoji').innerHTML = '&#128078'
        }
        if(results[0].label == 'Peace'){
            document.getElementById('updated_emoji').innerHTML = '&#9996'
        }
        if(results[0].label == 'Applaude'){
            document.getElementById('updated_emoji').innerHTML = '&#128075'
        }
        if(results[0].label == 'Perfect'){
            document.getElementById('updated_emoji')
        }
    }
}