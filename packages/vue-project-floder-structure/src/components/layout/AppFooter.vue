<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div>
        <p class="site-footer__title">示例目标</p>
        <p class="site-footer__text">
          首页负责展示目录树，详情页只做简化说明，用最少页面文案把目录层级讲清楚。
        </p>
      </div>
      <p class="site-footer__text">
        Vue 3、Vue Router、Pinia，以及一套更适合继续扩展的项目目录结构。
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2rem 0 3rem;
}

.site-footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(219, 228, 240, 0.9);
  background: rgba(255, 255, 255, 0.75);
}

.site-footer__title,
.site-footer__text {
  margin: 0;
}

.site-footer__title {
  font-weight: 700;
  color: var(--ink-strong);
}

.site-footer__text {
  color: var(--ink-soft);
}

@media (max-width: 720px) {
  .site-footer__inner {
    flex-direction: column;
  }
}
</style>
