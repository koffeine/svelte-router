# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [Unreleased]


## [6.0.2] - 2025-09-08

### Fixed

- Fixed lone `?` appended to url


## [6.0.1] - 2025-09-08

### Fixed

- Fixed handling of query params when they were present in both the path and options


## [6.0.0] - 2025-09-04

### Added

- Added export for Route type
- Added the same options to link as navigate has
- Added support for base url

### Changed

- Changed type of value for missing optional parameters for params in route from null to undefined
- Changed types of values for params and query in navigate from any to string

### Fixed

- Fixed initial state to be type-safe
- Fixed types of values for params and query in route to include undefined


## [5.0.1] - 2025-08-31

### Fixed

- Fixed link to include query on navigation
- Fixed navigate to consider query when checking if url has changed


## [5.0.0] - 2025-08-31

### Changed

- Changed route from a store to a state
- Changed link from an Action to an Attachment
- Changed link from using addEventListener to on (svelte/events)
- Changed init from using addEventListener to on (svelte/events)

### Removed

- Removed package.json from exports


## [4.0.6] - 2025-07-10

### Changed

- Publish source files


## [4.0.5] - 2025-05-13

### Fixed

- Fixed type definition for link to use the proper Action type


## [4.0.4] - 2025-05-09


## [4.0.3] - 2025-05-08

### Fixed

- Fixed types export


## [4.0.2] - 2025-05-07


## [4.0.1] - 2025-05-07

### Fixed

- Fixed types for components with required props


## [4.0.0] - 2025-02-19

### Changed

- Updated to Svelte 5


## [3.0.1] - 2024-09-13

### Changed

- Added support for node16, nodenext & bundler module resolution strategies


## [3.0.0] - 2023-12-07

### Changed

- Updated to regexparam 3


## [2.0.0] - 2023-06-23

### Changed

- Updated to Svelte 4


## [1.0.5] - 2022-12-27

### Fixed

- Fixed types for svelte-check@3


## [1.0.4] - 2022-02-26

### Changed

- Made init and navigate functions awaitable


## [1.0.3] - 2021-10-28

### Fixed

- Fixed warning with vite-plugin-svelte/rollup-plugin-svelte


## [1.0.2] - 2021-10-28

### Fixed

- Fixed type declaration


## [1.0.1] - 2021-10-23

### Fixed

- Fixed type declaration


## [1.0.0] - 2021-10-23

### Added

- Initial public release
