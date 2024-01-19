<template>
    <Listbox v-model="selected">
      <div class="relative">
        <ListboxButton class="py-2 pl-4 pr-10 text-left shadow form-select">
          <slot name="button"></slot>
        </ListboxButton>
  
        <TransitionZoom>
          <ListboxOptions
          class="absolute z-[1] w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-700 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none origin-top-right sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              as="template"
            >
              <li
              class="relative px-4 py-2 text-gray-800 cursor-pointer select-none dark:text-gray-100"
              :class="{ 'bg-gray-100 dark:bg-gray-600': active }"
              >
                <slot name="option" :option="option" :selected="selected" :active="active"></slot>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </TransitionZoom>
      </div>
    </Listbox>
  </template>
  
  <script>
  import { useVModel } from '@vueuse/core'
  export default {
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: String,
        default: 'asc',
      },
      options: Array,
    },
    setup(props) {
      const selected = useVModel(props)
      return { selected }
    },
  }
  </script>