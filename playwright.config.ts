import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configurado para incluir todo en el HTML
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  
  // Carpeta donde se guardan evidencias temporales
  outputDir: 'test-results/',

  use: {
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    ignoreHTTPSErrors: true,
    
    // FORZAR EVIDENCIAS VISUALES
    screenshot: 'on', 
    video: 'on',
    trace: 'on', // El trace permite ver el "antes y después" de cada clic
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});