<template>
  <div class="list">
    <table>
      <thead>
        <tr>
          <th>ITEM <i class="far fa-plus-square add-item"></i></th>
          <th class="priority-toggle" @click="$emit('onToggleSort')">PRIORITY <i class="fas" :class="{'fa-sort-up': !sort, 'fa-sort-down': sort}"></i></th>
          <th class="clear-all" @click="$emit('onClearAll')">CLEAR</th>
        </tr>
      </thead>
      <tbody>
        <tr class="add-item-row">
          <td>
            <input type="text" v-model="newItem.text" placeholder="New todo...">
          </td>
          <td>
            <select v-model="newItem.priority">
              <option default disabled="disabled" selected="selected" value="undefined">Priority...</option>
              <option v-for="(item, index) in priority" :key="index" :value="index">{{ item }}</option>
            </select>
          </td>
          <td></td>
        </tr>

        <tr v-for="item in list" :key="item.id">
          <td>
            <input type="text" v-model="item.text" @keyup="editItem(item)">
          </td>
          <td class="priority">
            <p :class="['priority-' + item.priority]">{{ priority[item.priority] }}</p>
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
      newItem: {}
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.add-item, .remove i, .priority-toggle, .clear-all{
  cursor: pointer;
}
.add-item-row{
  input, select{
    padding: 8px;
    border-radius: 4px;
    border: none;
    background: #fff;
  }
}
.priority{
  text-align: center;
  color: #fff;
  p {
    padding: 3px;
    border-radius: 4px;
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
}
</style>
