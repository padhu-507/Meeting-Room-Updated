var con = require("../connection");
var moment = require("moment");
const { getStatus, setOccurance } = require("../utils/occuranceUtil");

const getRoomsPage = function (req, res, next) {
  res.render("rooms", {
    title: "Rooms",
    success: "",
    error: "",
    email: "",
  });
};

const bookRoom = function (req, res) {
  let {
    title,
    persons,
    startdate,
    starttime,
    enddate,
    endtime,
    attendees,
    organizer: email,
    roomname: roomName,
  } = req.body;

  const loggedInEmail = email || "";
  const startDt = moment(
    `${startdate} ${starttime}`,
    "YYYY-MM-DD HH:mm:ss"
  ).format();
  const endDt = moment(`${enddate} ${endtime}`, "YYYY-MM-DD HH:mm:ss").format();

  var sqlcheck = "SELECT * FROM rooms WHERE roomName = ?";
  con.query(sqlcheck, [roomName], function (err, data, fields) {
    if (data.length > 0) {
      const status = getStatus(data[0].occupancyString, startDt, endDt);
      if (status.toLowerCase() === "available") {
        let availablityString = setOccurance(
          startDt,
          endDt,
          data[0].occupancyString
        );

        var update = "update rooms set occupancyString = ? where roomName = ?";
        con.query(
          update,
          [availablityString, roomName],
          function (err, data, fields) {
            if (data) {
              // User occupancy update
              var sqlcheck = "SELECT * FROM register WHERE email = ?";
              let people = attendees.split(",").filter((e) => !!e);
              people = people.filter((ele) => ele !== "");
              // people.push(loggedInEmail);
              people.forEach((p, index) => {
                con.query(sqlcheck, [p], function (err, data, fields) {
                  if (data.length > 0) {
                    let userAvailability = setOccurance(
                      startDt,
                      endDt,
                      data[0].occupancy
                    );
                    var update =
                      "update register set occupancy = ? where email = ?";
                    con.query(
                      update,
                      [userAvailability, p],
                      function (err, data, fields) {
                        if (data) {
                          if (starttime > endtime) {
                            res.render("rooms", {
                              error:
                                "End time should be greater than start time!",
                            });
                          } else if (Number(persons) > 20) {
                            res.render("rooms", {
                              error: "No Vacant Room!",
                            });
                          } else if (startdate != enddate) {
                            res.render("rooms", {
                              error:
                                "Start Date and End Date should not be different!",
                            });
                          } else if (starttime == endtime) {
                            res.render("rooms", {
                              error:
                                "Start time and end time should not be equal!",
                            });
                          } else if (people.length - 1 === index) {
                            con.query(
                              "Insert into meetingSchedule(attendees,title,startdate,enddate,starttime,endtime) values('" +
                                attendees +
                                "','" +
                                title +
                                "','" +
                                startdate +
                                "','" +
                                enddate +
                                "','" +
                                starttime +
                                "','" +
                                endtime +
                                "')"
                            );
                            res.render("rooms", {
                              success: `${roomName} Room Booked Successfully!`,
                            });
                          }
                        } else {
                          res.render("rooms", {
                            error: `User ${organizer} is not updated!Please try again!`,
                          });
                        }
                      }
                    );
                  } else {
                    res.render("rooms", {
                      error: "User is Busy!",
                    });
                  }
                });
              });
            } else {
              res.render("rooms", {
                error: `${roomName} Room not updated!Please try again!`,
              });
            }
          }
        );
      } else {
        res.render("rooms", {
          error: `${roomName} Room is currently not available!Try other Room!`,
        });
      }
    } else {
      res.render("rooms", {
        error: "Check the Room Name!",
      });
    }
  });
};

module.exports = {
  getRoomsPage,
  bookRoom,
};
