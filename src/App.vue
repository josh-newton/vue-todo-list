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
      :isEmpty="listIsEmpty"
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

const PRIORITIES = ['Meh', 'Important', 'Life changing'];

export default {
  name: 'App',
  components: {
    Search,
    List,
  },
  data: () => {
    return {
      // List is the full list
      list: [],
      // Filtered list is the list currently displayed in the list component
      // which has been filtered by searchQuery and ordered by priority
      filteredList: null,
      // Unique tracker for items in the list
      nextUniqueId: null,
      priority: PRIORITIES,
      searchQuery: null,
      newItem: {},
      // priority sorting, true = most important first, false = least important
      currentSort: true,
      listIsEmpty: true
    }
  },
  methods: {

    // Setters
    setList(newList) {
      this.list = newList;
      this.setFilteredList(newList);
      this.setLocalStorage(newList);
      this.setListIsEmpty(newList.length === 0);
    },
    setFilteredList(list) {
      this.filteredList = list;
      // If list is updated when search is active, make sure we continue to filter
      this.filterBySearch(this.searchQuery);
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    setNewItem(item) {
      this.newItem = item;
    },
    setNextUniqueId(val) {
      this.nextUniqueId = val;
    },
    setSort(sort) {
      this.currentSort = sort;
      if (this.currentSort) {
        this.filteredList.sort((a, b) => b.priority - a.priority)
      } else {
        this.filteredList.sort((a, b) => a.priority - b.priority)
      }
    },
    setListIsEmpty(value) {
      this.listIsEmpty = value;
    },
    setLocalStorage(list) {
      localStorage.setItem('todoList', JSON.stringify(list));
    },
    incrementNextUniqueId() {
      this.nextUniqueId +=1 ;
    },

    // Events
    onSearchChange(query) {
      this.setSearchQuery(query);
      this.filterBySearch(query);
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
    editItem(item) {
      let list = this.list;
      let listItem = list.findIndex(i => i.id === item.id);
      list[listItem] = item;
      this.setList(list);
      this.setSort(this.currentSort);
    },
    removeItem(id) {
      let list = this.list;
      list = list.filter(item => item.id !== id);
      this.setList(list);
    },
    clearAll() {
      if (confirm('This will delete all items in the list. Are you sure you want to continue?')){
        this.setList([]);
      }
    },

    // Filtering
    toggleSort() {
      this.setSort(!this.currentSort);
    },
    filterBySearch(query) {
      // Ensure query is not empty
      if (query === null || query === '') {
        this.filteredList = this.list;
        return;
      }
      // Convert query to uppercase so we can ignore case when searching
      query = query.toUpperCase();
      this.filteredList = this.list.filter( item => item.text.toUpperCase().match(query));
    },
  },
  created: function() {
    // On first load, either re-load list from local storage or load default list
    const local = JSON.parse(localStorage.getItem('todoList')) || [];
    const list = local.length > 0 ? local : DEFAULT_LIST;

    // Calculate and set the highest id, it will be used to keep track of list items
    const highest = list.reduce((max, item) => item.id >= max.id ? item : max).id;
    this.setNextUniqueId(highest);
    this.incrementNextUniqueId();

    // Set list
    this.setList(list);
    this.setListIsEmpty(false);
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
