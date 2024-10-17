const puppeteer = require('puppeteer');
const axios = require('axios');
const Local = require('../models/local');

async function scrapeData() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://overpass-turbo.eu/';  // URL de ejemplo
  await page.goto(url);

  // Aquí realizas el scraping
  const scrapedData = await page.evaluate(() => {
    let data = [];
    // Simulación de obtención de datos de locales comerciales
    const elements = document.querySelectorAll('elementSelector'); // Cambiar por el selector real
    elements.forEach((el) => {
      const nombre = el.querySelector('.nombre').innerText;
      const direccion = el.querySelector('.direccion').innerText;
      const barrio = el.querySelector('barrio').innerText;
      const precio_arrendamiento = el.querySelector('.precio').innerText;
      const descripcion = el.querySelector('.descripcion').innerText;

      data.push({
        nombre,
        direccion,
        barrio,
        precio_arrendamiento,
        descripcion,
      });
    });
    return data;
  });

  await browser.close();
  return scrapedData;
}

// Guardar los datos scrapeados en PostgreSQL
async function saveScrapedDataToDB() {
  try {
    const data = await scrapeData();

    // Guardar en la base de datos
    for (const local of data) {
      await Local.create({
        nombre: local.nombre,
        direccion: local.direccion,
        barrio: local.barrio,
        precio_arrendamiento: local.precio,
        descripcion: local.descripcion,
      });
    }

    console.log('Datos almacenados en la base de datos');
  } catch (error) {
    console.error('Error al guardar datos en la base de datos:', error);
  }
}

module.exports = saveScrapedDataToDB;
