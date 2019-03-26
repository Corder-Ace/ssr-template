const router = require('koa-router')();
const { render } = require('../render/render');

router.get('*', render);

module.exports = router;
