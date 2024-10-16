const Local = require('../models/local');

// Obtener todos los locales
async function getLocales(req, res) {
  try {
    const locales = await Local.findAll();
    res.json(locales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los locales comerciales' });
  }
}

module.exports = {
  getLocales,
};
