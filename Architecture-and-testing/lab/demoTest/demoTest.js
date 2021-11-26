const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    await page.screenshot({ path: `example.png` });
    await browser.close();
})();
// можем да го направим да се вижда
// изчаква х 2сек между всяко действие
// const browser = await chromium.launch({ headless: false, slowMo: 2000 });
