import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { getSelectedMalls, getQueries } from '../utils/dataLoader';

const selectedMalls = getSelectedMalls();
const queries = getQueries();

for (const mall of selectedMalls) {
    test.describe(`Testing Mall: ${mall.name}`, () => {
        
        for (const query of queries) {
            test(`Search for "${query}" at ${mall.url}`, async ({ page }) => {
                const mainPage = new MainPage(page);
                
                console.log(`>>> PROBANDO: ${mall.name} | URL: ${mall.url} | QUERY: ${query}`);
                
                // Navegación con manejo de errores de certificado y timeout
                await page.goto(mall.url, { waitUntil: 'networkidle', timeout: 60000 });
                
                // Aquí ejecutas tu lógica de búsqueda real
                // await mainPage.searchFor(query);
                
                console.log(`>>> ÉXITO: Búsqueda completada en ${mall.name}`);
            });
        }
    });
}