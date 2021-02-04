'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      validate: {
        isEmail: {
          msg: 'Invalid format email'
        },
        notNull: {
          msg: `Email can't be null`
        },
        notEmpty: {
          msg: `Email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password can't be null`
        },
        notEmpty: {
          msg: `Password can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};