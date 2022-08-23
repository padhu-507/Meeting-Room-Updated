document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "UTC",
    initialView: "resourceTimeGridFourDay",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "resourceTimeGridDay,resourceTimeGridFourDay",
    },
    views: {
      resourceTimeGridFourDay: {
        type: "resourceTimeGrid",
        duration: { days: 3 },
        buttonText: "3 days",
      },
    },
    resources: [
      { id: "a", title: "Cave" },
      { id: "b", title: "D-Tower" },
      { id: "c", title: "G-Mansion" },
    ],

    // events: function (info, successCallback, failureCallback) {
    //   let eventArr = calendarParams;
    //   successCallback(eventArr);
    // },
  });
  calendar.render();
});
