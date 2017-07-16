var db = require('../../models/index');
var jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || 'secret';

module.exports = function(app) {

  // Authenticating the user, using jwt
  app.use(function(req, res, next) {

    // var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;
    // console.log('app.use', token);
    // console.log(req.body);
    console.log(req.cookies);
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;


    if (token) {

      jwt.verify(token, jwtSecret, function(err, decoded) {
        if (err) {
          return res.status(403).json({
            success: false,
            message: 'Authentication failed.'
          });
        } else {
          console.log("Decoding");
          req.decoded = decoded;
          console.log(req.decoded.data);
          console.log("UID: " + req.decoded.data.uid);

          next();
        }
      });

    } else {
      return res.status(403).send({
        success: false,
        message: 'Please provide valid token with request.'
      });
    }
  });


  //================================
  //        Html Routes
  //================================

  //Getting the Record page
  app.get("/record", function(req, res) {
    console.log(req.decoded.data);
    db.Users.findOne({
      where: {
        id: req.decoded.data.uid
      }
    }).then(function(user) {
      console.log(user.id);
      db.Records.findOne({
        where: {
          userId: user.id
        }
      }).then(function(record){
        console.log(record);
        if (!record) {
          res.render("createrecord")
        }else {

          res.render("record");
        }

      });
    });

  });

  //Getting the Vitals page
  app.get("/vitals", function(req, res) {
    res.render("vitals");
  });

  // Getting the appointments page
  app.get("/appointments", function(req, res) {
    res.render("appointments");
  });

  // Getting the medicines page
  app.get("/medicines", function(req, res) {
    res.render("medicines");
  });

  //===========================================
  //        Api Routes
  //===========================================
  app.get('/api/users', function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.status(200).json(dbUsers);
    });
  });

  app.get('/api/record', function(req, res) {
    db.Users.findOne({
      where: {
        id: req.query.uid // Need to have the JWT working
      }
    }).then(function(user) {
      console.log("Id in the Table: " + user);

      res.render("record");
    });
  });
};
