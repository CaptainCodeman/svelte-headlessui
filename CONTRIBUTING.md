# Contributing Guidelines

Welcome to the contributing guidelines! Here you can find instructions on how to set up and contribute to the Svelte-HeadlessUI project.

## The Project Structure

The project uses [pnpm](https://pnpm.io/) and [pnpm workspaces](https://pnpm.io/workspaces) and the packages are split into:

- **packages/docs** is the documenation which uses [Astro](https://astro.build/)
- **packages/lib** is the code for the Svelte-HeadlessUI library

## How To Set Up The Project

From the root of the project install the project dependencies.

```shell
pnpm install
```

Build the packages in every project of a workspace.

```shell
pnpm -r build
```

## How To Contribute To The Documentation

From the root of the project navigate to `packages/docs` and run the development server.

```shell
cd packages/docs && pnpm run dev
```

You can open [http://localhost:3000/svelte-headlessui/](http://localhost:3000/svelte-headlessui/) in your browser to see the documentation and make changes.

## How To Contribute To The Svelte-HeadlessUI library

From the root of the project navigate to `package/lib` and run the development server.

```shell
cd packages/lib && pnpm run dev
```

You can open [http://localhost:5173/](http://localhost:5173/) in your browser to see the UI components and make changes.
