'use strict';
const {
  Model
} = require('sequelize');

const { hashing, checkPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Card, {through: models.UserCard, foreignKey: "userId" })
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
    hooks: {
      beforeCreate: (user, option) => {
        let passwordHash = hashing(user.password);
        user.password = passwordHash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};