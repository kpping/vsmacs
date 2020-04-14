const fs = require('fs');

const fileNameList = [
  'command-edit.json',
  'command-file.json',
  'command-move.json',
  'command-search.json',
  'command-window.json',
];

const commandList = fileNameList.reduce((accum, fileName) => {
  const json = JSON.parse(fs.readFileSync(`./${fileName}`));

  return [...accum, ...json];
}, []);

const packageJson = JSON.parse(fs.readFileSync('../package.json'));

packageJson.contributes.keybindings = commandList;

fs.writeFileSync('../package.json', JSON.stringify(packageJson));
