import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'
import Search from '@/components/Search.vue'

describe('App.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(App)
  })

  it('Header exists', () => {
    expect(wrapper.find('h1').text()).toBe('Todo')
  })

  it('List is initialised on start', () => {
    expect(wrapper.vm.$data.list.length).toBeGreaterThan(0)
  })
})

describe('Search.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Search)
  })

  it('Search input updates internal query value', () => {
    wrapper.find('input').setValue('hello')
    expect(wrapper.vm.$data.query).toBe('hello')
  })

  it('Search input emits change event on keyup', async () => {
    wrapper.find('input').trigger('keyup')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().onSearchChange).toBeTruthy()
  })
})
