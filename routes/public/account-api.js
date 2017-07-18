var db = require("../../models/index");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
validPassword = function(password, storedPassword) {
  var isvalid = storedPassword ? bcrypt.compareSync(password, storedPassword) : false;
  return isvalid;
};

// Using JWT to authenticate the user

module.exports = function(app) {
    // Getting the login page
    app.get("/", function(req, res) {
      res.render("login");
    });

    // Route to login
    app.post("/login", function(req, res) {
          var email = req.body.email;
          var password = req.body.password;
          db.Users.findOne({
            where: {
              email: email
            }
          }).then(function(user) {
            if (!user || !validPassword(password, user.password)) {
              res.status(401).json({
                message: 'Incorrect username or password'
              });
            } else {
              console.log("User ID" + user.id);
              var token = jwt.sign({
                data: {
                  uid: user.id
                }
              }, 'secret', {
                expiresIn: '12h'
              });

              res.set("Set-Cookie", `token=${token}`);
              res.status(200).json({
                message: 'Successfully aunthenticated.',
                "token": token
              });

              console.log("User authenticated");
              console.log("token: " + token);
              //res.redirect(200, "/record");
            }

          }).catch(function(error) {
            console.log(error);
            res.status(500).json({
              message: 'Internal Server error'
            });
          });
        });

          //Route to post the user to the database
          app.post("/signup", function(req, res) {
            var password = generateHash(req.body.password);
            db.Users.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: password

            }).then(function(dbUsers) {
              console.log("User Created");
              // Create the token
              var token = jwt.sign({
                data: {
                  uid: dbUsers.id
                }
              }, 'secret',{
                expiresIn: '12h'
              });
              res.set("Set-Cookie", `token=${token}`);
              res.status(200).json({
                "dbusers": dbUsers,
                "token": token
              });

              console.log("User authenticated");
              console.log("token: " + token);
            }).catch(function(error) {
              console.log(error);
              res.status(500).json(error);
            });

          });



};
