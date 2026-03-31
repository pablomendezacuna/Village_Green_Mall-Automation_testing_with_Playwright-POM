import { Page } from '@playwright/test';
import { closeIntrusivePopups } from '../utils/PopupHandler';

export class PlpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async scrollToBottom() {
        // 1. Initial pause for delayed popups
        await this.page.waitForTimeout(3000);
        
        // 2. CSS Sniper to hide popups
        await closeIntrusivePopups(this.page);

        // 3. HUMAN SCROLL: Longer jumps with longer pauses to force loading
        await this.page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                let distance = 500; // Half-screen jump
                let maxScrolls = 30; // Security failsafe
                let currentScrolls = 0;
                
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    
                    totalHeight += distance;
                    currentScrolls++;

                    if (totalHeight >= scrollHeight || currentScrolls >= maxScrolls) {
                        clearInterval(timer);
                        resolve(null);
                    }
                }, 400); // CRITICAL PAUSE: 400ms stop at each jump to let the image load
            });
        });
        
        // 4. Final sweep of popups
        await closeIntrusivePopups(this.page);

        // 5. Tolerance for infinite trackers
        await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {
            console.log('Networkidle ignored (possible infinite tracker).');
        });
        
        // 6. Final extra time to render images in the last row
        await this.page.waitForTimeout(4000); 
    }
}