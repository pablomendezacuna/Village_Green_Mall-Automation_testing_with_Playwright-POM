import { test } from '@playwright/test';
import { MainPage } from '../pages/Main_Page';
import { PlpPage } from '../pages/Plp';
import { getMallsToTest, getQueriesToTest } from '../utils/dataLoader';

const mallsToTest = getMallsToTest();
const queriesToTest = getQueriesToTest();

test.describe('Mall Search Validation', () => {
    for (const mall of mallsToTest) {
        for (const query of queriesToTest) {
            test(`${mall.name} | ${query.term}`, async ({ page }, testInfo) => {
                const mainPage = new MainPage(page);
                const plpPage = new PlpPage(page);

                testInfo.annotations.push({ type: 'Original URL', description: mall.url });

                try {
                    // Mantenemos tus funciones exitosas de navegación y búsqueda
                    await mainPage.navigateTo(mall.url);
                    await mainPage.searchFor(query.term, mall.lang);
                    
                    // El scroll humano que ya te funcionaba para fotos perfectas
                    await plpPage.scrollToBottom();
                    
                    testInfo.annotations.push({ type: 'Result URL', description: page.url() });
                } catch (error) {
                    testInfo.annotations.push({ type: 'ERROR URL', description: page.url() });
                    throw error;
                }
            });
        }
    }
});