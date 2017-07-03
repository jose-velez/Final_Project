// Rendering the first page

module.exports = function(app){
  // Getting the login page
  app.get("/", function(req, res){
    res.render("login");
  });


};
