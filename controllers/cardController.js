var con = require('../connection');
const getDisplayRooms = function (req, res, next) {
    res.render('displayRooms', { success: '' });
};

const displayRooms = function (req, res) {
    var sql = 'SELECT * FROM meetingSchedule';
    con.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('displayRooms', { title: 'User List', userData: data });
    });
}

module.exports = {
    getDisplayRooms,
    displayRooms,
};