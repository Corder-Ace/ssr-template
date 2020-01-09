const axios = require('axios');
const webpack = require('webpack');
const serverConfig = require('../../config/webpack.config.server');
const path = require('path');
const MemoryFs = require('memory-fs');
const router = require('koa-router')();
const ReactDomServer = require('react-dom/server');
const proxyMiddleware = require('http-proxy-middleware');
const c2k = require('koa-connect');

function getTemplate() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/index.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject)
    })
}

const Module = module.constructor;
const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
let serverBundle;

serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    // console.log(stats);
    // stats = JSON.parse(stats);
    // stats.errors.forEach(error => console.error(error));
    // stats.warnings.forEach(warn => console.warn(warn));

    // 获取bundle路径
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );

    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, 'server-entry.js');
    serverBundle = m.exports.default;
});

router.get('*', async (ctx, next) => {
    const template = await getTemplate().then(_template => {
        const content = ReactDomServer.renderToString(serverBundle);
        return _template.replace('<!-- app -->', content);
    });
    ctx.body = template
});

async function proxy(ctx, next) {
    if (ctx.url.startsWith('/static') || ctx.url.indexOf('hot-update')) {
        const middleware = proxyMiddleware({
                target: 'http://localhost:3000'
            }
        );
        ctx.respond = false;
        const koaMiddleware = c2k(middleware);
        return await koaMiddleware(ctx, next);
    }
    return next();
}

module.exports = function (app) {
    app.use(proxy);
    app.use(router.routes(), router.allowedMethods())
};