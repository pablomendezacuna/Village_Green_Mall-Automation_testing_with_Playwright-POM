import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Forzamos la carga del .env indicando la ruta absoluta (Esto arregla el fallo en Mac)
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: false,
  reporter: [['html', { open: 'never' }]],
  use: {
    httpCredentials: {
      // Si process.env falla, el test fallará indicando que falta la credencial
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    ignoreHTTPSErrors: true, // Vital para Staging en Mac
    screenshot: { mode: 'on', fullPage: true },
    trace: 'on',
    video: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});