const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    try {
        await page.goto('http://localhost:3001');
        await delay(3000);
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        if (!bodyHTML || bodyHTML.includes('<div id="root"></div>') && bodyHTML.length < 100) {
            console.log("HOME PAGE IS EMPTY. React failed to mount.");
        } else {
            console.log(`HOME PAGE RENDERED SUCCESSFULLY. HTML Length: ${bodyHTML.length}`);
        }

        // Try the blog page
        await page.goto('http://localhost:3001/blog');
        await delay(3000);
        const blogHTML = await page.evaluate(() => document.body.innerHTML);
        if (!blogHTML || blogHTML.includes('<div id="root"></div>') && blogHTML.length < 100) {
            console.log("BLOG PAGE IS EMPTY.");
        } else {
            console.log(`BLOG PAGE RENDERED SUCCESSFULLY. HTML Length: ${blogHTML.length}`);
        }

    } catch (err) {
        console.log("SCRIPTERROR", err);
    } finally {
        await browser.close();
    }
})();
