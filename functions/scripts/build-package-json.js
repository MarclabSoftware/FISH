const fs = require('fs');

fs.readFile('./package.json', 'utf8', (err, data) => {
  if (err) {
    return console.error(err);
  }

  const funcName = process.argc >= 2 ? process.argv[2] : process.env.FUNC_NAME;
  const result = data.replace(/\$\{FUNC_NAME\}/g, funcName);

  fs.writeFile('./build/package.json', result, 'utf8', err => {
    if (err) {
      return console.log(err);
    }
  });
});
