const fs = require('fs');
const path = require('path');
const axios = require('axios');
const serverEntry = require('../../dist/server').default;
const {matchRoutes} = require('react-router-config');
const {renderToString} = require('react-dom/server');

// 注意指定utf8 否则为buffer
const template = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8');

module.exports.render = async (ctx, next) => {
    const content = serverEntry({url: ctx.req.url, routerContext: {}});
    const branch = matchRoutes(content.routes, ctx.req.url);

    const promises = branch.map(route => {
        const fetch = route.route.fetch;
        return fetch instanceof Function ? fetch(ctx.req) : Promise.resolve(null)
    });
    // const result = await axios.get('http://m.aplum.com/site/banner-list?tab=tab1&viewtime=');
    // const promises = [];
    // result.data.forEach((item) => {
    //     if (item.style === 'product_showcase' && item.data_url) {
    //         promises.push(axios.get(`http://app.dev02.aplum-inc.com:8710/${item.data_url}`))
    //     }
    // });
    // console.log(result.data);
    // const requestData = await Promise.all(promises)
    //     .catch(err => {
    //         console.log(err)
    //     });
    // let count = 0;
    // result.data = result.data.map(item => {
    //     if (item.style === 'product_showcase') {
    //         item.test = requestData[count].data;
    //         count += 1;
    //     }
    //     return item
    // });

    const appString = renderToString(content.content);
    ctx.body = template.replace('<!-- app -->', appString).replace('// state', `window.__INIT_STATE__=${JSON.stringify({test: 12312})}`);
};
