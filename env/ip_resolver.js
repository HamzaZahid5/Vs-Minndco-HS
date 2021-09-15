// DYNAMICALLY SET HOST IP FOR EMULATORS
// makes an attempt to guess te server ip in the LAN
// for custom ip or if is not guessed well, write the IP into lan.ip.env and it will prevale over guessed one

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readFileSync, appendFileSync } = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const guessedIp = Object.values(require('os').networkInterfaces())
  .flat()
  .filter(({ family, internal }) => family === 'IPv4' && !internal)
  .map(({ address }) => address)[0];
let customIP;
try {
  customIP = readFileSync(__dirname + '/lan.ip.env', { encoding: 'utf-8' });
} catch (e) {}
const IP = customIP ? customIP : guessedIp;
appendFileSync(__dirname + '/active.env.js', `export const IP = "${IP}";\n`);
