<template>
  <div class="app-shell">
    <header class="app-header">
      <h1>Learn Vue Router</h1>
      <nav class="nav">
        <RouterLink class="nav-link" to="/">首页</RouterLink>
        <RouterLink class="nav-link" to="/dashboard">控制台</RouterLink>
        <RouterLink class="nav-link" to="/login">登录</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px 16px;
  display: grid;
  gap: 16px;
}

.app-header {
  display: grid;
  gap: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  padding: 14px 16px;
}

.app-header h1 {
  font-size: 20px;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.app-main {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-surface);
  padding: 16px;
}

.nav-link {
  border: 1px solid transparent;
  border-radius: 6px;
  padding: 2px 8px;
  text-decoration: none;
}

.nav-link.router-link-active {
  border-color: var(--border-color);
  background: #f2f6ff;
  font-weight: 600;
}

@media (max-width: 640px) {
  .app-shell {
    padding: 16px 12px;
  }
}
</style>
