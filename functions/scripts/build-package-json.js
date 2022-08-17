import fs from 'fs';

const data = fs.readFileSync('./package.json', 'utf8');
const funcName = process.argc >= 2 ? process.argv[2] : process.env.FUNC_NAME;
const result = data.replace(/\$\{FUNC_NAME\}/g, funcName);

fs.writeFileSync('./build/package.json', result, {
  encoding: 'utf8',
});
