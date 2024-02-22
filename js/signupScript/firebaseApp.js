import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the Realtime Database
const db = getDatabase(firebaseApp);
// Get a reference to the Authentication service
const provider = new GoogleAuthProvider(firebaseApp);
const auth = getAuth(firebaseApp);


// ------------- Password Confirmation Function ----------
document.getElementById("passwordReenter").addEventListener("input", checkPassword);
const message = document.getElementById("message");
function checkPassword(){
  const passwordSignUp = document.getElementById("passwordSignup").value;
  const passwordReEnter = document.getElementById("passwordReenter").value;
  if (passwordSignUp === passwordReEnter && passwordSignUp !== " ") {
    document.getElementById("passwordReenter").style.backgroundColor = "white";
    document.getElementById("btnSignup").disabled = false;
    message.innerHTML ="Correctly ";
    message.style.color = "green";
  } else {
    document.getElementById("passwordReenter").style.backgroundColor = "#F08080";
    document.getElementById("btnSignup").disabled = true;
    message.innerHTML ="&#42; Please enter the password correctly";
    message.style.color = "red";
  }
}
// ---------------- Show Hide Password ------------
document.getElementById("togglePassword").addEventListener('click',showfunc);
function showfunc() {
  var x = document.getElementById("passwordSignup");
  if (x.type === "password"){x.type = "text";}else {x.type = "password";}
}
document.getElementById("toggleRepassword").addEventListener('click',showfuncRe);
function showfuncRe() {
  var y = document.getElementById("passwordReenter");
  if (y.type === "password"){y.type = "text";}else {y.type = "password";}
}


// -------------- Submit data to Firebase ---------------
document.getElementById("btnSignup").addEventListener('click',submitAccount);
function submitAccount(){
    const nameSignUp = document.getElementById("nameSignup").value;
    const emailSignUp = document.getElementById("emailSignup").value;
    const passwordSignUp = document.getElementById("passwordSignup").value;
      const selectCountries = document.querySelector("#countries");
    const countrieSignUp = selectCountries.options[selectCountries.selectedIndex].value;
      const selectLang = document.querySelector("#laguageSignup");
    const laguageSignUp = selectLang.options[selectLang.selectedIndex].value;
 
    createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp)
    .then((userCredential)=>{
        const user = userCredential.user;
        push(ref(db,'DataBaru'),{
            Username : nameSignUp,
            Email : emailSignUp,
            Countries : countrieSignUp,
            Laguage : laguageSignUp
        })
          .then(() => {
            alert("User account created and data submitted successfully!");

          })
          .catch((error) => {
            console.error("Error adding data to Realtime Database: ", error);
            alert("Error submitting data to Realtime Database. Please try again.");
          });
    })
    .catch((error) => {
        console.error("Error creating user: ", error);
        let errorMessage = "Error creating user. Please try again.";
        // Check for specific error codes
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'The email address is already in use by another account.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'The email address is invalid.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'The password is too weak.';
        }
        alert(errorMessage);
      });
}


document.getElementById('signinBtn').addEventListener('click', gogSignfunct);
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



