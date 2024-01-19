<template>
    <div class="relative">
      <button
        class="p-1 mr-1 rounded w-7 h-7"
        :class="showPopover ? 'bg-violet-600 indigo:bg-indigo-600 text-white' : 'hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white'"
        :title="title"
        @click="handleAction"
      >
        <RemixIcon :icon="icon" />
      </button>
  
      <div v-if="showPopover" ref="popoverEl" class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded shadow-md">
        <TabGroup>
          <!-- 按鈕 -->
          <TabList class="flex items-center space-x-2 px-3 pt-2.5 border-b border-gray-200">
            <Tab 
            v-for="label in ['連結', '上傳圖片']" 
            :key="label" 
            as="template" 
            v-slot="{ selected }"
            >
              <button
                type="button"
                class="pb-1 text-sm tracking-wide border-b-2"
                :class="
                selected
                  ? 'text-violet-600 indigo:text-indigo-600 dark:text-white border-violet-600 indigo:border-indigo-600 dark:border-white'
                  : 'text-gray-500 dark:text-gray-400 border-transparent'
              "
              >
                {{ label }}
              </button>
            </Tab>
          </TabList>

          <!-- 內容 -->
          <TabPanels class="px-3 py-3.5">
            <TabPanel class="flex items-center">
              <input
                type="text"
                ref="urlEl"
                class="px-2 py-1 text-sm form-input"
                placeholder="圖片連結..."
                v-model="url"
                @keyup.enter="handleSubmit"
              >
  
              <button
                type="button"
                title="插入連結"
                class="flex-shrink-0 p-1 ml-1 rounded w-7 h-7 hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white"
                @click="handleSubmit"
              >
                <RemixIcon icon="check-line" />
              </button>
            </TabPanel>
  
            <TabPanel>
              <PrimaryButton class="flex items-center w-full btn-sm" @click="selectFile">
                <heroicons-outline:cloud-upload class="mr-1" />選擇圖片
              </PrimaryButton>
            </TabPanel>
          </TabPanels>
        </TabGroup>
  
        <input
          ref="fileEl"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onChangeFile"
        >
      </div>
    </div>
  </template>
  
  <script>
  import { nextTick, ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      action: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      const url = ref('')
      const urlEl = ref(null)
      const showPopover = ref(false)
      const popoverEl = ref(null)
      const fileEl = ref(null)
      const handleAction = () => {
        showPopover.value = !showPopover.value
        if (!showPopover.value) return
        url.value = ''

        // 點擊外面關閉
        onClickOutside(popoverEl, event => {
          showPopover.value = false
        })
        nextTick(() => {
          urlEl.value.focus()
        })
      }
      
      const handleSubmit = () => {
        if (!showPopover.value) return
        if (url.value) {
          props.action(url.value)
        }
        showPopover.value = false
      }

      // 選擇圖片
      const selectFile = () => {
        fileEl.value.click()
      }

     // 更改檔案
      const onChangeFile = () => {
        const [file] = fileEl.value.files
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const dataUrl = reader.result
          props.action(dataUrl)
          showPopover.value = false
        }
      }
      return {
        url,
        urlEl,
        showPopover,
        popoverEl,
        fileEl,
        handleAction,
        handleSubmit,
        selectFile,
        onChangeFile,
      }
    },
  }
  </script>