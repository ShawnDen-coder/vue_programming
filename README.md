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
  - 'packages/*'
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

### 8) 在 workspace 内让一个 lib 依赖另一个 lib

先确保两个子包都有唯一包名（示例）：

```json
{
  "name": "@shawnden-coder/lib-a"
}
```

```json
{
  "name": "@shawnden-coder/lib-b"
}
```

在根目录执行，把 lib-b 作为 lib-a 的依赖：

```bash
pnpm --filter @shawnden-coder/lib-a add @shawnden-coder/lib-b@workspace:*
```

说明：你提到的 ShawnDen-coder 在 npm 包名里建议使用小写，即 `@shawnden-coder`。

### 9) `workspace:*` 是什么意思

- `workspace:*` 表示依赖必须从当前 workspace 内解析。
- `*` 表示版本范围不额外限制（使用工作区里的该包）。
- 安装时会链接到本地工作区包，而不是从 npm 重新下载同名包。

常见对比：

- `workspace:*`：最宽松，直接使用工作区里的包。
- `workspace:^`：使用工作区包，并按 `^` 语义记录版本范围。
- `workspace:~`：使用工作区包，并按 `~` 语义记录版本范围。

### 10) 不使用 scope 的 lib 命名示例

如果你的包名不带 scope，也可以这样配置：

```json
{
  "name": "lib-a"
}
```

```json
{
  "name": "lib-b"
}
```

在根目录执行：

```bash
pnpm --filter lib-a add lib-b@workspace:*
```
