import { getDatabase, set, ref, onValue, push, update, child, get } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js' 
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const usersRef = ref(db, 'Users')

let acceptValid, deliverValid
let currHour, currMinutes
let finalHour, finalMinutes
let currTime, acceptTime, deliverTime

const acceptBtn = document.getElementById("acceptBtn")
const cancelBtn = document.getElementById("cancelBtn")
const deliverBtn = document.getElementById("deliverBtn")

checkPending()

cancelBtn.onclick = function (e){
    cancelOrder()
}

acceptBtn.onclick = function (e){
    acceptPending()
}

deliverBtn.onclick = function (e){
    deliverOrder()
}

function getTime(){
    const date = new Date();

    currHour = date.getHours();
    currMinutes = date.getMinutes();
}

function checkAcceptTime(){

    var uid
    getTime()
    
    get(usersRef).then((snapshot) => {
        snapshot.forEach((child) => {
            uid = child.key

            finalHour = child.child("Temp Order/Final Accept Time/Hour").val()
            finalMinutes = child.child("Temp Order/Final Accept Time/Minutes").val()

            currTime = currHour % 12 + ":" + currMinutes
            acceptTime = finalHour % 12 + ":" + finalMinutes
            console.log("Current time is " + currHour % 12 + ":" + currMinutes)
            console.log("Final accepting time is " + finalHour % 12 + ":" + finalMinutes)

            if  (finalHour - currHour <= 3 || currTime == acceptTime) {
                acceptValid = true
            }
            else{
                acceptValid = false
            }
        })
    })
}

function checkDeliverTime(){

    getTime()
    get(usersRef).then((snapshot) => {
        snapshot.forEach((child) => {

            finalHour = child.child("Temp Order/Delivery Slot").val()
        
            console.log("Current time is " + currHour % 12 + ":" + currMinutes)

            if (finalHour == 12){
                console.log("Final Delivery time is " + finalHour + ":00")
            }else{
                console.log("Final Delivery time is " + finalHour % 12 + ":00")
            }
            
            if (finalHour - currHour == 1 && currMinutes == 30){
                deliverValid = true
            }
            else{
                deliverValid = false
            }

        })
    })
}

function cancelOrder(){
    var uid
    get(usersRef).then((snapshot) => {
        snapshot.forEach((child) =>{

            uid = child.key
            const tempRef = ref(db, 'Users/' + uid + '/Temp Order')

            if (child.child("Temp Order/Status").val() == null){
                console.log("There are no pending orders to be cancelled")
            }else{
                update(tempRef, {
                    Status: "Cancelled"
                }) 
            }         
        })
    });
}

function acceptPending(){
    var uid
    checkAcceptTime()

    get(usersRef).then((snapshot) => {
        snapshot.forEach((child) =>{

            uid = child.key
            const tempRef = ref(db, 'Users/' + uid + '/Temp Order')

            if (child.child("Temp Order/Status").val() == null){
                console.log("There are no pending orders to be accepted")
            }
            else {
                if (acceptValid){
                    update(tempRef, {
                        Status: "Accepted"
                    }) 
                    console.log("Accepted")
                }
                else{
                    console.log("The window for accepting new orders has passed :(")
                }
            }
        })
    });
}

function deliverOrder(){
    var uid
    checkDeliverTime()
    get(usersRef).then((snapshot) => {
        snapshot.forEach((child) =>{

            uid = child.key
            const tempRef = ref(db, 'Users/' + uid + '/Temp Order')

            if (child.child("Temp Order/Status").val() != "Accepted"){
                console.log("There are no ready orders to be delivered")
            }
            else{
                if (deliverValid){
                    update(tempRef, {
                        Status: "Delivered"
                    }) 
                    console.log("Delivered")
                }else{
                    console.log("You can start delivering 30 minutes before the deadline")
                }
            }          
        })
    });
}

function checkPending(){

    onValue(usersRef, (snapshot) => {
        snapshot.forEach((child) =>{
            // console.log(child.child("Temp Order/Status").val())

            switch (child.child("Temp Order/Status").val()) {
                case "Pending":
                    document.getElementById("pendingOrder").innerHTML = "You have pending orders"
                    break

                case "Accepted":
                    document.getElementById("pendingOrder").innerHTML = "Your order is being made"
                    break

                default:
                    document.getElementById("pendingOrder").innerHTML = "You have no pending orders"
            }
        })
    })
}

