<template>
  <div class="search">
    <label>
      <i class="fas fa-search"></i>
      <input type="text" v-model="query" @keyup="$emit('onSearchChange', query)" placeholder="Search...">
    </label>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => {
    return {
      query: null
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.search{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}
label{
  display: flex;
  align-items: center;

  i{
    margin-right: 10px;
  }
  input{
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
  }
}
</style>
