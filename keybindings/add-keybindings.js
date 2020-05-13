const fs = require('fs');

const fileNameList = [
  'command-basic-move.json',
  'command-code.json',
  'command-edit.json',
  'command-escape.json',
  'command-file.json',
  'command-history.json',
  'command-jump-move.json',
  'command-mark.json',
  'command-search.json',
  'command-select.json',
  'command-window.json',
];

const commandList = fileNameList.reduce((accum, fileName) => {
  const json = JSON.parse(fs.readFileSync(`./${fileName}`));

  return [...accum, ...json];
}, []);

const packageJson = JSON.parse(fs.readFileSync('../package.json'));

packageJson.contributes.keybindings = commandList;

fs.writeFileSync('../package.json', JSON.stringify(packageJson));
