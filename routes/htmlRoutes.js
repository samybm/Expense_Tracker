var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Category.findAll().then(function(dbCategories) {
      res.render("index", {
        categories: dbCategories
      });
    })
        
  });

  app.get("/viewexpenses", function(req, res) {
    db.Category.findAll().then(function(dbCategories) {
      res.render("viewexpenses", {
        categories: dbCategories
      });
    })
  })

  app.get("/dashboard", function(req, res) {
    db.Category.findAll().then(function(dbCategories) {
      res.render("dashboard", {
        categories: dbCategories
      });
    })
  })

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
