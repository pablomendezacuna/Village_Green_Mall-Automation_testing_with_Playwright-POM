import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
  test.describe(`Mall: ${mall.name}`, () => {
    
    for (const query of queries) {
      test(`Search: ${query}`, async ({ page }) => {
        const mainPage = new MainPage(page);

        // PASO 1: NAVEGACIÓN Y LOG DE URL
        await test.step(`Maps to ${mall.url}`, async () => {
          await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });
          console.log(`>>> URL Inicial: ${mall.url}`);
        });

        // PASO 2: BÚSQUEDA (CON LANG)
        await test.step(`Execute Search for "${query}" [${mall.lang}]`, async () => {
          await mainPage.searchFor(query, mall.lang);
          await page.waitForLoadState('networkidle');
          // Espera pequeña para que el buscador procese el redireccionamiento
          await page.waitForTimeout(2000); 
        });

        // PASO 3: SCROLL Y CAPTURA DE POP-UPS / FULL PAGE
        await test.step('Auto-scroll and Full Page Screenshot', async () => {
          // Reportamos la URL final en el reporte
          const finalUrl = page.url();
          console.log(`>>> URL Final de Resultados: ${finalUrl}`);

          // Script de scroll para cargar imágenes y cerrar posibles pop-ups de carga
          await page.evaluate(async () => {
            await new Promise((resolve) => {
              let totalHeight = 0;
              let distance = 100;
              let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                  clearInterval(timer);
                  resolve(null);
                }
              }, 100);
            });
          });

          // Volvemos arriba para la foto si es necesario o capturamos Full Page
          await page.screenshot({ 
            path: `playwright-report/data/${mall.name}-${query}.png`, 
            fullPage: true 
          });
        });
      });
    }
  });
}