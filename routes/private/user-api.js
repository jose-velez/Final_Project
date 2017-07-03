
module.exports = function(app){

  //Getting the Record page
  app.get("/record", function(req, res){
    res.render("record");
  });

  //Getting the Vitals page
  app.get("/vitals", function(req,res){
    res.render("vitals");
  });

  // Getting the appointments page
  app.get("/appointments", function(req, res){
    res.render("appointments");
  });

  // Getting the medicines page
  app.get("/medicines", function(req, res){
    res.render("medicines");
  });
};
