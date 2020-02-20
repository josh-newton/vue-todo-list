<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="removeItem(index);">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['list'],
  data: () => {

  }
  methods: {
    removeItem(index) {
      this.list.splice(index, 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
}

a {
  color: #42b983;
}
</style>
