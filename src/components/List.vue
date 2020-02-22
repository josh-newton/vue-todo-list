<template>
  <div class="list">

    <table>
      <thead>
        <tr>
          <th>
            ITEM
            <i class="far fa-plus-square add-new-button" @click="setAddItemActive(true)">
            </i>
          </th>
          <th class="priority-toggle" @click="$emit('onToggleSort')">
              PRIORITY
              <i class="fas" :class="{'fa-sort-up': !sort, 'fa-sort-down': sort}">
              </i>
          </th>
          <th class="clear-all-button">
            <i class="far fa-trash-alt" @click="$emit('onClearAll')"></i>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Hidden add item row -->
        <tr class="add-new-row" v-if="addItemActive">
          <td>
            <input
              type="text"
              placeholder="New todo..."
              v-model="newItem.text"
              @change="validateNewItem()"/>
          </td>
          <td class="item-priority">
            <select v-model="newItem.priority" @change="validateNewItem()">
              <option disabled="disabled" selected="selected" value="undefined">
                  Priority...
              </option>
              <option v-for="(item, index) in priority" :key="index" :value="index">
                  {{ item }}
              </option>
            </select>
          </td>
          <td class="remove-button">
            <i class="fas fa-times" @click="setAddItemActive(false); setNewItem({});"></i>
          </td>
        </tr>

        <!-- Main list of todos -->
        <tr v-for="item in list" :key="item.id">
          <td class="item-text">
            <input
              type="text" v-model="item.text"
              @keyup="$emit('onEditItem', item)"
              @blur="setEditItemId(null);"/>
          </td>
          <td class="item-priority">
            <p
              :class="['priority-' + item.priority]"
              v-show="editItemId !== item.id"
              @click="setEditItemId(item.id)">
                <span>{{ priority[item.priority] }}</span>
            </p>
            <select
              v-model="item.priority"
              v-show="editItemId === item.id"
              @change="$emit('onEditItem', item); setEditItemId(null);"
              @blur="setEditItemId(null);">
                <option disabled="disabled" value="undefined">
                  Priority...
                </option>
                <option v-for="(item, index) in priority" :key="index" :value="index">
                  {{ item }}
                </option>
            </select>
          </td>
          <td class="remove-button">
            <i class="fas fa-times" @click="$emit('onRemoveItem', item.id)"></i>
          </td>
        </tr>

        <!-- List is empty... -->
        <tr v-if="isEmpty">
          <td colspan="3">
            <p>Well done! You've completed all your todos.</p>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: ['list', 'isEmpty', 'priority', 'sort'],
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
      // Wait for add new item to be displayed and then auto focus on it
      setTimeout(() => {
        value === true ? document.querySelector('.add-new-row input[type="text"]').focus() : false;
      })
    },
    validateNewItem() {
      // Ensure both inputs are filled before adding new item
      // TODO:
      // Add more validation i.e. min length
      // Display errors to user
      if (this.newItem.text !== '' &&
          this.newItem.text !== undefined &&
          this.newItem.priority !== undefined
         ){
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

table{
  border-collapse: collapse;
  width: 100%;
  max-width: 960px;
  background: #eaeaea;;

  tr{
    border: 2px solid #fff;
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
}

.add-new-button, .remove-button i, .priority-toggle, .clear-all-button{
  cursor: pointer;
}
.priority-toggle i{
  margin-left: 5px
}
.add-new-button{
  margin-left: 5px;
}
.item-text{
  input{
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: none;
    width: calc(100% - 20px);
    text-overflow: ellipsis;
  }
}
.item-priority{
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
.remove-button{
  text-align: center;
  padding: 0 15px;
}

@media screen and (max-width: 600px) {
  // Reduce priority options to coloured circles on mobile devices
  .item-priority span{
    display: none;
  }
  .item-priority p{
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
  .add-new-row{
    select{
      width: auto;
    }
  }
}
</style>
