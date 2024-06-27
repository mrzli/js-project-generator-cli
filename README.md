# CLI for JavaScript/TypeScript Project Generator

This is a CLI for generating a JavaScript/TypeScript project.

## Installation

```bash
npm install -g @gmjs/js-project-generator-cli
```

## Usage

### Main Command

```
Usage: jsgen [options] [command]

TypeScript project generator.

Options:
  -V, --version                  output the version number
  -h, --help                     display help for command

Commands:
  generate|g [options] [output]  Generate a new project
  configure|c                    Configure the global settings
  help [command]                 display help for command
```

### Generate Command

Generates a new project.

Uses the global configuration file at `$HOME_DIR/.jsgen/config.js` and the command line options passed to this command.

Global configuration is required to run this command, and currently values specified there cannot be overridden by command line options.

If there are any other missing command line options, you will be prompted to enter them.

```
Usage: jsgen generate|g [options] [output]

Generate a new project

Arguments:
  output                            Output directory (default: ".")

Options:
  -p, --project-name <projectName>  Project name
  -t, --project-type <projectType>  Project type (choices: "app-vanilla", "app-react", "app-node", "app-nest", "app-cli", "lib-browser", "lib-node",
                                    "lib-shared")
  -s, --storybook                   Use Storybook
  -S, --no-storybook                Do not use Storybook
  -c, --command-name <commandName>  Command name
  -h, --help                        display help for command

Examples:
  jsgen generate -p my-project -t app-react -s /path/to/output
  jsgen g -p my-project -t app-react -S .
```

### Configure Command

Creates a global configuration file at `$HOME_DIR/.jsgen/config.js`. This file needs to exists and be filled with the desired configuration options before you are able to run the `generate` command.

Global configuration contains author data, such as name, email etc.

After running the `configure` you will be prompted to enter each configuration option.

```
Usage: jsgen configure|c [options]

Configure the global settings

Options:
  -h, --help  display help for command

Examples:
  jsgen configure
  jsgen c
```

## Configuration

- See [here](https://github.com/mrzli/js-project-generator) for details on the configuration options.
