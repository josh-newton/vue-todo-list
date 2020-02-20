import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('h1 Exists', () => {
    const wrapper = shallowMount(App)
    expect(wrapper.find('h1').text()).toBe('Todo List');
  })
})
