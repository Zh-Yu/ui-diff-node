const Koa = require('koa');
const cors = require('@koa/cors');
const router = require('koa-router')()
const devices = require('puppeteer/DeviceDescriptors')
const puppeteer = require('puppeteer');
const app = new Koa();

app.use(cors());

router.get('/', async (ctx, next) => {
  const query = ctx.request.query
  console.log(query)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()  
  // await page.emulate(devices['iPhone X'])    
  await page.goto(query.url)    
  // await page.waitForNavigation()
  await page.screenshot({
    path:'result.png',
    clip: {
      x: 0,
      y: 0,
      width: Number(query.width),
      height: Number(query.height)
    }
  }).then(res => {
    ctx.status = 200;
    ctx.type = 'blob';
    ctx.length = Buffer.byteLength(res);
    ctx.body = res;
  }).catch(error => {
    console.log(error)
  })
  await browser.close()
})

app.use(router.routes());
app.listen(3000);