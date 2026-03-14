# Vue Project Folder Structure

This package is a small Vue 3 example that turns the Vue School article about component folder structure into runnable code.

## What it demonstrates

- `pages/`: route-level screens and page-private components
- `components/ui/`: reusable presentational building blocks
- `components/layout/`: application shell pieces
- `components/article/`: domain-specific article components
- `components/common/`: shared components that do not fit UI or layout buckets
- `stores/`: Pinia store for shared state
- `router/`: Vue Router configuration

## Commands

```bash
pnpm --filter vue-project-floder-structure dev
pnpm --filter vue-project-floder-structure build
```

## Folder map

```text
src/
  components/
    article/
    common/
    layout/
    ui/
  pages/
    ArticlePage/
    HomePage/
  router/
  stores/
```
