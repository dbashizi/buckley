const chalk = require('chalk');
const remediationConfig = require('../cn-remediation-config.json');
const {readConfigFile} = require('./utils');

const scriptingBackends = {0: 'Mono', 1: 'IL2CPP'};
const platforms = ['Android', 'iOS'];

function getScriptingBackend(playerSettings, platform) {
    return scriptingBackends[playerSettings.scriptingBackend[platform]];
}

function verifyScriptingBackend(playerSettings, platform, target) {
    const actualScriptingBackend = playerSettings.scriptingBackend[platform];
    if (target.scriptingBackend !== actualScriptingBackend) {
        const errorMessage = chalk.red(`Incorrect scripting backend for ${platform}: Expected: ${chalk.bold(scriptingBackends[target.scriptingBackend])} | Actual: ${chalk.bold(scriptingBackends[actualScriptingBackend])}`);
        console.error(errorMessage);
        return false;
    }
    console.log(chalk.green(`${platform} scripting matches target (${chalk.bold(scriptingBackends[target.scriptingBackend])})`));
    return true;
}

function verifyAndroid(playerSettings, target) {
    return verifyScriptingBackend(playerSettings, 'Android', target);
}

function verifyIOS(playerSettings, target) {
    return verifyScriptingBackend(playerSettings, 'iOS', target);

}

module.exports = {verifyAndroid, verifyIOS};



