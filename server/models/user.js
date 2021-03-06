'use strict';
const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
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
      unique: true,
      validate: {
        isEmail: {
          msg: `Email field must be in email format! e.g: yourname@example.com`
        },
        notEmpty: {
          msg: `Email field can't be empty!`
        },
        notNull: {
          msg: `Email is required!`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Password field can't be empty!`
        },
        notNull: {
          msg: `Password is required!`
        }
      }
    },
  }, {
    hooks: {
      beforeSave (user) {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};