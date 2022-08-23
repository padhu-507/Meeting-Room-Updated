"use strict";

if (sessionStorage.getItem('AuthenticationState') === null) {   ////Is the user authenticated?
  window.open("AccessDenied.html", "_self");
}

let bookingData = JSON.parse(localStorage.getItem("bookingsList")) ? JSON.parse(localStorage.getItem("bookingsList")) : [];

let htmlCode = ``;

bookingData.forEach(function (booking) {

  htmlCode =
    htmlCode +
    `
      <article>
         <div>
         <h3><strong> ${booking.loginRoom} Room </strong></h3> 
         <p>${booking.loginName} on ${booking.startDate}  ${booking.startTime} - ${booking.endTime}<p>
        
         </div>
      </article>
    `;
});

const cards = document.querySelector(".all-cards");

cards.innerHTML = htmlCode;
