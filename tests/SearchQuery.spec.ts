import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

// Configuración dinámica antes de iniciar los tests
const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
    test.describe(`Mall: ${mall.name}`, () => {
        
        for (const query of queries) {
            test(`Search for "${query}" at ${mall.url}`, async ({ page }) => {
                const mainPage = new MainPage(page);
                
                console.log(`>>> Iniciando Test: ${mall.name} | Lang: ${mall.lang} | Query: ${query}`);
                
                // Navegación con tiempo de espera extendido
                await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });
                
                // Aquí puedes llamar a tus métodos de Page Object
                // await mainPage.searchFor(query);
                
                console.log(`>>> Finalizado con éxito en: ${mall.url}`);
            });
        }
    });
}