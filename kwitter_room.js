const firebaseConfig = {
    apiKey: "AIzaSyCdb5OxnOj6w_Q0m_WBvQx6BrP3EtFObGc",
    authDomain: "clucktalk.firebaseapp.com",
    databaseURL: "https://clucktalk-default-rtdb.firebaseio.com",
    projectId: "clucktalk",
    storageBucket: "clucktalk.appspot.com",
    messagingSenderId: "665792464838",
    appId: "1:665792464838:web:f8c53ce2ed0f37ddd894c7",
    measurementId: "G-8WX52Z0LPD"
  };
  firebase.initializeApp(firebaseConfig);


  user_name = localStorage.getItem("user_name");
  
  document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
  

  function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("Room Name - " + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });

}
getData()

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_room.html"
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
        window.location = "index.html";
}

function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref("room_name").push({
        name:user_name,
        message:msg,
        like:0
    });

    document.getElementById("msg").value = "";
}