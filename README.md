# Repackify

Repackify is a new package.json repackager that offers a suite of features for managing your `package.json` files. It provides functionalities such as refactoring, backing up `package.json` files, implementing environment variables within `package.json`, and more. The package is designed to be extensible, with more features planned for future releases.

## Installation

To install Repackify, use the following command:

```bash
npm install repackify
```

## Features

- ### Refactoring

    Repackify allows you to refactor your `package.json` files according to a provided configuration. This includes adding, removing, replacing properties, replacing text, and executing custom operations.
    
    The configuration file should be named `repackify.config.js` and should be placed in the root of your project. Here is an example of a configuration file:

    ```javascript
    module.exports = {
      // This will add the author property to the package.json file
      add: {
        author: "Nameer Haider",
      },
  
      // This will remove the devDependencies supertest and jest from the package.json file
      remove: ["devDependencies"],
  
      // This will replace the scripts property with the provided object
      replace: {
        scripts: {
          "start": "node index.js"
        }
      },
  
      // This will replace the text "packifyr" with "repackify" in the package.json file
      replaceText: [{ text: 'packifyr', replace: 'repackify' }],
  
      // This will execute a custom operation on the package.json file and then save the returned version
      customOperation: [
        (packageJson) => {
          packageJson.name = 'repackify';
          return packageJson;
        },
      ],
    };
    ```
  
    This can be done inside the package.json file as well, but it is recommended to use a configuration file for better organization and readability.
    ```json
    "repackify": {
      "remove": ["description", "author"]
    },
    ```

- ### Backup

    provides a backup feature that allows you to create a backup file of your `package.json` file.

- ### Restore

    Repackify allows you to restore your `package.json` file from a backup file.

- ### Environment Variables

  Repackify allows you to implement environment variables within your `package.json` file, simply set the environment variable key anywhere in the package.json file and it will be replaced after running the `refactor` command.
  ```
  "scripts": {
    "start": "start something --mode !{ENV_MODE}",
  },
  ```
  and then
  ```bash
  repack refactor
  ```

## CLI Commands

Repackify provides a command-line interface for managing `package.json` files. Here are the available commands:

### `repack backup`

This command backs up the `package.json` file and save it inside `package.backup`.

```bash
repack backup
```

### `repack restore`

This command restores the `package.json` file from the backup file and then delete it.

```bash
repack restore
```

### `repack refactor`

This command refactors the `package.json` file using the provided configuration. It accepts two optional parameters:

- `--env` or `-e`: Path to the base `.env` file.
- `--extra_env` or `-ee`: Used to set extra `.env` files (e.g. `-ee .env,.dev.env`).

```bash
repack refactor --env .env --extra_env .env,.dev.env
```

## License

Repackify is [MIT licensed](LICENSE).

## Contact

If you have any questions, feel free to open an issue on the [GitHub repository](https://github.com/NAMEER242/repackify).

## Author

Repackify is developed by Nameer Haider. You can contact him at nmeer5242@gmail.com or visit his [GitHub profile](https://github.com/NAMEER242) for more information.