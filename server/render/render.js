const fs = require('fs');
const path = require('path');
const serverEntry = require('../../dist/server').default;
const { matchRoutes } = require('react-router-config');
const { renderToString } = require('react-dom/server');

// 注意指定utf8 否则为buffer
const template = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8');

module.exports.render = async (ctx, next) => {
    const content = serverEntry({url: ctx.req.url, routerContext: {}});
    const branch = matchRoutes(content.routes, ctx.req.url);

    const promises = branch.map(route => {
        const fetch = route.route.fetch;
        return fetch instanceof Function ? fetch(ctx.req) : Promise.resolve(null)
    });
    const requestData = await Promise.all(promises)
        .catch(err => {
            console.log(err)
        });
    const appString = renderToString(content.content);
    ctx.body = template.replace('<!-- app -->', appString).replace('// state', `window.__INIT_STATE__=${JSON.stringify({test:'test'})}`);
};
