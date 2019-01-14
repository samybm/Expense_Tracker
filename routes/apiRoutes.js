var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  // Get all examples
  app.get("/api/expenses", function(req, res) {
    var searchParams = {
      UserId: req.query.UserId,
      date: {
        [Op.between]: [new Date(req.query.startDate), new Date(req.query.endDate)]
      },
      description: {
        [Op.like]: "%" + req.query.description + "%"
      }

    };
    if (req.query.CategoryId) searchParams.CategoryId = req.query.CategoryId; 
    db.Expense.findAll({
      where: searchParams, include: ["Category"]
    }).then(function(dbExpenses) {
      res.json(dbExpenses);
    });
  });

  // Create a new example
  app.post("/api/expenses", function(req, res) {
    db.Expense.create(req.body).then(function(dbExpense) {
      res.json(dbExpense);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
