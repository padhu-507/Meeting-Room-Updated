var con = require("../connection");
var nodemailer = require("nodemailer");
var randtoken = require("rand-token");
var bcrypt = require("bcrypt");
var moment = require("moment");
const { defaultOccurance, getStatus } = require("../utils/occuranceUtil");

const getSignUp = function (req, res, next) {
  res.render("index", { success: "", error: "" });
};

const postSignUp = function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var phone = req.body.phone;

  con.query(
    "SELECT COUNT(*) AS cnt FROM register WHERE email = ? ",
    req.body.email,
    function (err, data) {
      if (err) {
        throw err;
      } else if (data[0].cnt > 0) {
        res.render("index", { error: "Mail Already Exists!Try to Login!" });
      } else {
        con.query(
          "Insert into register(username,email,password,phone,occupancy) values('" +
            username +
            "','" +
            email +
            "','" +
            password +
            "','" +
            phone +
            "','" +
            defaultOccurance() +
            "' )",
          function (err, insert) {
            if (err) {
              throw err;
            } else {
              res.render("index", {
                success: "Thanks for Registering!",
              });
            }
          }
        );
      }
    }
  );
};

const getSignIn = function (req, res) {
  res.render("signin", { success: "", error: "" });
};

const postSignIn = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var sql = "SELECT * FROM register WHERE email =? AND password =?";
  con.query(sql, [email, password], function (err, data, fields) {
    if (data.length > 0) {
      req.email = email;
      req.password = password;
      res.redirect("/rooms");
    } else {
      res.render("signin", { error: "Check your Credentials!" });
    }
  });
};

const forgotPassword = function (req, res, next) {
  res.render("forgotPassword", {
    title: "Forget Password Page",
    success: "",
  });
};

const resetPasswordEmail = function (req, res, next) {
  var email = req.body.email;
  con.query(
    'SELECT * FROM register WHERE email ="' + email + '"',
    function (err, result) {
      if (err) throw err;
      if (result[0].email.length > 0) {
        var token = randtoken.generate(20);
        var sent = sendEmail(email, token);
        if (sent != "0") {
          var data = {
            token: token,
          };
          con.query(
            'UPDATE register SET ? WHERE email ="' + email + '"',
            data,
            function (err, result) {
              if (err) throw err;
            }
          );
          res.render("signin", {
            success:
              "The reset password link has been sent to your email address!",
          });
        } else {
          res.render("signin", {
            success: "Something went wrong. Please try again!",
          });
        }
      } else {
        res.render("signin", {
          success: "The Email is not registered with us!",
        });
      }
    }
  );
};

const getUpdatePassword = function (req, res, next) {
  res.render("updatePassword", {
    title: "Reset Password Page",
    success: "",
    token: req.query.token,
  });
};

const postUpdatePassword = function (req, res, next) {
  var token = req.body.token;
  var password = req.body.password;
  con.query(
    'SELECT * FROM register WHERE token ="' + token + '"',
    function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        var saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            var data = {
              password,
            };
            con.query(
              'UPDATE register SET ? WHERE email ="' + result[0].email + '"',
              data,
              function (err, result) {
                if (err) throw err;
              }
            );
          });
        });
        res.render("signin", { success: "Password updated ! Now Login !" });
      } else {
        res.render("signin", { success: "Invalid link ! please try again !" });
      }
    }
  );
};

const fetchUserStatus = function (req, res, next) {
  const { email, startdate, starttime, enddate, endtime } = req.body;

  const startdateTime = moment(
    `${startdate} ${starttime}`,
    "YYYY-MM-DD HH:mm:ss"
  ).format();
  const enddateTime = moment(
    `${enddate} ${endtime}`,
    "YYYY-MM-DD HH:mm:ss"
  ).format();

  var sql = "SELECT * FROM register WHERE email =?";
  con.query(sql, [email], function (err, data, fields) {
    if (data.length > 0) {
      const status = getStatus(data[0].occupancy, startdateTime, enddateTime);
      res.json({ user: data[0], status });
    } else {
      res
        .status(404)
        .json({ message: `User ${email} is not a registered user!` });
    }
  });
};

//send email
function sendEmail(email, token) {
  var email = email;
  var token = token;
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "m9705453621", // Your email id
      pass: "me&9705453621", // Your password
    },
  });
  var mailOptions = {
    from: "donotreply@gmail.com",
    to: email,
    subject: "Reset Password Link",
    html:
      '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/updatePassword?token=' +
      token +
      '">link</a> to reset your password</p>',
  };
  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
}

module.exports = {
  getSignUp,
  postSignUp,
  getSignIn,
  postSignIn,
  forgotPassword,
  resetPasswordEmail,
  getUpdatePassword,
  postUpdatePassword,
  fetchUserStatus,
};
