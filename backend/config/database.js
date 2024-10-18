import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME, // nombre de la base de datos
  process.env.DB_USER, // usuario
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST, // host
    dialect: 'postgres', // dialecto que estamos utilizando
    port: process.env.DB_PORT // puerto
  }
);

// Probar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;
