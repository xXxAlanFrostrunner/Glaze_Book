
//ADD YOUR FIREBASE LINKS HERE
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
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !";

function getData() 
{firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";
snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
    console.log("Room Name - " + Room_names);

    row = "<div class =' room_name ' id=" +Room_names + " onclick='redirectToRoomName(this.id)'>#"+ Room_names +"</div><hr>";
    document.getElementById("output").innerHTML += row;
    //End code
    });});}
getData();

function redirectToRoomName(name)
{
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}


function addRoom() {
    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
          purpose : "add room"
    });

    localStorage.setItem("room_name", room_name);
      
      window.location = "kwitter_page.html";

  }

  function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "kwitter.html";
}