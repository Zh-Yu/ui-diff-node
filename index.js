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
  await page.goto(query.url, {
    timeout: 0,
    waitUntil: ['load', 'domcontentloaded', "networkidle0"]
  })
  if (query.specialDomToWailt) {
    await page.waitFor(`'${query.specialDomToWailt}'`)
  }
  if (query.devices) {
    await page.emulate(devices[query.devices])
  }
  await page.screenshot({
    path:'./result/result.png',
    clip: {
      x: 0,
      y: 0,
      width: Number(query.width),
      height: Number(query.height)
    }
  }).then(res => {
    ctx.status = 200;
    ctx.type = 'Buffer';
    ctx.body = res;
    console.log('finish')
  }).catch(error => {
    console.log(error)
  })
  await browser.close()
})
  

app.use(router.routes());
app.listen(3000);