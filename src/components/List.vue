<template>
  <div class="list">
    <table>
      <thead>
        <tr>
          <th class="item-header">ITEM <i class="far fa-plus-square add-item" @click="setAddItemActive(true)"></i></th>
          <th class="priority-toggle" @click="$emit('onToggleSort')">PRIORITY <i class="fas" :class="{'fa-sort-up': !sort, 'fa-sort-down': sort}"></i></th>
          <th class="clear-all"><i class="far fa-trash-alt" @click="$emit('onClearAll')"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr class="add-item-row" :class="{'add-item-active': addItemActive}">
          <td>
            <input type="text" v-model="newItem.text" placeholder="New todo...">
          </td>
          <td class="priority">
            <select v-model="newItem.priority" @change="$emit('onAddNewItem', newItem); setAddItemActive(false); setNewItem({});">
              <option disabled="disabled" selected="selected" value="undefined">Priority...</option>
              <option v-for="(item, index) in priority" :key="index" :value="index">{{ item }}</option>
            </select>
          </td>
          <td class="remove">
            <i class="fas fa-times" @click="setAddItemActive(false); setNewItem({});"></i>
          </td>
        </tr>

        <tr v-for="item in list" :key="item.id">
          <td class="text">
            <input type="text" v-model="item.text" @keyup="$emit('onEditItem', item)">
          </td>
          <td class="priority">
            <p :class="['priority-' + item.priority]" v-show="editItemId !== item.id" @click="setEditItemId(item.id);">{{ priority[item.priority] }}</p>
            <select v-model="item.priority" v-show="editItemId === item.id" @change="$emit('onEditItem', item); setEditItemId(null);">
              <option disabled="disabled" value="undefined">Priority...</option>
              <option v-for="(item, index) in priority" :key="index" :value="index">{{ item }}</option>
            </select>
          </td>
          <td class="remove">
            <i class="fas fa-times" @click="$emit('onRemoveItem', item.id)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['list', 'priority', 'sort'],
  data: () => {
    return {
      newItem: {},
      addItemActive: false,
      editItemId: null
    }
  },
  methods: {
    setEditItemId(id) {
      this.editItemId = id;
    },
    setNewItem(item) {
      this.newItem = item;
    },
    setAddItemActive(value) {
      this.addItemActive = value;
      // Wait for input to display before setting focus
      setTimeout(() => {
        value === true ? document.querySelector('.add-item-row input[type="text"]').focus() : false;
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list{
  display: flex;
  justify-content: center;
}
.add-item{
  margin-left: 5px;
}
.add-item, .remove i, .priority-toggle, .clear-all{
  cursor: pointer;
}
table{
  border-collapse: collapse;
  width: 100%;
  max-width: 960px;
}
th{
  text-align: center;
  padding: 10px 15px;
  border: 2px solid #fff;

  &:first-child{
    text-align: left;
  }
}
td{
  padding: 0 5px;
  border: 2px solid #fff;

  input, select{
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: none;
  }
  select{
    width: 102px;
    padding: 4px;
    background: #fff;
    margin: 10px 0;
  }
}
tr{
  border: 2px solid #fff;
}
.add-item-row{
  visibility: collapse;

  &.add-item-active{
    visibility: visible;
  }
}
.text{
  input{
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: none;
    min-width: 100px;
  }
}
.priority{
  text-align: center;
  color: #fff;
  padding: 0 15px;
  p {
    padding: 3px;
    border-radius: 4px;
    max-width: 100px;
    margin: 10px auto;
    cursor: pointer;
  }
  .priority-0{
    background: #fdcb6e;
  }
  .priority-1{
    background: #e17055;
  }
  .priority-2{
    background: #d63031;
  }
}
.remove{
  text-align: center;
  padding: 0 15px;
}
</style>
