var chatbox = document.getElementById("chatbox")

const canvas = document.querySelector('.visualizer');
let audioCtx;
const canvasCtx = canvas.getContext("2d");

var audioRecordButton = document.getElementById("audio-record")
audioRecordButton.onclick = recordAudio

var audioResetButton = document.getElementById("audio-reset")
if (typeof(audioResetButton) != 'undefined' && audioResetButton != null){
  audioRecordButton.disabled=true
  audioResetButton.onclick = resetAudio
}

var audioStopButton = document.getElementById("audio-stop")
audioStopButton.onclick= stopAudio
audioStopButton.disabled=true

var sendMsgButton = document.getElementById("send-msg")
if (typeof(sendMsgButton) != 'undefined' && sendMsgButton != null){
  sendMsgButton.onclick = sendMsg
}

var alertText = document.getElementById("error-alert")

var transcriptionStatus = document.getElementById("transcription-status")

const constraints = {
    audio: true,
  }

var mediaRecorder
var chunks

//main block for doing the audio recording
  
function visualize(stream) {
    if(!audioCtx) {
            audioCtx = new AudioContext();
          }
        
          const source = audioCtx.createMediaStreamSource(stream);
        
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 2048;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
        
          source.connect(analyser);
          //analyser.connect(audioCtx.destination);
          draw()        

    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;
  
      requestAnimationFrame(draw);
  
      analyser.getByteTimeDomainData(dataArray);
  
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  
      canvasCtx.beginPath();
  
      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
  
  
      for(let i = 0; i < bufferLength; i++) {
  
        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;
  
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
  
    }
  }
  
  window.onresize = function() {
    canvas.width = chatbox.offsetWidth;
  }
  
  window.onresize();


function recordAudio(){
    if (navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');

        chunks = [];
      
        let onSuccess = function(stream) {
          mediaRecorder = new MediaRecorder(stream);  
          canvas.hidden = false;
          visualize(stream);
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          audioRecordButton.style.background = "red";
      
          audioStopButton.disabled = false;
          audioRecordButton.disabled = true;
      
          mediaRecorder.onstop = async function(e) {
            console.log("recorder stopped");
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = []; 
            await sendAudioBlob(blob)

          }
      
          mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
          }
        }
      
        let onError = function(err) {
          console.log('The following error occured: ' + err);
        }
      
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      
      } else {
         console.log('getUserMedia not supported on your browser!');
      }     
}


function resetAudio(){
    console.log("resetting audio recorder")
    var recordedAudio = document.getElementById("recorded-audio")
    recordedAudio.remove();
    audioRecordButton.disabled=false
}

function stopAudio(){
    console.log("stopping audio recorder")
    audioRecordButton.disabled=true;
    transcriptionStatus.classList.remove("hideElement");
    audioStopButton.disabled = true;
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    console.log("recorder stopped");
    audioRecordButton.style.background = "";
    audioRecordButton.style.color = "";
            // mediaRecorder.requestData();    

}

function sendMsg(){
    console.log("sending msg.")
    var recordedText = document.getElementById("recordedText").textContent
    let renderData = {}
    renderData.textToComplete = recordedText
    renderTemplate(renderData)

}

async function sendAudioBlob(blob){

let renderData = {}

  var data = new FormData();
  data.append("audioFile", blob);
  await fetch("/audio", { method: "POST", body: data })
            .then(res => res.text())
            .then(text => renderData.recordedText=text)
  renderTemplate(renderData)
}

function renderTemplate(renderData) {

  const form = document.createElement('form');
  form.style.display = "none"
  form.method = "post";
  form.action = "/render";

  for (const [key, value] of Object.entries(renderData)) {
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    hiddenField.name =key;
    hiddenField.value = value;
    form.appendChild(hiddenField);
  } 
  document.body.appendChild(form);
  form.submit();


}