const devices = require('puppeteer/DeviceDescriptors')
const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()    
    await page.emulate(devices['iPhone X'])    
    await page.goto('http://www.baidu.com')    
    await page.type('#index-kw', 'puppeteer')  
    await page.evaluate(() => {
      document.querySelector('#index-bn').click();
    });
    await page.waitForNavigation({timeout: 3000})          
    await page.screenshot({ path: './baidu_iphone_X_search_puppeteer.png' })
})()

