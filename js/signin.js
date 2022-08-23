"use strict";

if (sessionStorage.getItem('AuthenticationState') === null) {   ////Is the user authenticated?
    window.open("AccessDenied.html", "_self");
}

const loginData = () => {
    let loginEmail = document.getElementById("email").value;
    let loginPassword = document.getElementById("password").value;

    if (localStorage.getItem('usersList')) {
        let loginDeets = JSON.parse(localStorage.getItem('usersList'))

        const matchedUser = loginDeets.filter(user => {
            return loginEmail === user.userEmail && loginPassword === user.password;
        });

        if (matchedUser.length) {
            alertMsgs('Successfully Logged In!', 'baby pink');
            document.forms[0].reset();
            window.location.replace("../html/bookRoom.html");

        } else {
            alertMsgs('Check Your Credentials!', 'red');
        }
    }
}
