<template>
  <div id="app">
    <div class="header">
      <div>
        <h1>Todo</h1>
      </div>
    </div>
    <Search @onSearchChange="onSearchChange"/>
    <List
      :list="filteredList"
      :priority="priority"
      :sort="currentSort"
      @onAddNewItem="addNewItem"
      @onEditItem="editItem"
      @onRemoveItem="removeItem"
      @onClearAll="clearAll"
      @onToggleSort="toggleSort"
    />
  </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'

const DEFAULT_LIST = [
  { id: 0, text: 'Call Mum', priority: 0 },
  { id: 1, text: 'Find a new job', priority: 2 },
  { id: 2, text: 'Go to the pub', priority: 1 },
];

export default {
  name: 'App',
  data: () => {
    return {
      list: [],
      nextUniqueId: null,
      filteredList: null,
      priority: ['Meh', 'Important', 'Life changing'],
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
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    onSearchChange(query) {
      this.setSearchQuery(query);
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
    addNewItem(newItem) {
      let list = this.list;
      newItem.id = this.nextUniqueId;
      this.incrementNextUniqueId();
      list.push(newItem);
      this.setList(list);
      this.setNewItem({});
      this.setSort(this.currentSort);
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
      this.setSort(this.currentSort);
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
      this.setSort(!this.currentSort);
    },
    setSort(sort) {
      this.currentSort = sort;
      this.currentSort === false ? this.filteredList.sort((a, b) => a.priority - b.priority) : this.filteredList.sort((a, b) => b.priority - a.priority);
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
    const list = local.length > 0 ? local : DEFAULT_LIST;

    const highestId = list.reduce((max, item) => item.id >= max.id ? item : max).id;
    this.setNextUniqueId(highestId);
    this.incrementNextUniqueId();

    this.setList(list);
    this.setSort(this.currentSort);
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
a {
  color: #42b983;
}
input{
  font-family: 'Raleway', sans-serif;
}
.header{
  display: flex;
  justify-content: center;
  div{
    display: flex;
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
