import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the Realtime Database
// const db = getDatabase(firebaseApp);
// Get a reference to the Authentication service
const provider = new GoogleAuthProvider(firebaseApp);
const auth = getAuth(firebaseApp);


// ---------------- Show Hide Password ------------
document.getElementById("togglePassword").addEventListener('click',showfunc);
function showfunc() {
  var x = document.getElementById("passwordSignin");
  if (x.type === "password"){x.type = "text";}else {x.type = "password";}
}
// ---------- Signin Account ---------------
document.getElementById("btnSignIn").addEventListener('click',loginAccount);
function loginAccount(){
    const emailSignIn = document.getElementById("emailSignin").value;
    const passwordSignIn = document.getElementById("passwordSignin").value;
    
    signInWithEmailAndPassword(auth, emailSignIn, passwordSignIn)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        window.location.href = `http://127.0.0.1:5500/mainPage.html?email=${user.email}&uid=${user.uid}`;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Authentication error:", errorCode, errorMessage);
        alert(errorMessage);
    });

}       

// -------------- Google Login -------------
document.getElementById("googSigninBtn").addEventListener('click', gogSignfunct);
function gogSignfunct(){
  signInWithRedirect(auth,provider);
  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    window.location.href = "http://127.0.0.1:5500/mainPage.html";
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

// -------------- Facebook Login -------------

