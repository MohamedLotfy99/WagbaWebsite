import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js' 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js' 


const firebaseConfig = {
    apiKey: "AIzaSyATm1yo7vaiwFG2Pwk-VfHW_pDOdFXNR3s",
    authDomain: "gradproject-da30f.firebaseapp.com",
    databaseURL: "https://gradproject-da30f-default-rtdb.firebaseio.com",
    projectId: "gradproject-da30f",
    storageBucket: "gradproject-da30f.appspot.com",
    messagingSenderId: "471940411815",
    appId: "1:471940411815:web:3fc837603f0798be3d8682",
    measurementId: "G-JHFQWHQCGY"
  };

// var myRef = firebase.database.ref("hello");

// myRef.set({
//     John:{
//         number: 1,
//         age: 30
//     }
// });


// const app = initializeApp(firebaseConfig);
// writeUserData("13", "manga", "fasfsa", "af21312")

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'zby/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }