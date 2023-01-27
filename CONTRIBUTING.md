# Contributing Guidelines

Welcome to the contributing guidelines! Here you can find instructions on how to set up and contribute to the Svelte-HeadlessUI project.

## The Project Structure

The project uses [pnpm](https://pnpm.io/) and [pnpm workspaces](https://pnpm.io/workspaces) and is split into:

- **packages/docs** which uses [Astro](https://astro.build/) for the documentation
- **packages/lib** is the code for the Svelte-HeadlessUI library

## Setting Up The Project

From the root of the project install the project dependencies.

```shell
pnpm install
```

Build the packages in every project of a workspace.

```shell
pnpm -r build
```

## Contributing To The Documentation

From the root of the project navigate to `packages/docs` and run the development server.

```shell
cd packages/docs && pnpm run dev
```

You can open [http://localhost:3000/svelte-headlessui/](http://localhost:3000/svelte-headlessui/) in your browser to see the documentation and make changes.

## Contributing To Svelte-HeadlessUI

From the root of the project navigate to `package/lib` and run the development server.

```shell
cd packages/lib && pnpm run dev
```

You can open [http://localhost:5173/](http://localhost:5173/) in your browser to see the UI components and make changes.
