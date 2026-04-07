import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
  test.describe(`Mall: ${mall.name}`, () => {
    
    for (const query of queries) {
      test(`Search: ${query} | Mall: ${mall.name}`, async ({ page }) => {
        const mainPage = new MainPage(page);

        // 1. Navegar al Mall
        console.log(`>>> Navegando a: ${mall.url}`);
        await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });

        // 2. Realizar la búsqueda usando el Page Object
        // Pasamos query y lang para que no marque error rojo
        await mainPage.searchFor(query, mall.lang);

        // 3. ESPERA CRUCIAL: Esperamos a que la URL cambie o aparezcan resultados
        // Esto garantiza que la foto no salga vacía
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000); // Tiempo de gracia para que carguen las imágenes de productos

        // 4. Reporte de la URL final con la búsqueda aplicada
        const finalUrl = page.url();
        console.log(`>>> URL de resultados: ${finalUrl}`);

        // 5. Captura de pantalla de los resultados reales
        await page.screenshot({ 
          path: `playwright-report/data/${mall.name}-${query}.png`, 
          fullPage: true 
        });

        // Verificación mínima para que el reporte marque éxito real
        expect(finalUrl).toContain(query.replace(/ /g, '+') || query);
      });
    }
  });
}