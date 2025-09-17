# Contributing

Thank you for considering contributing to Minima UI! This document outlines how to submit changes to this repository and which conventions to follow.

### Important

Our core maintainers prioritize pull requests (PRs) from within our organization. External contributions are regularly triaged, but not at any fixed cadence. It varies depending on how busy the maintainers are. This is applicable to all types of PRs, so we kindly ask for your patience.

As this package contains components for the Minima UI design system, we do not accept PRs for new components. If you have a suggestion for a new component, please open an issue instead and label it with `feature request`.

If you, as a community contributor, wish to work on more extensive features, please reach out to CODEOWNERS instead of directly submitting a PR with all the changes. This approach saves us both time, especially if the PR is not accepted (which will be the case if it does not align with our roadmap), and helps us effectively review and evaluate your contribution if it is accepted.

## Prerequisites

- You're familiar with GitHub Issues and Pull Requests

## Issues before PRs

1. Before you start working on a change please make sure that there is an issue for what you will be working on. You can either find an existing issue or open a new issue if none exists.
2. When you are ready to start working on a change, fork the repository and branch out from `develop`.
3. Make your changes.
4. Open a pull request towards the `develop` branch.

## Workflow

### Branches

All changes should be part of a branch and submitted as a pull request - your branches should be prefixed with one of:

- `fix/` for bug fixes
- `feat/` for features
- `docs/` for documentation changes

### Commits

Strive towards keeping your commits small and isolated - this helps the reviewer understand what is going on and makes it easier to process your requests.

### Pull Requests

Once your changes are ready you must submit your branch as a pull request. Your pull request should be opened against the `develop` branch in the main Minima UI repo.

In your PR's description you should follow the structure:

- **What** - what changes are in this PR
- **Why** - why are these changes relevant
- **How** - how have the changes been implemented
- **Testing** - how has the changes been tested or how can the reviewer test the feature

We highly encourage that you do a self-review prior to requesting a review. To do a self review click the review button in the top right corner, go through your code and annotate your changes. This makes it easier for the reviewer to process your PR.

#### Merge Style

All pull requests are squashed and merged.

### Release

Releases are created from the `develop` branch.
