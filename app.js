//elements
const startbtn = document.getElementById('start')
const stopbtn = document.getElementById('stop')
const speakbtn = document.getElementById('speak')

// speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
//vr start
recognition.onstart = function(){
    console.log('Speech recognition started');
}
// vr result 
recognition.onresult=function (event){
    // console.log(event);
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    // console.log(transcript);
    readOut(transcript)
    
    
}


//vr stop
recognition.onend = function(){
    console.log('Speech recognition stoped');
}
//vr continous
recognition.continuous= true;


startbtn.addEventListener("click",()=>{
    recognition.start();
})
stopbtn.addEventListener("click",()=>{
    recognition.stop();
})

// friday speech
function readOut(message){
   const speech = new SpeechSynthesisUtterance(message);
   const getallVoice = window.speechSynthesis.getVoices();
   speech.text = message;
   speech.voice = getallVoice[4]
   speech.volume= 1;
   window.speechSynthesis.speak(speech)
   console.log("speaking out");
}
speakbtn.addEventListener("click",()=>{
    readOut("hii vivek i love you")
})
window.onload = function(){
 readOut("    ");
}