module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'node ./node_modules/typescript/bin/tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
};
