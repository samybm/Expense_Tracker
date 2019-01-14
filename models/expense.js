module.exports = function(sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    // category: DataTypes.STRING,
    amount: DataTypes.DOUBLE
  });

  Expense.associate = function(models) {
    Expense.belongsTo(models.User, {});
    Expense.belongsTo(models.Category, {});
  }
  
  return Expense;
};

