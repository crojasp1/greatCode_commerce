import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Reemplaza esta URL con la URL real de la página que deseas extraer
    await page.goto('https://www.fincaraiz.com.co/arriendo/locales/bogota/bogota-dc');

    // Espera a que las cartas carguen
    await page.waitForSelector('.listingCard');

    const cardData = [];

    // Función para extraer información de las cartas en la página actual
    async function extractDataFromPage() {
      const data = await page.evaluate(() => {
        const cardElements = document.querySelectorAll('.listingCard');
        const extractedData = [];
    
        cardElements.forEach(card => {
          const nombre = card.querySelector('.lc-title')?.innerText || '';
          const link = card.querySelector('a.lc-cardCover')?.href || '';
          const description = card.querySelector('.card-image-gallery--img')?.src || '';
          const precio_arrendamiento = card.querySelector('.price strong')?.innerText || '';
          const size = card.querySelector('.lc-typologyTag strong')?.innerText || '';
          const barrio = card.querySelector('.lc-location')?.innerText || '';
          const agency = card.querySelector('.publisher strong')?.innerText || '';
    
          // Agregar la información extraída al array
          extractedData.push({
            nombre,
            link,
            description,
            precio_arrendamiento,
            size,
            barrio,
            agency
          });
        });
    
        return extractedData;
      });
    
      cardData.push(...data);
    }
    
    // Función para navegar a la siguiente página
    async function goToNextPage() {
      const nextPageButton = await page.$('li.ant-pagination-item a.ant-pagination-item-link');
      if (nextPageButton) {
        await nextPageButton.click();
        await page.waitForNavigation({ waitUntil: 'load' });
        return true;
      }
      return false;
    }
    
    // Bucle principal para extraer datos de múltiples páginas
    async function extractMultiplePages() {
      let hasNextPage = true;
    
      while (hasNextPage && cardData.length < 40) {
        // Extraer datos de la página actual
        await extractDataFromPage();
    
        // Ir a la siguiente página si es posible
        hasNextPage = await goToNextPage();
      }
    
      return cardData;
    }
    
    // Ejecutar la función para extraer los datos
    const cards = await extractMultiplePages();
    
    console.log(cards);

    console.log(cards);
    console.log(cards.length)

    await browser.close();
})();