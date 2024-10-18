import puppeteer from 'puppeteer';
import axios from 'axios';
import Local from '../models/local.js'; // Asegúrate de que el modelo Local esté correctamente configurado

// Función para scrapeo de datos
export async function scrapeData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.fincaraiz.com.co/arriendo/locales/bogota/bogota-dc');

        await page.waitForSelector('.listingCard');

        // Extrae la información de cada carta
        const cards = await page.evaluate(() => {
            // Seleccionar todas las cartas
            const cardElements = document.querySelectorAll('.listingCard');
            const cardData = [];

            // Recorrer cada carta y extraer la información
            cardElements.forEach(card => {
                const name = card.querySelector('.lc-title')?.innerText || '';
                const link = card.querySelector('a.lc-cardCover')?.href || '';
                const image = card.querySelector('.card-image-gallery--img')?.src || '';
                const price = card.querySelector('.price strong')?.innerText || '';
                const size = card.querySelector('.lc-typologyTag strong')?.innerText || '';
                const location = card.querySelector('.lc-location')?.innerText || '';
                const agency = card.querySelector('.publisher strong')?.innerText || '';

                // Agrega la información extraída al array
                cardData.push({
                    name,
                    link,
                    image,
                    price,
                    size,
                    location,
                    agency
                });
            });

            return cardData;
        });

        console.log(cards);
        return cards; // Devolver los datos extraídos
    } catch (error) {
        console.error('Error durante el scrapeo de datos:', error);
        return [];
    } finally {
        await browser.close();
    }
}


/*
(async function scrapeData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.fincaraiz.com.co/arriendo/locales/bogota/bogota-dc');

    // Espera a que aparezca el contenedor principal que tiene los elementos que quieres extraer
    await page.waitForSelector('li.sc-gPEVay.dibcyk');

    // Extraer la información de cada li
    const items = await page.evaluate(() => {
        // Seleccionar todos los elementos li con la clase proporcionada
        const listElements = document.querySelectorAll('li.sc-gPEVay.dibcyk');
        const scrapedData = [];

        // Recorrer cada elemento y extraer la información relevante
        listElements.forEach(li => {
            const title = li.querySelector('h2.card-title div')?.innerText || '';
            const image = li.querySelector('img.card-img')?.src || '';
            const link = li.querySelector('a')?.href || '';
            const price = li.querySelector('p.card-subitem.text-black')?.innerText || '';
            const area = li.querySelector('.card-item')?.nextElementSibling?.innerText || '';

            scrapedData.push({
                title,
                image,
                link,
                price,
                area
            });
        });

        return scrapedData;
    });

    console.log(items);

    await browser.close();
})();
*/
// Guardar los datos scrapeados en PostgreSQL
async function saveScrapedDataToDB() {
    try {
        const data = await scrapeData();

        // Guardar en la base de datos
        for (const local of data) {
            await Local.create({
                name: local.name,
                link: local.link,
                image: local.image,
                price: local.price,
                size: local.size,
                location: local.location,
                agency: local.agency,
            });
        }

        console.log('Datos almacenados en la base de datos');
    } catch (error) {
        console.error('Error al guardar datos en la base de datos:', error);
    }
}

export default saveScrapedDataToDB;
