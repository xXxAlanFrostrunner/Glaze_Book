//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyALYecwrX37uVZk4G4ZOJnXyLL5IKbzdRk",
    authDomain: "kwitter-65fdd.firebaseapp.com",
    databaseURL: "https://kwitter-65fdd-default-rtdb.firebaseio.com",
    projectId: "kwitter-65fdd",
    storageBucket: "kwitter-65fdd.appspot.com",
    messagingSenderId: "967058057185",
    appId: "1:967058057185:web:b52ff081206ffcf8dd94a0",
    measurementId: "G-79JX7QF7L0"
  };
  
  firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          message:msg,
          like:0
    });

document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
Name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>" + Name + "<img class='user_tick' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/1200px-Twitter_Verified_Badge.svg.png'></h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value = " + like + " onclick='updateLike(this.id) '>"; 
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

