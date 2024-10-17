const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const localRoutes = require('./routes/localRoutes');
const saveScrapedDataToDB = require('./scrapers/scraper');

const app = express();
app.use(express.json());

// Configurar CORS para permitir solicitudes del frontend
app.use(cors({
  origin: 'http://localhost:3001'  // Dirección del frontend React
}));

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

