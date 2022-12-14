const { Model, DataTypes } = require('sequelize');
const sequelize = require('./connection');

// create our User model
class User extends Model {}
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }

User.init(
{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true
    }
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        // password minimum length
        len:[4]
    }
    }
});
module.exports = user