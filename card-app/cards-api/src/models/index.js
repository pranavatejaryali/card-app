const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

sequelize
  .authenticate()
  .then(() => console.log("MySQL connected"))
  .catch((err) => console.error("Unable to connect to MySQL:", err));

const User = require("./user")(sequelize);
const Card = require("./card")(sequelize);

User.hasMany(Card, { foreignKey: "userId" });
Card.belongsTo(User, { foreignKey: "userId" });

sequelize.sync();

module.exports = {
  User,
  Card,
  sequelize,
};
