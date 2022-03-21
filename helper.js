var con = require("./connection");
let calendarEvents = [];
function roomData() {
  var sql = "SELECT roomname,title,startdate,enddate,starttime,endtime FROM meetingSchedule";

  con.query(
    sql,

    function (err, resources, res) {
      if (err) throw err;
      for (let i = 0; i < resources.length; i++) {
        let params = {
          resourceId:
            resources[i].roomname === "Cave"
              ? (resources[i].resourceId = "a")
              : resources[i].roomname === "Mansion"
                ? (resources[i].resourceId = "c")
                : resources[i].roomname === "Tower"
                  ? (resources[i].resourceId = "b")
                  : [],

          title: resources[i].title,

          start:
            resources[i].startdate.toString().split(" ")[3] +
            "-" +
            resources[i].startdate.toString().split(" ")[1].replace("Mar", "03") +
            "-" +
            resources[i].startdate.toString().split(" ")[2] +
            "T" +
            resources[i].starttime,
          end:
            resources[i].enddate.toString().split(" ")[3] +
            "-" +
            resources[i].enddate.toString().split(" ")[1].replace("Mar", "03") +
            "-" +
            resources[i].enddate.toString().split(" ")[2] +
            "T" +
            resources[i].endtime,
        };
        calendarEvents.push(params);
      }
    }
  );
}
let calendar = roomData();

module.exports = {
  roomData: roomData,
  calendarEvents: calendarEvents,
};
