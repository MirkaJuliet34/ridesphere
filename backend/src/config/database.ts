import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Driver from '../models/Driver';
import Ride from '../models/ride';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Validação e configuração das variáveis
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_HOST || !DB_PORT) {
  throw new Error('Faltam variáveis de ambiente necessárias para a conexão com o banco de dados.');
}

// Configuração do Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10) || 5432,
  dialect: 'postgres',
  models: [Driver, Ride], // Importa os modelos
});

export default sequelize;
