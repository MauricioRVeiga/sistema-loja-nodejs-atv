import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Usuario = connection.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cadastro: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_DATE"),
  },
  acesso: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Usuario",
  },
  endereco: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Usuario;
