// Importando o Sequelize
import Sequelize from "sequelize";
import mysql from "mysql2/promise";

// Função para garantir que o banco existe antes de conectar com Sequelize
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
  });
  await connection.query("CREATE DATABASE IF NOT EXISTS sistema_pipas");
  await connection.end();
}

// Garante a existência do banco antes de exportar a conexão Sequelize
await ensureDatabaseExists();

// Criando os dados de conexão com o banco de dados
const connection = new Sequelize({
  dialect: "mysql",
  host: "127.0.0.1", // Força IPv4
  port: 3306, // Adicione esta linha se estiver usando uma porta diferente
  username: "root",
  password: "",
  database: "sistema_pipas", // Comente essa linha na primeira aplicação
  timezone: "-03:00", // Fuso horário de Brasília
});

// Exportando a conexão como default
export default connection;
