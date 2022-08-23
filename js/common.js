
"use strict";

const alertMsgs = (text, color) => {
    let alertMsg = document.getElementById("msg");
    alertMsg.style.color = `${color}`
    alertMsg.innerHTML = `${text}`;
    alertMsg.style.marginTop = "100px";
    alertMsg.style.visibility = "visible";

    alertMsg.scrollIntoView({ block: "center" });

    setTimeout(function () {
        alertMsg.style.visibility = "hidden";
        alertMsg.style.marginTop = "20px";
    }, 5000);
}

const viewPassword = () => {
    let passwordInput = document.getElementById('password');
    let passStatus = document.getElementById('pass-status');
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye';
    }
    else {
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye-slash';

    }
}

const newViewPassword = () => {
    let newPasswordInput = document.getElementById('old password');
    let passStatus1 = document.getElementById('pass-status1');
    if (newPasswordInput.type == 'password') {
        newPasswordInput.type = 'text';
        passStatus1.className = 'fa fa-eye';
    }
    else {
        newPasswordInput.type = 'password';
        passStatus1.className = 'fa fa-eye-slash'
    }
}

const confirmViewPassword = () => {
    let confirmPasswordInput = document.getElementById('new password');
    let passStatus2 = document.getElementById('pass-status2');
    if (confirmPasswordInput.type == 'password') {
        confirmPasswordInput.type = 'text';
        passStatus2.className = 'fa fa-eye';
    }
    else {
        confirmPasswordInput.type = 'password';
        passStatus2.className = 'fa fa-eye-slash'
    }
}