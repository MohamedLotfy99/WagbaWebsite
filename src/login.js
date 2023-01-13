let eVal, pVal;

document.getElementById("loginForm").onsubmit = function  (e){

    console.log("hi")
    eVal = document.getElementById("email").value;
    pVal = document.getElementById("pass").value;

    if (eVal == "admin" && pVal == "admin"){
        window.open("tracking.html", '_self');
        return false;
    }
    return false;
}