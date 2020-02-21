<template>
  <div id="app">
    <div class="header">
      <h1>Todo List</h1>
    </div>
    <Search @onSearchChange="onSearchChange"/>
    <List :list="filteredList" :priority="priority" @onRemoveItem="removeItem" @onClearAll="clearAll" @onToggleSort="toggleSort" :sort="currentSort"/>
    <div class="todos">
      <div class="list-modifiers">
        <p @click="orderByPriorityAsc();">Order by priority Asc</p>
        <p @click="orderByPriorityDesc();">Order by priority Desc</p>
        <p @click="clearAll();">Clear List</p>
      </div>
      <div class="add">
        <form @submit.prevent="addNewItem">
          <input type="text" v-model="newItem.text" placeholder="New todo...">
          <select v-model="newItem.priority">
            <option default disabled="disabled" selected="selected" value="undefined">Priority...</option>
            <option v-for="(item, index) in priority" :key="index" :value="index">{{ item }}</option>
          </select>
          <input type="submit" value="submit">
        </form>
      </div>
      <ul class="list">
        <li v-for="item in filteredList" :key="item.id" :yo="item.id">
          <div class="text">
            <input type="text" v-model="item.text" @keyup="editItem(item)">
          </div>
          <div class="edit">
            <div class="priority"><p :class="['priority-' + item.priority]">{{ priority[item.priority] }}</p></div>
            <div class="delete" @click="removeItem(item.id);"><p>Delete</p></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'

export default {
  name: 'App',
  data: () => {
    return {
      list: [],
      nextUniqueId: null,
      filteredList: null,
      priority: ['Low', 'Medium', 'High'],
      searchQuery: null,
      newItem: {},
      currentSort: true
    }
  },
  watch: {},
  components: {
    Search,
    List,
  },
  methods: {
    onSearchChange(query) {
      this.filterBySearch(query);
    },
    setLocalStorage(list) {
      localStorage.setItem('todoList', JSON.stringify(list));
    },
    setList(newList) {
      this.list = newList;
      this.updateFilteredList(newList);
      this.setLocalStorage(newList);
    },
    setNewItem(item) {
      this.newItem = item;
    },
    addNewItem() {
      let list = this.list;
      this.newItem.id = this.nextUniqueId;
      this.nextUniqueId += 1;
      list.push(this.newItem);
      this.setList(list);
      this.setNewItem({});
    },
    removeItem(id) {
      let list = this.list;
      list = list.filter(item => item.id !== id);
      this.setList(list);
    },
    editItem(item) {
      let list = this.list;
      let listItem = list.findIndex(i => i.id === item.id);
      list[listItem] = item;
      this.setList(list);
    },
    setNextUniqueId(val) {
      this.nextUniqueId = val;
    },
    incrementNextUniqueId() {
      this.nextUniqueId +=1 ;
    },
    updateFilteredList(list) {
      this.filteredList = list;
      this.filterBySearch(this.searchQuery);
    },
    toggleSort() {
      this.currentSort === false ? this.filteredList.sort((a, b) => a.priority - b.priority) : this.filteredList.sort((a, b) => b.priority - a.priority);
      this.currentSort = !this.currentSort;
    },
    orderByPriorityAsc() {
      this.filteredList.sort((a, b) => a.priority - b.priority);
    },
    orderByPriorityDesc() {
      this.filteredList.sort((a, b) => b.priority - a.priority);
    },
    filterBySearch(query) {
      if (query === null || query === '') {
        this.filteredList = this.list;
        return;
      }
      query = query.toUpperCase();
      this.filteredList = this.list.filter( item => item.text.toUpperCase().match(query));
    },
    clearAll() {
      if (confirm('This will delete all items in the list. Are you sure you want to continue?')){
        this.setList([]);
      }
    }
  },
  created: function() {
    const local = JSON.parse(localStorage.getItem('todoList')) || [];
    const defaultList = [
      { id: 0, text: 'Josh', priority: 0 },
      { id: 1, text: 'Clare', priority: 2 },
      { id: 2, text: 'Catherine', priority: 1 },
    ];
    const list = local.length > 0 ? local : defaultList;

    const highestId = list.reduce((max, item) => item.id >= max.id ? item : max).id;
    this.setNextUniqueId(highestId);

    this.setList(list);
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css');
@import url('https://fonts.googleapis.com/css?family=Raleway&display=swap');
body {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 40px;
  background: whitesmoke;
}
#app{
  margin: 0 auto;

}
h1{
  text-align: left;
}

.todos{
  display: flex;
  flex-direction: column;

  .list-modifiers{
    width: 50%;
    align-self: flex-end;
    display: flex;
    justify-content: space-around;
  }

  ul.list {
    list-style-type: none;
    padding: 0;
    background: white;
    margin-top: 0;

    li {
      display: flex;
      align-items: center;
      padding: 20px;

      &:last-child{
        border-bottom: none;
      }

      .text{
        width: 80%;
      }

      .edit{
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .priority p{
        padding: 0 5px;
        display: inline-block;
        color: white;
        margin: 0;
        border-radius: 4px;
        text-align: center;

        &.priority-0{
          background: green;
        }
        &.priority-1{
          background: yellow;
          color: black;
        }
        &.priority-2{
          background: red;
        }
      }
    }
  }
}


a {
  color: #42b983;
}
</style>
