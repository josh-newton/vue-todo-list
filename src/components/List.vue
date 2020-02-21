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
            <input type="text" v-model="newItem.text" placeholder="New todo..." @change="validateNewItem()">
          </td>
          <td class="priority">
            <select v-model="newItem.priority" @change="validateNewItem()">
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
            <input type="text" v-model="item.text" @keyup="$emit('onEditItem', item)" @blur="setEditItemId(null);">
          </td>
          <td class="priority">
            <p :class="['priority-' + item.priority]" v-show="editItemId !== item.id" @click="setEditItemId(item.id)"><span>{{ priority[item.priority] }}</span></p>
            <select v-model="item.priority" v-show="editItemId === item.id" @change="$emit('onEditItem', item); setEditItemId(null);" @blur="setEditItemId(null);">
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
    },
    validateNewItem() {
      if (this.newItem.text !== '' && this.newItem.text !== undefined && this.newItem.priority !== undefined){
        this.$emit('onAddNewItem', this.newItem);
        this.setAddItemActive(false);
        this.setNewItem({});
      }
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
  background: #eaeaea;;
}
th{
  text-align: center;
  padding: 10px 15px;
  border: 2px solid #fff;
  border-radius: 4px;
  background: #2c3e50;
  color: #fff;

  &:first-child{
    text-align: left;
  }
}
td{
  padding: 0 5px;
  border: 2px solid #fff;
  border-radius: 4px;

  input,{
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: none;
    width: calc(100% - 20px);
    font-size: 14px;
  }
  select{
    font-size: 14px;
    width: 122px;
    padding: 4px;
    background: #fff;
    margin: 10px 0;
    border-radius: 4px;
  }
}
tr{
  border: 2px solid #fff;
}
.add-item-row{
  // Visibility still leaves a gap on iOS safari, height doesn't work,
  // line-height doesn't work. Need to find solution!
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
    width: calc(100% - 20px);
  }
}
.priority{
  text-align: center;
  color: #fff;
  padding: 0 15px;
  p {
    padding: 3px;
    border-radius: 4px;
    max-width: 120px;
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

@media screen and (max-width: 600px) {
  .priority span{
    display: none;
  }
  .priority p{
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
}
</style>
