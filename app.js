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
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript=transcript.toLowerCase()
    console.log(`my words:${transcript}`);
    if(transcript.includes("hello friday")){
        readOut("hello sir")
    }
    //for youtube cammands 
    if(transcript.includes("open youtube")){
        readOut("opening youtube")
        window.open("https://www.youtube.com/")
    }
    //yt search cammand
    if(transcript.includes("play the")){
        readOut("here's the result:")
        let input = transcript.split("")
        input.splice(0,9)
        input.pop()
        input = input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.youtube.com/results?search_query=${input}`)
        

    }
    //for spotify desktop
    // https://open.spotify.com/album/013jUXOfDFXnDMBetTdsiH?si=LNgrkkjwSTKBXjbAJTrRHQ
    if(transcript.includes("open spotify")){
        readOut("opening spotify")
        window.open("https://open.spotify.com/album/013jUXOfDFXnDMBetTdsiH?si=LNgrkkjwSTKBXjbAJTrRHQ", "_blank");
    }

    // to search songs on browser
    if (transcript.includes("play song")) {
        readOut("Here's the result on Spotify:");
        let input = transcript.split("");
        input.splice(0, 10); // remove "play the"
        input.pop(); // remove final space or dot
        input = input.join("").split(" ").join("+");
    
        console.log(input);
    
        window.open(`https://open.spotify.com/search/${input}`, "_blank");
    }
    //for whatsapp web
    if(transcript.includes("open whatsapp")){
        readOut("opening whatsapp")
        window.open("https://web.whatsapp.com/")
    }

    
    //opning google
    if(transcript.includes("open google")){
        readOut("opening google")
        window.open("https://www.google.com/")
    }
    // google search cammand
    if(transcript.includes("search for")){
        readOut("here's the result:")
        let input = transcript.split("")
        input.splice(0,11)
        input.pop()
        input = input.join("").split(" ").join("+");
        console.log(input);
        window.open(`https://www.google.com/search?q=${input}`);
        

    }
    //gmail opning cammand
    if(transcript.includes("open gmail")){
     readOut("opening gmail")
     window.open("https://mail.google.com/mail/u/0/#inbox")



    }
    // if(transcript.includes("open firebase")|| transcript.includes("open fire base")){
    //     readOut("opening firebase")
    //     window.open("https://firebase.google.com/")
    // }
    //firebase with account feature
    if(transcript.includes("open firebase")&&transcript.includes("account")){
        readOut("opening firebase console")
        let accId = transcript;
        accId= accId.split("")
        accId.pop()
        accId = accId[accId.length - 1];
        console.log(`accId is :${accId}`);
        
        window.open(`https://console.firebase.google.com/?_gl=1*c7vqi3*_ga*NTY1OTE5Mzg3LjE3NDY2MTA2MjA.*_ga_CW55HF8NVT*czE3NDY2MTA2MTkkbzEkZzEkdDE3NDY2MTIxNDUkajIzJGwwJGgw`)
    }    
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