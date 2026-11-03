// Renders the A4 print view of the built site to a vector PDF.
// Usage: npm run build && npm run pdf   (or: npm run build:all)
import { copyFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { preview } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = `${root}public/QD-Company-Profile.pdf`;

await stat(`${root}dist/index.html`).catch(() => {
  console.error('dist/ not found — run "npm run build" first.');
  process.exit(1);
});

const server = await preview({ root, preview: { port: 4179, strictPort: true, open: false } });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto('http://localhost:4179/?print', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))),
    );
  });
  const count = await page.locator('.qd-page').count();
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await copyFile(out, `${root}dist/QD-Company-Profile.pdf`);
  const { size } = await stat(out);
  console.log(`PDF written: ${out} (${count} pages, ${(size / 1024 / 1024).toFixed(1)} MB)`);
} finally {
  await browser.close();
  server.httpServer.close();
}
