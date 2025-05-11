//elements
const startbtn = document.getElementById('start')
const stopbtn = document.getElementById('stop')
const speakbtn = document.getElementById('speak')
const turn_on = document.getElementById('turn_on')
const time = document.getElementById('times')
// const msgs =  document.querySelectorAll('.message')
// whether the recognition is stopiing on my command or automatically
let stopingR = false;



// friday command ?\
let fridayComs = [];
fridayComs.push("hi friday");
fridayComs.push("what are your commands");
fridayComs.push("close this - to close opened popups");
fridayComs.push(
  "change my information - information regarding your acoounts and you"
);
fridayComs.push("whats the weather or temperature");
fridayComs.push("show the full weather report");
fridayComs.push("are you there - to check fridays presence");
fridayComs.push("shut down - stop voice recognition");
fridayComs.push("open google");
fridayComs.push('search for "your keywords" - to search on google ');
fridayComs.push("open whatsapp");
fridayComs.push("open youtube");
fridayComs.push('play "your keywords" - to search on youtube ');
fridayComs.push("close this youtube tab - to close opened youtube tab");
fridayComs.push("open firebase");
fridayComs.push("open netlify");
fridayComs.push("open twitter");
fridayComs.push("open my twitter profile");
fridayComs.push("open instagram");
fridayComs.push("open my instagram profile");
fridayComs.push("open github");
fridayComs.push("open my github profile");
const jarvisbtn = document.getElementById('start_jarvis_btn').addEventListener("click",()=>{
  recognition.start()
})
document.querySelector("#stop_jarvis_btn").addEventListener("click", () => {
  stopingR = true;
  recognition.stop();

})

//weather setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
  
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(
          data.main.temp 
        )}`;
        weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
        weatherStatement = `sir the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };
  
    xhr.send();
  }
  
  // convert kelvin to celcius
  function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
  }
//   calling weather info
  weather("Mumbai")
  // date and time 
  // date and time
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();
  

// autojarvis 
function autojarvis() {
  setTimeout(() => {
    recognition.start()
  }, 1000);
}

window.onload=function(){
  turn_on.play();
// power on audio setup 
  let playedOnce = false;

  turn_on.addEventListener("onend",function(){
    setTimeout(() => {
      readOut("ready to go sir")
      if(localStorage.getItem("jarvis_setup")=== null){
        readOut("fill the information sir")
      }
    }, 200);
  })

//friday commands
fridayComs.forEach((e)=>{
 document.querySelector(".command").innerHTML += `<p>#${e}</p><br/>`;

})
//   // time setup 
// function updateClock() {
//     const now = new Date();
//     const timeStr = now.toLocaleTimeString();
//     document.getElementById("times").textContent = timeStr;
// }

// setInterval(updateClock, 1000);
// updateClock(); // Initial call
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  currentTime = strTime
  time.textContent = strTime
}

formatAMPM(date)
setInterval(() => {
  formatAMPM(date)
}, 60000);
//battery setup
navigator.getBattery().then(function(battery) {
    function updateBatteryStatus() {
        const batteryStatus = `${Math.round(battery.level * 100)}% ${battery.charging ? "🔌 Charging" : ""}`;
        document.getElementById("battery").textContent = batteryStatus;
    }

    updateBatteryStatus();

    // Update when charging status or level changes
    battery.addEventListener('chargingchange', updateBatteryStatus);
    battery.addEventListener('levelchange', updateBatteryStatus);
});
// internet setup 
function updateInternetStatus() {
    const internetStatus = navigator.onLine ? "🟢 Online" : "🔴 Offline";
    document.getElementById("internet").textContent = internetStatus;
}

// Initial check
updateInternetStatus();

// Listen for changes
window.addEventListener("online", updateInternetStatus);
window.addEventListener("offline", updateInternetStatus);
};

  //jarvis setup
  
  if (localStorage.getItem("jarvis_setup") !== null) {
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
  // jarvis info setup 
  const setup = document.querySelector('.jarvis_setup')
  setup.style.display = "none"
  if (localStorage.getItem("jarvis_setup") === null)
{
  setup.style.display="block"
  // setup.style.dispaly="flex"
  setup.querySelector("button").addEventListener("click",userInfo)

} 
// setup of userinfo 
function userInfo() {
  let setupInfo ={
    name:setup.querySelectorAll("input")[0].value , 
    bio:setup.querySelectorAll("input")[1].value , 
    address:setup.querySelectorAll("input")[2].value , 
    instagram:setup.querySelectorAll("input")[3].value , 
    github:setup.querySelectorAll("input")[4].value , 
    linkdin:setup.querySelectorAll("input")[5].value , 
  }



  let testArr=[]
 
setup.querySelectorAll("input").forEach((e)=>{
 testArr.push(e.value)
})

if (testArr.includes("")){
  readOut("sir please fill your complete information")
}else{
  localStorage.clear()
  localStorage.setItem("jarvis_setup",JSON.stringify(setupInfo))
  setup.style.display="none"
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);

}
}


// speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous=true;
//vr start
recognition.onstart = function(){
    console.log('Speech recognition started');
}

// arr of window
let windowsB = []
// vr result 
recognition.onresult=function (event){
  // showMessage("user", transcript);

    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript=transcript.toLowerCase()
    let userdata = localStorage.getItem("jarvis_setup")
    // showMessage("usermsg",transcript)
    console.log(`my words:${transcript}`);
    if(transcript.includes("hello friday")){
        readOut("hello sir")
        // showMessage("jarvis", "opening youtube");
    }
    // shut down command 
    if(transcript.includes("shut down")){
        readOut("ok sir taking nap");
          stopingR=true;
        recognition.stop();
        // showMessage("jarvis", "opening youtube");
    }
    if(transcript.includes("what are your commands")){
        readOut("sir,i can perform the following tasks:")
        document.querySelector('.command').style.display="block"
        // showMessage("jarvis", "opening youtube");
    }
    if(transcript.includes("close the commands")){
        readOut("closing commands")
        document.querySelector('.command').style.display="none"
        // showMessage("jarvis", "opening youtube");
    }
    

    //showuseInfo
      if (transcript.includes("change my information")) {
      readOut("Opening the information tab sir");
      localStorage.clear();
      
      if(window.innerWidth <= 400 ){
        window.resizeTo(screen.width,screen.height)
      }
      setup.style.display = "flex";
      setup.querySelector("button").addEventListener("click", userInfo);
    }

    //for youtube cammands 
    if(transcript.includes("open youtube")){
        readOut("opening youtube")
        // showMessage("jarvis", "opening youtube");
       let a= window.open("https://www.youtube.com/")
       windowsB.push(a)
    }
    // some casual commands 
     if (transcript.includes("what's the current charge?")) {
      readOut(`the current charge is ${battery}`);
    }
    if (transcript.includes("what's the charging status")) {
      readOut(`the current charging status is ${chargeStatus}`);
    }
    if (transcript.includes("current time")) {
      readOut(currentTime);
    }
    if (transcript.includes("connection status")) {
      readOut(`you are ${connectivity} sir`);
    }

    //yt search cammand
    if(transcript.includes("play the")){
        readOut("here's the result:")
          // showMessage("jarvis", "here's the result:");
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
        //  showMessage("jarvis", "opening spotify");
        window.open("https://open.spotify.com/album/013jUXOfDFXnDMBetTdsiH?si=LNgrkkjwSTKBXjbAJTrRHQ", "_blank");
    }

    // to search songs on browser
    if (transcript.includes("play song")) {
        readOut("Here's the result on Spotify:");
        // showMessage("jarvis", "Here's the result on Spotify:");

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
      //  showMessage("jarvis", "opening whatsapp");
        window.open("https://web.whatsapp.com/")
    }

    
    //opning google
    if(transcript.includes("open google")){
        readOut("opening google")
        //  showMessage("jarvis", "opening google");
       let a= window.open("https://www.google.com/")
        windowsB.push(a)
    }
    // google search cammand
    if(transcript.includes("search for")){
        readOut("here's the result:")
        //  showMessage("jarvis", "here's the result:");
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
      // showMessage("jarvis", "opening gmail");
     window.open("https://mail.google.com/mail/u/0/#inbox")



    }
    // if(transcript.includes("open firebase")|| transcript.includes("open fire base")){
    //     readOut("opening firebase")
    //     window.open("https://firebase.google.com/")
    // }
    //firebase with account feature
    if(transcript.includes("open firebase")&&transcript.includes("account")){
        readOut("opening firebase console")
        //  showMessage("jarvis", "opening firebase console")
        let accId = transcript;
        accId= accId.split("")
        accId.pop()
        accId = accId[accId.length - 1];
        console.log(`accId is :${accId}`);
        
        window.open(`https://console.firebase.google.com/?_gl=1*c7vqi3*_ga*NTY1OTE5Mzg3LjE3NDY2MTA2MjA.*_ga_CW55HF8NVT*czE3NDY2MTA2MTkkbzEkZzEkdDE3NDY2MTIxNDUkajIzJGwwJGgw`)
    }   
    
    
    if(transcript.includes("open instagram")){
      readOut("opening instagram")
      //  showMessage("jarvis", "opening instagram");
    window.open("https://www.instagram.com/")
    }
    if(transcript.includes("open insta profile")){
      readOut("opening instagram profile")
      //  showMessage("jarvis", "opening instagram profile")
    window.open(`https://www.instagram.com/${JSON.parse(userdata).instagram}`)
    }
    if(transcript.includes("open linkdin")){
      readOut("opening linkdin")
      //  showMessage("jarvis", "opening linkdin");
    window.open("https://www.linkedin.com/feed/")
    }
    if(transcript.includes("open link din profile")|| transcript.includes("open link dean profile")){
      readOut("opening linkdin profile")
      //  showMessage("jarvis", "opening linkdin profile")
    window.open(`https://www.linkedin.com/in/${JSON.parse(userdata).linkdin}`)
    }
    if(transcript.includes("open github")){
      readOut("opening github")
      //  showMessage("jarvis", "opening github");
    window.open("https://github.com/")
    }
    if(transcript.includes("what is my name")){
      let input = transcript.split("")
      input.splice(0,16)
      input.pop()
      readOut(`${JSON.parse(userdata).name}`)
      //  showMessage("jarvis", `${JSON.parse(userdata).name}`);
    
    }
    if(transcript.includes("who i am")){
      let input = transcript.split("")
      input.splice(0,9)
      input.pop()
      readOut(`${JSON.parse(userdata).bio}`)
      //  showMessage("jarvis", `${JSON.parse(userdata).bio}`);
    
    }
    if (transcript.includes("close all tabs")) {
    readOut("closing all tabs sir");
    windowsB.forEach((tabs) => {
      tabs.close()
    })
}

}


//vr stop
recognition.onend = function () {
  if (stopingR === false) {
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
    document.querySelector("#stop_jarvis_btn").style.display = "none"
  }
};
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
  //  showMessage("friday",message)
}
