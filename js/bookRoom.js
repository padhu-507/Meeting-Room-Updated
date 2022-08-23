"use strict";

if (sessionStorage.getItem('AuthenticationState') === null) {   //Is the user authenticated?
    window.open("AccessDenied.html", "_self");
}

let roomName = () => {

    let text = document.querySelector("#persons");
    let output = document.querySelector("#room");
    let icon = document.querySelector(".bi-building");

    let cave = 0;
    let tower = 0;
    let gmansion = 0;

    const roomNameDisplay = (roomName) => {
        output.value = roomName;
    };

    const noVacantRoom = () => {
        output.value = "No vacant room";
    };

    text.addEventListener("keyup", function () {
        if ((text.value == 2 || text.value == 3) && cave == 0) {
            cave = text.value;
            roomNameDisplay("Cave");
        }

        else if ((text.value > 3 && text.value < 7) || text.value == 7) {
            tower = Number(tower) + Number(text.value);
            if (tower <= 7) {
                roomNameDisplay("D-Tower");
            }

            else {
                gmansion = Number(gmansion) + Number(text.value);
                if (gmansion >= 2 && gmansion <= 20) {
                    roomNameDisplay("G-Mansion");
                }
                else {
                    noVacantRoom();
                }
            }
        }

        else if (text.value == 20 || (text.value > 7 && text.value < 20) || cave == 2 || cave == 3 || tower >= 8) {
            gmansion = Number(gmansion) + Number(text.value);
            if (text.value == 1) {
                gmansion = 0;
            }
            if (gmansion >= 2 && gmansion <= 20) {
                roomNameDisplay("G-Mansion");
            }
            else {
                noVacantRoom();
            }
        }
        else {
            noVacantRoom();
        }
    });
};

const bookingRoomData = () => {
    let roomBookingData = [];
    let roomsData = {
        loginName: document.getElementById("username").value,
        startDate: document.getElementById("startdate").value,
        endDate: document.getElementById("enddate").value,
        startTime: document.getElementById("starttime").value,
        endTime: document.getElementById("endtime").value,
        loginPerson: document.getElementById("persons").value,
        loginRoom: document.getElementById("room").value,
        loginPhone: document.getElementById("phone").value,
    };

    roomBookingData = JSON.parse(localStorage.getItem("bookingsList"))
        ? JSON.parse(localStorage.getItem("bookingsList"))
        : [];

    if (roomsData.startDate != roomsData.endDate) {
        alertMsgs('Meeting rooms cannot be booked on different dates!', 'red');
    } else if (roomsData.startTime > roomsData.endTime) {
        alertMsgs('End Time should be greater than start Time!', 'red');
    } else if (roomsData.startTime == roomsData.endTime) {
        alertMsgs(
            'Start Time and End Time should be different!', 'red');
    } else if ((roomsData.startTime == '09:00' && roomsData.endTime == '09:15') || (roomsData.startTime == '13:15' && roomsData.endTime == '13:45') || (roomsData.startTime == '18:45' && roomsData.endTime == '19:00')) {
        alertMsgs('Meeting rooms are not available for booking!', 'red');
    } else {
        roomBookingData.push(roomsData);

        localStorage.setItem("bookingsList", JSON.stringify(roomBookingData));
        alertMsgs(`Meeting room is booked for : ${roomsData.loginName}, Start date:   ${roomsData.startDate},
        End date:  ${roomsData.endDate},  Start Time:  ${roomsData.startTime}, Start Time:  ${roomsData.endTime}, Allocated Room:  ${roomsData.loginRoom}!`, 'baby pink');
        document.forms[0].reset();
    }
}

$(document).ready(function () {
    $(".timepicker").timepicker({
        timeFormat: "HH:mm",
        minTime: new Date().toLocaleTimeString(),
        interval: 15,
        defaultTime: "",
        dynamic: false,
        dropdown: true,
        scrollbar: true,
    });
});

const prevDateBlocker = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    $(".date_picker").attr("min", today);
};

