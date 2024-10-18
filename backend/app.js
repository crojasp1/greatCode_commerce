import express from 'express';
import sequelize from './config/database.js';
import localRoutes from './routes/localRoutes.js';
import saveScrapedDataToDB from './scrapers/scraper.js';

const app = express();
app.use(express.json());

// Sincronizar base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

// Rutas
app.use('/api', localRoutes);

// Iniciar el scraping de forma automática
saveScrapedDataToDB();

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});

