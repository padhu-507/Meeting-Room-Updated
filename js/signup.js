"use strict";

sessionStorage.setItem("AuthenticationState", "Authenticated");

if (sessionStorage.getItem('AuthenticationState') === null) {   ////Is the user authenticated?
    window.open("AccessDenied.html", "_self");
}

let user_records = [];

const registerData = () => {

    let loginEmail = document.getElementById("email").value;

    let userData = {
        userEmail: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    user_records = JSON.parse(localStorage.getItem("usersList")) ? JSON.parse(localStorage.getItem("usersList")) : []
    if (user_records.some((v) => { return v.userEmail == loginEmail })) {
        alertMsgs(`Account already exists with the mail ${loginEmail}!`, 'red');
    }
    else {
        user_records.push(userData);
        localStorage.setItem("usersList", JSON.stringify(user_records));
        alertMsgs('Thanks for Registering!', 'baby pink');
        document.forms[0].reset();
    }
}