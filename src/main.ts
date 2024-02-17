import { dirname } from 'path';
import { backup, getPackageJson, restore } from './common/package-utils';
import { getConfig } from './common/utils';
import { Commander } from './commander';

// setting global variable to the parent directory.
global._projectDir = dirname(__dirname);

async function main() {
  const packageJson = await getPackageJson();
  const backupPackage = await backup(packageJson);
  console.log('Backup complete');
  await restore(backupPackage);
  console.log('Restore complete');

  const config = getConfig(packageJson);
  console.log(config);
}

// main();

// console.log(process.argv.slice(2));

new Commander({
  command: 'test',
  commandOptions: [
    {
      option: '--option',
      shortOption: '-o',
      required: true,
    },
    {
      option: '--t',
      shortOption: '-t',
    },
  ],
  script: (options) => {
    console.log(options);
  },
  subCommands: [
    new Commander({
      command: 'sub',
      commandOptions: [
        {
          option: '--sub',
          shortOption: '-s',
          required: true,
        },
      ],
      script: (options) => {
        console.log(options);
      },
    }),
    new Commander({
      command: 'sub2',
      commandOptions: [
        {
          option: '--sub2',
          shortOption: '-s2',
          required: true,
        },
      ],
      script: (options) => {
        console.log(options);
      },
    }),
  ],
}).run(['test', 'sub', '-s', 'value']);
