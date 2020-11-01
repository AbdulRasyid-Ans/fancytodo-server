'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
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
    email:{
      type :DataTypes.STRING,
      allowNull:false,
      unique:{
        args: true,
        msg: "Email already exist"
      },
      validate:{
        isEmail : {
          args: true,
          msg : "Email must be example@email.com"
        },
        notEmpty : {
          args: true,
          msg : "Email cannot be empty"
        }
      }
    },
    password:{
      type:DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : "Password cannot be empty"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(User){
        const salt = bcrypt.genSaltSync(+process.env.SALT);
        const hash = bcrypt.hashSync(User.password,salt);
        User.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};