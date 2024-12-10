---
draft: true
date: '2024-08-11'
author: Javier Iglesias Garcia
image: https://picsum.photos/seed/vitest/500/300
tags: ['testing', 'web']
---

# Vitest: Fast Unit Testing for Vite Projects

Vitest is a fast and lightweight testing framework designed specifically for projects using Vite. Built on top of Vite, it leverages Vite's fast build times and modern JavaScript features, making it an excellent choice for unit testing. In this article, we'll explore Vitest's features, how it integrates with Vite, and how to write and run tests.

## What is Vitest?

Vitest is a testing framework that aims to provide a seamless testing experience for Vite projects. It supports both unit and integration tests and is designed to be fast and easy to use, with first-class TypeScript support.

## Key Features of Vitest

### Speed and Performance

Vitest is built on top of Vite, meaning it benefits from Vite's fast build times and efficient module resolution. This results in faster test runs, especially in large projects.

### Native ESM Support

Vitest fully supports ES modules (ESM), allowing you to write modern JavaScript and TypeScript without the need for transpilation:

```typescript
import { expect, test } from 'vitest';

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
```

In this example, Vitest runs a simple unit test using modern ESM syntax.

### Rich Assertions and Mocking

Vitest comes with built-in assertion functions and mocking capabilities, making it easy to write comprehensive tests:

```typescript
import { fetchData } from './fetchData';
import { vi, describe, it, expect } from 'vitest';

vi.mock('./fetchData');

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    const data = { id: 1, name: 'Test' };
    vi.mocked(fetchData).mockResolvedValueOnce(data);

    const result = await fetchData();
    expect(result).toEqual(data);
  });
});
```

This example shows how to mock a module and test the `fetchData` function.

## Setting Up Vitest

To get started with Vitest in a Vite project, you need to install it via npm or yarn:

```bash
npm install vitest --save-dev
```

Then, update your `vite.config.js` to include the Vitest plugin:

```javascript
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  },
});
```

With this setup, you can now run your tests using the following command:

```bash
npx vitest
```

This will run all tests in your project, providing a detailed report of the results.

## Integrating Vitest with CI/CD

Vitest can be easily integrated into CI/CD pipelines, allowing you to run tests automatically on each commit or deployment. Here’s an example configuration for a GitHub Actions workflow:

```yaml
name: CI

on: [push]

jobs:
  vitest-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Run Vitest
        run: npx vitest run
```

This configuration will automatically run your Vitest tests whenever code is pushed to the repository.

## Conclusion

Vitest is a modern, fast, and efficient testing framework tailored for Vite projects. Its seamless integration with Vite, combined with rich features like ESM support and mocking, makes it an excellent choice for developers looking to implement unit and integration testing in their Vite applications.
