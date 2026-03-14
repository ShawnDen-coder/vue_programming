# Vue 项目目录结构示例

这个包把目录结构说明改成了中文版本，重点放在 folder tree，而不是长篇页面文案。

## 启动命令

```bash
pnpm --filter vue-project-floder-structure dev
pnpm --filter vue-project-floder-structure build
```

## Folder Tree

```text
src/
  components/
    ui/          通用展示组件
    layout/      布局骨架组件
    article/     当前示例业务域组件
    common/      共享但难归类的组件
  pages/
    HomePage/    首页，展示目录树
    ArticlePage/ 详情页，简化说明单个目录
  router/        路由配置
  stores/        Pinia 状态管理
```

## 说明重点

- 首页只保留目录树说明
- 详情页只做简化介绍
- 路由和状态管理已经接入，便于继续扩展示例
