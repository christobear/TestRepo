const firebaseConfig = {
    apiKey: "AIzaSyBGA_EVxfr-2H57rQaj4lxMrF8L-Qyv0ac",
    authDomain: "chatapp-f3315.firebaseapp.com",
    projectId: "chatapp-f3315",
    storageBucket: "chatapp-f3315.appspot.com",
    messagingSenderId: "453060454602",
    appId: "1:453060454602:web:a4f7ab306f0531fb4aac33"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

//const username = "Chris";
const username = prompt("What's your name?");
uhash = StringToHash(username);
console.log(uhash);



function StringToHash (s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const msgType = document.getElementById("msg-type");
  const message = msgType.value + ":" + chatTxt.value;
  chatTxt.value = "";
  msgType.value = "";
  console.log(message);
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.usr + " :" + messages.msg + "</li>";
  ProcessReceivedMessage(messages.msg);
  document.getElementById("messages").innerHTML += msg;
});

function ProcessReceivedMessage(msg){
  msgType = msg.substring(0,4);
  parsedMsg = msg.substring(4,msg.length);
  if(msgType == "BCB:"){
    console.log('BCB received');
  }else if(msgType == "NBB:"){
    console.log('NBB received');
  }else if(msgType == "NBT:"){
    console.log('NBT received');
  }else if(msgType == "BNB:"){
    console.log('BNB received');
  }else{
    // Ignore
    
  }

}
