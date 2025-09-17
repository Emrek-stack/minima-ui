minimaui
=========

Independent UI packages under the Minima namespace with decoupled names and imports.

Packages
- `@minimaui/ui` – React component library
- `@minimaui/icons` – React icons
- `@minimaui/ui-preset` – Tailwind CSS preset (tokens)
- `@minimaui/toolbox` – internal CLI for generation (private)

Commands (from `minimaui/`)
- `yarn` – install deps
- `yarn build` – build all packages
- `yarn test` – run package tests
- `yarn changeset` – create a changeset
- `yarn version` – apply changesets and bump versions
- `yarn release` – publish to npm

Notes
- Names are `@minimaui/*` and all internal imports are aligned.
- Adjust `repository.url` fields before publishing to your actual repo.
