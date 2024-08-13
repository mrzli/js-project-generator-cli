# Change Log

All notable changes to the "js-project-generator-cli" will be documented in this file.

## [Unreleased]

## [0.0.20] - 2024-08-13

### Fixed

- Fix path for reading 'package.json' (for version) that was causing the CLI to crash.

## [0.0.19] - 2024-08-11

### Changed

- Replace use of `@gmjs/fs-async` with `@gmjs/file-system`.
- Update packages to latest versions.
- Update pnpm package manager version.
- Implement small code change to a change in `@gmjs/package-json` dependency.

## [0.0.18] - 2024-07-01

### Changed

- Update `@gmjs/js-project-generator` to latest version.
- Update npm scripts.
- Update other deps.

## [0.0.17] - 2024-06-27

### Changed

- Add hashbang to `index.ts`.
- Update eslint configuration.

## [0.0.16] - 2024-06-27

### Changed

- Update packages to latest versions.
- Update project tooling and configurations.
- Update CLI code to the latest version of `@gmjs/js-project-generator`.

## [0.0.15] - 2023-09-03

### Changed

- Update packages to latest versions.
- Make CLI work with latest version of `@gmjs/js-project-generator`.

## [0.0.14] - 2023-08-18

### Changed

- Update packages to latest versions.
- Use 'commander' for CLI.

## [0.0.13] - 2023-07-22

### Changed

- Update packages to latest versions.

## [0.0.12] - 2023-06-11

### Fixed

- Fix issue where project was being generated on version or help command (second try).

## [0.0.11] - 2023-06-11

### Fixed

- Do not execute project generation when help or version command is triggered.

## [0.0.10] - 2023-06-09

### Fixed

- Fix building/publishing.

## [0.0.9] - 2023-06-04

### Changed

- Update `@gmjs/js-project-generator` version.
- Update publishing method.

## [0.0.8] - 2023-06-04

### Fixed

- Fix double application of `output` directory option when generating a project.

## [0.0.7] - 2023-06-04

### Fixed

- Fix path to home directory default config file.

## [0.0.6] - 2023-06-03

### Fixed

- Fix issue with configuration validation by updating `@gmjs/js-project-generator`.

## [0.0.5] - 2023-06-03

### Fixed

- Fix issue with configuration merge.

## [0.0.4] - 2023-06-03

### Changed

- Update dependencies.

### Added

- Add actual call to project generation.
- Implement handling for default configurations at `./jsgen.config.js` and `~/.jsgen.config.js`.

## [0.0.3] - 2023-06-02

### Added

- Implement usage of `@gmjs/js-project-generator`.

## [0.0.2] - 2023-06-02

### Fixed

- Include shebang in `index.ts`.

## [0.0.1] - 2023-06-02

### Added

- Add initial cli implementation, to test how it (the CLI itself) works.
- Add everything else needed for initial release.

<!--
See: https://common-changelog.org/

## [0.0.1] - 2023-01-01

### Changed

### Added

### Removed

### Fixed
-->
