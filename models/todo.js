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
    title:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Title cannot be empty"
        }
      }
    },
    description: DataTypes.TEXT,
    status:{
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Description cannot be empty"
        }
      }
    },
    due_date:{
      type: DataTypes.DATE,
      allowNull : false,      
      validate : {
        notEmpty : {
          args : true,
          msg : "Date cannot be empty"
        },
        checkDate(date){
          if(date < new Date()){
            throw new Error("Tidak boleh memasukan tanggal kemarin")
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};