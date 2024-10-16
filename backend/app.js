const express = require('express');
const sequelize = require('./config/database');
const localRoutes = require('./routes/localRoutes');
const saveScrapedDataToDB = require('./scrapers/scraper');

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

