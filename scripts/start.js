const checkPort = require('../utils/checkPort');
const opn = require('opn');
const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config.dev');
const DEFAULT_PORT = process.env.PORT || 3000;

// 监听Promise
// 如果Promise出现未被捕获的Catch 将抛出err
process.on('unhandledRejection', err => {
    throw err;
});

checkPort(DEFAULT_PORT)
    .then(port => {
        if (!port) {
            process.exit(0);
            return;
        }
        webpackConfig.entry.app.push(`webpack-dev-server/client?http://localhost:${port}`);
        const compiler = Webpack(webpackConfig);
        const devServerOptions = Object.assign({}, webpackConfig.devServer, {
            open: true,
            stats: {
                colors: true,
            },
        });
        const devServer = new WebpackDevServer(compiler, devServerOptions);

        devServer.listen(port, 'localhost', err => {
            if (err) {
                console.log(err);
            }
            // 清屏
            console.clear();
            console.log(chalk.cyan(`Starting server on http://localhost:${port}`));
            opn(`http://localhost:${port}`);
        });

        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                devServer.close();
                process.exit();
            });
        });
    });
