import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

// Obtenemos los datos antes de los tests
const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
  test.describe(`Mall: ${mall.name}`, () => {
    
    for (const query of queries) {
      // El nombre del test incluye la URL para el reporte
      test(`Search: "${query}" | URL: ${mall.url}`, async ({ page }) => {
        const mainPage = new MainPage(page);

        console.log(`>>> Iniciando Test: ${mall.name} (${mall.lang})`);
        
        // 1. Navegación
        await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });

        // 2. EJECUCIÓN DE LA BÚSQUEDA (CORREGIDO: Ahora enviamos 2 argumentos)
        // Pasamos 'query' y el 'mall.lang' que viene del JSON
        await mainPage.searchFor(query, mall.lang);

        // 3. Verificación y Captura
        await page.waitForLoadState('networkidle');
        
        // Creamos la carpeta screenshots si no existe (opcional, Playwright lo maneja)
        await page.screenshot({ 
          path: `test-results/screenshots/${mall.name}-${query}.png`, 
          fullPage: true 
        });

        console.log(`>>> Éxito en ${mall.name}: Búsqueda de "${query}" realizada.`);
      });
    }
  });
}