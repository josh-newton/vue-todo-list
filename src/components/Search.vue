<template>
  <div class="search">
    <div>

      <label>
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="query"
          @keyup="$emit('onSearchChange', query)"
          placeholder="Search...">
      </label>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: () => {
    return {
      query: null
    }
  }
}
</script>

<style scoped lang="scss">
.search{
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
div{
  display: flex;
  justify-content: flex-end;
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
}
label{
  i{
    margin-right: 10px;
  }
  input{
    padding: 8px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    border: 1px solid #eaeaea;
  }
}
</style>
