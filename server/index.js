const Koa = require('koa');
const path = require('path');
// const index = require('./routes/index');

const { isDev } = require('./utils');
const app = new Koa();

app.use(async (ctx, next) => {
    const startTime = +new Date();
    await next();
    const ms = +new Date() - startTime;
    console.log(`${ctx.method}: ${ctx.url} - ${ms}:ms`);
});

if (isDev()){
    const devStatic = require('./utils/devStatic');
    devStatic(app);
}


//
// app.use(require('koa-static')(path.join(__dirname, '../dist')));
// app.use(index.routes(), index.allowedMethods());


app.listen(4000, function () {
   console.log('listen 4000')
});