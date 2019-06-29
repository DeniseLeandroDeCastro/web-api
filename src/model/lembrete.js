const Sequelize = require("sequelize");
  const sequelize = require("../database/database");
   
  const Lembrete = sequelize.define("lembrete", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    conteudo: {
      allowNull: false,
      type: Sequelize.STRING(255),
      validate: {
        len: [2, 255]
      }
    }
    
    });
   
  module.exports = Lembrete;