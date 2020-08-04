'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Title is required!`
        },
        notEmpty: {
          msg: `Title field can't be empty!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Description is required!`
        },
        notEmpty: {
          args: true,
          msg: `Description field can't be empty!`
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Status is required!`
        },
        notEmpty: {
          args: true,
          msg: `Status field can't be empty!`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Due date is required!`
        },
        notEmpty: {
          args: true,
          msg: `Due date field can't be empty!`
        },
        isDate: {
          args: true,
          msg: `Please use date format MM/DD/YYYY!`
        },
        isAfter: {
          args: new Date().toDateString(),
          msg: `Due Date can be filled with date after today.`
        }
      }
    },
    qrCode: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};