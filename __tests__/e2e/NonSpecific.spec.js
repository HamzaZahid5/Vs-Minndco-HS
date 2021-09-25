/* global page */
import config from '../config';
const { PAGE_URL } = config;
const emulatorWarningSelector = '.firebase-emulator-warning';

describe('The app', () => {
  beforeAll(async () => {
    await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });
  });

  it('should be titled "MindCoRelief"', async () => {
    await expect(page.title()).resolves.toMatch('MindCoRelief');
  });
  it('should be running on emulators env', async () => {
    await page.waitForSelector(emulatorWarningSelector);
  });
});
