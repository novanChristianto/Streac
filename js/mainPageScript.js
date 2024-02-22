
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Authentication service
// const provider = new GoogleAuthProvider(firebaseApp);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    const email = user.email;
      document.getElementById("p1").innerHTML = email ;
  } else {
    // User is signed out
    // ...
  }
});

document.getElementById("userAccount").addEventListener('click',openAccount);
function openAccount(){
  window.location.href = 'http://127.0.0.1:5500/accountStreac.html';
}