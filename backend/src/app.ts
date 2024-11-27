import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rideRoutes from './routes/rideRoutes';
import sequelize from './config/database';
import { estimateRide } from './controllers/rideController';


const app = express();

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

sequelize.sync().then(() => {
    console.log('Database connected!');
  });

// Middlewares
app.use(cors());
app.use(express.json());

app.post('/estimate', estimateRide);


// Routes
app.use('/rides', rideRoutes);

export default app;

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
