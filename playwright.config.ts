import { defineConfig, devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: (process.env.CI ? 1 : undefined) as unknown as number,

    // REPORTERS
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ],

    use: {
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
};

export default defineConfig(config);
