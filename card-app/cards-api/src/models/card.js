const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Card = sequelize.define('Card', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last4Digits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statementDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dueAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    minimumDue: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    totalLimit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    outstandingBalance: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    availableLimit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'Uncategorized'
    }
  });

  return Card;
};
