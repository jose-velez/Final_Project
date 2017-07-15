//=================================
//        Dependencies
//=================================

var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var metodOverride = require("method-override");
var sequelize = require("sequelize");
var bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");

// Initialize express app
var app = express();

// Initialize the PORT
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(metodOverride("_method"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

//=====================================
//      Routes
//=====================================
require("./routes/public/account-api.js")(app);
require("./routes/private/user-api.js")(app);

//=====================================
//    Port Listener
//=====================================
app.listen(PORT, function(){
  console.log(`App running on Port: ${PORT}`);
});
