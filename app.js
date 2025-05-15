
//elements
const startbtn = document.getElementById("start");
const stopbtn = document.getElementById("stop");
const speakbtn = document.getElementById("speak");
const turn_on = document.getElementById("turn_on");
const time = document.getElementById("times");
const speak = document.querySelector("#speak");

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

// start stop friday buttons functionality

const jarvisbtn = document
  .getElementById("start_jarvis_btn")
  .addEventListener("click", () => {
    document.querySelector("#stop_jarvis_btn").style.display = "block";
    recognition.start();
  });

document.querySelector("#stop_jarvis_btn").addEventListener("click", () => {
  stopingR = true;
  recognition.stop();
});

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

// calling weather info
weather("Mumbai");

// date and time
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// autojarvis
function autojarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

window.onload = function () {
  turn_on.play();

  // power on audio setup
  let playedOnce = false;

  turn_on.addEventListener("onend", function () {
    setTimeout(() => {
      readOut("ready to go sir");
      if (localStorage.getItem("jarvis_setup") === null) {
        readOut("fill the information sir");
      }
    }, 200);
  });

  //friday commands
  fridayComs.forEach((e) => {
    document.querySelector(".command").innerHTML += `<p>#${e}</p><br/>`;
  });

  // time setup
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    currentTime = strTime;
    time.textContent = strTime;
  }

  formatAMPM(date);
  setInterval(() => {
    formatAMPM(date);
  }, 60000);

  //battery setup
  navigator.getBattery().then(function (battery) {
    function updateBatteryStatus() {
      const batteryStatus = `${Math.round(battery.level * 100)}% ${
        battery.charging ? "🔌 Charging" : ""
      }`;
      document.getElementById("battery").textContent = batteryStatus;
    }

    updateBatteryStatus();

    // Update when charging status or level changes
    battery.addEventListener("chargingchange", updateBatteryStatus);
    battery.addEventListener("levelchange", updateBatteryStatus);
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
const setup = document.querySelector(".jarvis_setup");
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "block";
  // setup.style.dispaly="flex"
  setup.querySelector("button").addEventListener("click", userInfo);
}
// setup of userinfo
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    address: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    github: setup.querySelectorAll("input")[4].value,
    linkdin: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  // if userform is empty
  if (testArr.includes("")) {
    readOut("sir please fill your complete information");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}

// speech recognition setup
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.continuous = true;

//voice recognition start
recognition.onstart = function () {
  console.log("Speech recognition started");
};

// arr of window
let windowsB = [];

// voice recognition result
recognition.onresult = function (event) {
  // showMessage("user", transcript);

  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  showMessage("usermsg", transcript);
  let userdata = localStorage.getItem("jarvis_setup");

  console.log(`my words:${transcript}`);

  // chat which show the commands of user and friday

  function showMessage(sender, message) {
    const chatMessages = document.querySelector(".chat-messages");

    // Clear messages if there are too many to prevent clutter
    if (chatMessages.children.length > 20) {
      chatMessages.innerHTML = ""; // Clear all messages
    }

    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");

    if (sender === "jarvis") {
      messageElement.classList.add("jarvismsg");
    } else {
      messageElement.classList.add("usermsg");
    }

    // Create a new paragraph for each line if message contains multiple lines
    if (message.includes("\n")) {
      message.split("\n").forEach((line) => {
        if (line.trim()) {
          // Only add non-empty lines
          const p = document.createElement("p");
          p.textContent = line;
          messageElement.appendChild(p);
        }
      });
    } else {
      messageElement.textContent = message;
    }

    chatMessages.appendChild(messageElement);

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // jarvis bio
  if (transcript.includes("Tell about yourself")) {
    showMessage(
      "jarvis",
      "sir, i am a jarvis, a voice asistant made for browsers using javascript by Vivek. I can do anything which can be done from a browser."
    );
    readOut(
      "sir, i am a jarvis, a voice asistant made for browsers using javascript by Vivek. I can do anything which can be done from a browser."
    );
  }

  // friday commands

  if (transcript.includes("hello friday")) {
    showMessage("jarvis", "hello sir");
    readOut("hello sir");
    // showMessage("jarvis", "opening youtube");
  }

  // shut down command
  if (transcript.includes("shut down")) {
    showMessage("jarvis", "ok sir taking nap");
    readOut("ok sir taking nap");
    stopingR = true;
    recognition.stop();
  }

  // showing friday cammands
  if (transcript.includes("what are your commands")) {
    showMessage("jarvis", "sir,i can perform the following tasks:");
    readOut("sir,i can perform the following tasks:");
    document.querySelector(".command").style.display = "block";
    // showMessage("jarvis", "opening youtube");
  }
  if (transcript.includes("close the commands")) {
    showMessage("jarvis", "closing commands");
    readOut("closing commands");
    document.querySelector(".command").style.display = "none";
    // showMessage("jarvis", "opening youtube");
  }

  //showuseInfo
  if (transcript.includes("change my information")) {
    showMessage("jarvis", "Opening the information tab  sir");
    readOut("Opening the information tab sir");
    localStorage.clear();

    if (window.innerWidth <= 400) {
      window.resizeTo(screen.width, screen.height);
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }

  //for youtube cammands
  if (transcript.includes("open youtube")) {
    showMessage("jarvis", "opening youtube");
    readOut("opening youtube");
    // showMessage("jarvis", "opening youtube");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a);
  }

  //yt search cammand
  if (transcript.includes("play the")) {
    showMessage("jarvis", "here's the result:");
    readOut("here's the result:");
    // showMessage("jarvis", "here's the result:");
    let input = transcript.split("");
    input.splice(0, 9);
    input.pop();
    input = input.join("").split(" ").join("+");
    console.log(input);
    let a = window.open(
      `https://www.youtube.com/results?search_query=${input}`
    );
    windowsB.push(a);
  }

  //for spotify desktop

  if (transcript.includes("open spotify")) {
    showMessage("jarvis", "opening spotify");
    readOut("opening spotify");
    let a = window.open(
      "https://open.spotify.com/album/013jUXOfDFXnDMBetTdsiH?si=LNgrkkjwSTKBXjbAJTrRHQ",
      "_blank"
    );
    windowsB.push(a);
  }

  // to search songs on browser
  if (transcript.includes("play song")) {
    showMessage("jarvis", "Here's the result on Spotify:");
    readOut("Here's the result on Spotify:");

    let input = transcript.split("");
    input.splice(0, 10); // remove "play the"
    input.pop(); // remove final space or dot
    input = input.join("").split(" ").join("+");
    console.log(input);
    let a = window.open(`https://open.spotify.com/search/${input}`, "_blank");
    windowsB.push(a);
  }

  //opening google
  if (transcript.includes("open google")) {
    showMessage("jarvis", "opening google");
    readOut("opening google");
    let a = window.open("https://www.google.com/");
    windowsB.push(a);
  }

  // google search cammand
  if (transcript.includes("search for")) {
    showMessage("jarvis", "here's the result:");
    readOut("here's the result:");
    let input = transcript.split("");
    input.splice(0, 11);
    input.pop();
    input = input.join("").split(" ").join("+");
    console.log(input);
    let a = window.open(`https://www.google.com/search?q=${input}`);
    windowsB.push(a);
  }

  // some casual commands

  //for charge
  if (transcript.includes("what's the current charge?")) {
    readOut(`the current charge is ${battery}`);
  }
  if (transcript.includes("what's the charging status")) {
    readOut(`the current charging status is ${chargeStatus}`);
  }

  // for time
  if (transcript.includes("current time")) {
    readOut(currentTime);
  }

  // for internet
  if (transcript.includes("connection status")) {
    readOut(`you are ${connectivity} sir`);
  }

  //for whatsapp web
  if (transcript.includes("open whatsapp")) {
    showMessage("jarvis", "opening whatsapp");
    readOut("opening whatsapp");
    let a = window.open("https://web.whatsapp.com/");
    windowsB.push(a);
  }

  //gmail opning cammand
  if (transcript.includes("open gmail")) {
    showMessage("jarvis", "opening gmail");
    readOut("opening gmail");
    let a = window.open("https://mail.google.com/mail/u/0/#inbox");
    windowsB.push(a);
  }

  //firebase with account feature
  if (transcript.includes("open firebase") && transcript.includes("account")) {
    showMessage("jarvis", "opening firebase console");
    readOut("opening firebase console");
    let accId = transcript;
    accId = accId.split("");
    accId.pop();
    accId = accId[accId.length - 1];
    console.log(`accId is :${accId}`);

    let a = window.open(
      `https://console.firebase.google.com/?_gl=1*c7vqi3*_ga*NTY1OTE5Mzg3LjE3NDY2MTA2MjA.*_ga_CW55HF8NVT*czE3NDY2MTA2MTkkbzEkZzEkdDE3NDY2MTIxNDUkajIzJGwwJGgw`
    );
    windowsB.push(a);
  }

  // for instagram
  if (transcript.includes("open instagram")) {
    showMessage("jarvis", "opening instagram");
    readOut("opening instagram");
    let a = window.open("https://www.instagram.com/");
    windowsB.push(a);
  }
  if (transcript.includes("open insta profile")) {
    showMessage("jarvis", "opening instagram profile");
    readOut("opening instagram profile");
    let a = window.open(
      `https://www.instagram.com/${JSON.parse(userdata).instagram}`
    );
    windowsB.push(a);
  }

  // for linkdin
  if (transcript.includes("open linkdin")) {
    showMessage("jarvis", "opening linkdin");
    readOut("opening linkdin");
    let a = window.open("https://www.linkedin.com/feed/");
    windowsB.push(a);
  }
  if (
    transcript.includes("open link din profile") ||
    transcript.includes("open link dean profile")
  ) {
    showMessage("jarvis", "opening linkdin profile");
    readOut("opening linkdin profile");
    let a = window.open(
      `https://www.linkedin.com/in/${JSON.parse(userdata).linkdin}`
    );
    windowsB.push(a);
  }

  // for git hub
  if (transcript.includes("open github")) {
    showMessage("jarvis", "opening github");
    readOut("opening github");
    let a = window.open("https://github.com/");
    windowsB.push(a);
  }

  // cammands to speak about user info
  if (transcript.includes("what is my name")) {
    let input = transcript.split("");
    input.splice(0, 16);
    input.pop();
    showMessage("jarvis", `${JSON.parse(userdata).name}`);
    readOut(`${JSON.parse(userdata).name}`);
  }
  if (transcript.includes("who i am")) {
    let input = transcript.split("");
    input.splice(0, 9);
    input.pop();
    showMessage("jarvis", `${JSON.parse(userdata).bio}`);
    readOut(`${JSON.parse(userdata).bio}`);
  }

  // closing all tabs
  if (transcript.includes("close all tabs")) {
    readOut("closing all tabs sir");
    windowsB.forEach((tabs) => {
      tabs.close();
    });
  }
};

//voice recognition  stop
recognition.onend = function () {
  if (stopingR === false) {
    document.querySelector("#stop_jarvis_btn").style.display = "block";
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
    document.querySelector("#stop_jarvis_btn").style.display = "none";
  }
};

//voice recognition  continous
recognition.continuous = true;

// to tell news
speak.addEventListener("click", () => {
  getNews();
});

// friday speech
function readOut(message) {
  const speech = new SpeechSynthesisUtterance(message);
  const getallVoice = window.speechSynthesis.getVoices();
  speech.text = message;
  speech.voice = getallVoice[4];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("speaking out");
  //  showMessage("friday",message)
}

// calendar

const lang = navigator.language;

let datex = new Date();
let dayNumber = date.getDate();
let monthx = date.getMonth();

let dayName = date.toLocaleString(lang, { weekday: "long" });
let monthName = date.toLocaleString(lang, { month: "long" });
let year = date.getFullYear();

document.querySelector("#month").innerHTML = monthName;
document.querySelector("#day").innerHTML = dayName;
document.querySelector("#date").innerHTML = dayNumber;
document.querySelector("#year").innerHTML = year;

document.querySelector(".calendar").addEventListener("click", () => {
  // showMessage("jarvis", "opening calender");
  // readOut("opening calendar");
  window.open("https://calendar.google.com/");
});

// news function
async function getNews() {
  var url =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=9041845317ae4e5d8c1f30089f0cdd10";
  var req = new Request(url);
  await fetch(req)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let arrNews = data.articles;
      arrNews.length = 10;
      let a = [];
      arrNews.forEach((e, index) => {
        a.push(index + 1);
        a.push(".........");
        a.push(e.title);
        a.push(".........");
      });
      readOut(a);
    });
}
>>>>>>> e60d564606298a9a2a98048c85f699628ccafc1a
