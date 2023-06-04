# CLI for JavaScript/TypeScript Project Generator

This is a CLI for generating a JavaScript/TypeScript project.

## Installation

```bash
npm install -g @gmjs/js-project-generator-cli
```

## Usage

```
Usage
  $ jsgen <input>

Options
  --config, -c        Path to config file
  --project-type, -t  Project type (shared, node, cli, browser, react)
  --output, -o        Output directory
  --project-name, -p  Project name

Examples
  $ jsgen --config config.json --output . --project-name my-project
```

## Configuration

- See [here](https://github.com/mrzli/js-project-generator) for details on the configuration options.

### Calculating Configuration

The CLI apply configuration in this order, with options in each subsequent configuration overwriting options in the previous configuration (last one wins). Each required option must be set in at least one configuration.

- Configuration at `$HOME_DIR/.jsgen.config.js`.
- Configuration at `./jsgen.config.js`.
- Configuration passed via CLI `--config`/`-c` option.
- Any configuration options passed via other CLI options (see above).
