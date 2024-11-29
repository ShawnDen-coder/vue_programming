<template>
  <div>
    <table>
      <thead>
        <th>ID</th>
        <th>用户名</th>
        <th>邮箱</th>
        <th>电话</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button @click="removeUser(user.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  setup() {},
};
</script>
<style scoped>
table {
  margin-top: 24px;
  border-collapse: collapse;
}

thead {
  border-bottom: 1px solid hsl(280deg, 50%, 50%);
}

td,
th {
  padding: 12px 24px;
}

tbody tr:nth-child(2n) {
  background-color: hsl(280deg, 50%, 50%, 0.1);
}
</style>
