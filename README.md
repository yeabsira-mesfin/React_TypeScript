# RepoDoctor

RepoDoctor is a benchmark for evaluating AI and human code-review quality. Instead of rewarding comment volume, it measures whether a reviewer finds real defects without creating excessive false positives.

## Core idea

Each pull request has a gold set of known issues. A review is scored using precision, recall, F1, and true positives. This creates a compact evaluation harness for reasoning about correctness, security, asynchronous behavior, data integrity, and multi-tenant application design.

## Features

- React + TypeScript code-review interface
- Pull-request style benchmark cases
- Gold issue sets with severity
- Precision, recall, and F1 scoring engine
- False-positive penalties
- Vitest unit tests
- GitHub Actions CI
- Responsive web UI deployable as a static site

## Run locally

```bash
npm install
npm run dev
```

Tests and build:

```bash
npm test
npm run build
```

## Example evaluation dimensions

- Correctness bugs
- Authorization boundaries
- React lifecycle problems
- Async control flow
- Transaction and partial-failure handling
- Cache isolation
- Severity prioritization
- False-positive discipline

## Deployment

RepoDoctor is a static React/Vite application and can be hosted on Vercel, Cloudflare Pages, Netlify, or GitHub Pages.

## Portfolio signal

The project demonstrates AI-code evaluation, software review judgment, TypeScript, benchmark metrics, testing, and practical engineering tradeoffs.

## Legacy history

The repository's earlier React/TypeScript learning history is intentionally preserved to show progression.

## Author

Yeabsira Mesfin
