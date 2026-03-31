import { Page } from '@playwright/test';

export async function closeIntrusivePopups(page: Page) {
    // 1. CSS INJECTION: 
    // This ensures that if the pop-up tries to appear DURING the scroll, it renders invisibly and doesn't block the photo.
    await page.addStyleTag({ content: `
        .GiftCardModal_container__nshU_,
        [class*="GiftCardModal"],
        iframe[title="SP Consent Message"]
        { display: none !important; visibility: hidden !important; opacity: 0 !important; z-index: -9999 !important; }
    `}).catch(() => {});

    // 2. Try to close them by clicking to free up the page (in case they block internal scrolling)
    
    // Gift Card Popup
    try {
        // Find the container first, and inside it a button that says close
        const modal = page.locator('.GiftCardModal_container__nshU_, [class*="GiftCardModal"]').first();
        if (await modal.isVisible({ timeout: 1500 })) {
            const btn = modal.locator('button').filter({ hasText: /close/i }).first();
            await btn.click({ force: true });
        }
    } catch (e) { /* Ignored */ }

    // Cookies Popup (Kings Cross)
    try {
        const acceptKingsCross = page.getByRole('button', { name: /Accept All/i });
        if (await acceptKingsCross.isVisible({ timeout: 1500 })) {
            await acceptKingsCross.click({ force: true });
        }
    } catch (e) { /* Ignored */ }

    // Cookies Iframe (Mall of America)
    try {
        const moaIframe = page.frameLocator('iframe[title="SP Consent Message"]');
        const acceptMoa = moaIframe.getByRole('button', { name: /Accept All/i });
        if (await acceptMoa.isVisible({ timeout: 2000 })) {
            await acceptMoa.click({ force: true });
        }
    } catch (e) { /* Ignored */ }
}