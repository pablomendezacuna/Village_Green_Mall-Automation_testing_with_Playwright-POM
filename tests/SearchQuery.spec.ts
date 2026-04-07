import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
    test.describe(`Mall: ${mall.name}`, () => {
        
        for (const query of queries) {
            test(`Search for "${query}" at ${mall.url}`, async ({ page }) => {
                const mainPage = new MainPage(page);
                
                console.log(`>>> NAVEGANDO A: ${mall.url}`);
                
                // 1. Ir a la URL
                await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });
                
                // 2. Esperar a que el cuerpo de la página sea visible
                await page.waitForSelector('body', { state: 'visible' });
                
                // 3. Captura manual para asegurar que aparezca en el reporte
                await page.screenshot({ path: `screenshots/${mall.name}-${query}.png`, fullPage: true });
                
                // 4. Log para confirmar en consola de GH
                console.log(`>>> CAPTURA REALIZADA EN: ${mall.name}`);
            });
        }
    });
}