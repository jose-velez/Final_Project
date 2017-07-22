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
          id: user.id
        }
      }).then(function(record){
        // Look if there's no record
        if (record === null) {
          // if there's no record is going to render the create record page.
          res.render("createrecord");
        }else {
          console.log(record);
          console.log("Date of Birth");
          var dob = record.dateOfBirth;
          db.Vitals.findOne({
            where: {
              id: record.id
            }
          }).then(function(vitals){
            var recordObj = {
              name: record.name,
              dateOfBirth: record.dateOfBirth,
              contactName: record.contactName,
              contactNumber: record.contactNumber,
              relation: record.relation,
              gender: record.gender,
              heartRate: vitals.heartRate,
              bloodGlucose: vitals.bloodGlucose,
              weight: vitals.weight,
              systolic: vitals.systolic,
              diastolic: vitals.diastolic,
              bodyTemp: vitals.bodyTemp
            };
            console.log("Record OBJ");
            console.log(recordObj);
            // If there's a record is going to display the record.
            res.render("record", recordObj);

          });


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
  // Route to create the Record
  app.post('/api/record', function(req, res) {
    console.log("Api/record route");
    console.log(req.body);
    console.log("user id request");
    console.log(req.decoded.data.uid);
    db.Records.create({
      name: req.body.recordName,
      dateOfBirth: req.body.dateOfBirth,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
      relation: req.body.relation,
      medicalConditions: req.body.medicalConditions,
      UserId: req.decoded.data.uid
    }).then(function(dbRecord){
      console.log("then dbrecord");
      console.log(dbRecord);
      res.json({dbRecord, success: true});
    }).catch(function(error){
      console.log("api/record error");
      console.log(error);
      res.status(500).json(error);
    });

  });

  app.post('/api/vitals', function(req, res) {
    console.log("Api/Vitals route");
    db.Vitals.create({
      heartRate: req.body.heartRate,
      bloodGlucose: req.body.bloodGlucose,
      weight: req.body.weight,
      systolic: req.body.systolic,
      diastolic: req.body.diastolic,
      bodyTemp: req.body.bodyTemp,
      UserId: req.decoded.data.uid
    }).then(function(dbVitals){
      console.log("DbVitals");
      console.log(dbVitals);
      res.json({dbVitals, success: true});
    }).catch(function(error){
      console.log("api/vitals error");
      res.status(500).json(error);
    });
  });

//=======================================
//        Functions needed
//=======================================
// Function to Calculate the Age of the user

function getAge(dateString)
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}
};
