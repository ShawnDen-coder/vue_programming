# vue_programming

## 目录结构

```text
vue_programming/
  packages/
    learn-pina/
  pnpm-workspace.yaml
```

## 常用命令

### 1) 初始化 workspace（根目录执行）

```bash
pnpm init
```

`pnpm-workspace.yaml` 示例：

```yaml
packages:
  - "packages/*"
```

### 2) 创建 Vue + TypeScript 项目

在根目录执行（会创建到 `packages/learn-pina`）：

```bash
pnpm create vite packages/learn-pina --template vue-ts
```

### 3) 安装依赖（根目录执行）

```bash
pnpm install
```

### 4) 启动某个子项目开发环境

```bash
pnpm --filter learn-pina dev
```

### 5) 构建某个子项目

```bash
pnpm --filter learn-pina build
```

### 6) 在某个子项目中安装依赖

```bash
pnpm --filter learn-pina add pinia
```

### 7) 在所有子包中执行同一个脚本

```bash
pnpm -r run build
```

## 常见问题

### 报错：`packages field is not an array`

检查 `pnpm-workspace.yaml` 是否是如下格式：

```yaml
packages:
  - "packages/*"
```
