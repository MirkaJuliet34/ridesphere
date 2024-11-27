import sequelize from './config/database';
import Ride from './models/ride';

sequelize.sync({ force: false }) // `force: false` preserva dados existentes
  .then(() => console.log('Banco de dados sincronizado com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));
  
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida!');
    await sequelize.sync({ alter: true }); // Sincroniza o banco de dados
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();
