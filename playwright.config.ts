import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

/**
 * Carga el .env localmente. En GitHub Actions, dotenv se ignora 
 * y se usan los Secrets inyectados en el sistema.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    // Inyecta credenciales para Staging desde .env (PC/Mac) o Secrets (GH)
    httpCredentials: {
      username: process.env.MALL_HTTP_USER || '',
      password: process.env.MALL_HTTP_PASSWORD || '',
    },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});