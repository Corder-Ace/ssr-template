const chalk = require('chalk');
const detect = require('detect-port-alt');
const inquirer = require('inquirer');
const execSync = require('child_process').execSync;
const execOptions = {
    encoding: 'utf8',
    stdio: [
        'pipe', // stdin (default)
        'pipe', // stdout (default)
        'ignore', //stderr
    ],
};

function getProcessForPort(port) {
    return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN', execOptions)
        .split('\n')[0]
        .trim();
}

// 检测端口是否被占用
function checkPort(defaultPort) {
    return detect(defaultPort, 'localhost')
        .then(port => {
            return new Promise(resolve => {
                if (defaultPort !== port) {
                    const message = `Something is already running on port ${defaultPort}.`;
                    const question = {
                        type: 'confirm',
                        name: 'shouldChangePort',
                        message:
                            chalk.yellow(
                                message + '\n\nWould you like to run the app on another port instead?'
                            ),
                        default: true,
                    };
                    inquirer.prompt(question).then(answer => {
                        if (answer.shouldChangePort) {
                            resolve(port);
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    resolve(port)
                }
            })
        }, err => console.log(err))
}

module.exports = checkPort;