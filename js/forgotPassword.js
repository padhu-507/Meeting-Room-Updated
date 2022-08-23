"use strict";

if (sessionStorage.getItem('AuthenticationState') === null) {   ////Is the user authenticated?
    window.open("AccessDenied.html", "_self");
}

const forgotPassword = () => {
    let data = [];

    let userData = {
        email: document.getElementById('email').value,
        oldPwd: document.getElementById('old password').value,
        newPwd: document.getElementById('new password').value
    };

    let email = document.getElementById('email').value;
    let newPwd = document.getElementById('old password').value;
    let confirmPwd = document.getElementById('new password').value;

    data = JSON.parse(localStorage.getItem("forgot data")) ? JSON.parse(localStorage.getItem("forgot data")) : []

    if (newPwd == confirmPwd) {
        data.push(userData);
        alertMsgs('Password Successfully Changed!', 'baby pink');
        document.forms[0].reset();
        localStorage.setItem("forgot data", JSON.stringify(data));
    } else {
        alertMsgs('New Password and Confirm Password must be same!', 'red');
    }

    let users = JSON.parse(localStorage.getItem('usersList'));
    let user = users.find(user => user.userEmail === email);

    if (user) {
        if (newPwd == confirmPwd) {
            user.password = newPwd;
        }
    }

    localStorage.setItem('usersList', JSON.stringify(users));
}
