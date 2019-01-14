module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    monthly_income: DataTypes.INTEGER
  });
  return User;
};
