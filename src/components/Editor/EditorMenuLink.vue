<template>
    <div class="relative">
      <button
        class="p-1 mr-1 rounded w-7 h-7"
        :class="isActive() ? 'bg-violet-600 indigo:bg-indigo-600 text-white' : 'hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white'"
        :title="title"
        @click="handleAction"
      >
        <RemixIcon :icon="icon" />
      </button>
  
      <div v-if="showPopover" class="mt-1.5 absolute top-full left-[-103px] md:left-auto w-[300px] p-2 flex items-center bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded shadow-md">
        <input
          type="text"
          ref="urlEl"
          class="px-2 py-1 text-sm form-input"
          placeholder="連結..."
          v-model="url"
          @keyup.enter="handleSubmit"
        >
  
        <button
          type="button"
          title="插入連結"
          class="flex-shrink-0 p-1 ml-1 rounded w-7 h-7 hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white"
        >
          <RemixIcon icon="check-line" />
        </button>
  
        <button
          type="button"
          title="取消連結"
          class="flex-shrink-0 p-1 ml-1 rounded w-7 h-7 hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white"
          @click="handleUnlink"
        >
          <RemixIcon icon="link-unlink" />
        </button>
  
        <a
        :href="url"
        target="_blank"
        title="瀏覽網頁"
        class="flex-shrink-0 p-1 ml-1 rounded w-7 h-7 hover:bg-violet-600 indigo:hover:bg-indigo-600 hover:text-white"
        >
          <RemixIcon icon="external-link-line" />
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { inject, onBeforeUnmount, ref, watch } from 'vue'
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
        isActive: {
          type: Function,
          default: () => false,
        },
      },
      setup(props) {
      const editor = inject('editor')
      const editorEvent = inject('editorEvent')
      const url = ref('')
      const urlEl = ref(null)
      const showPopover = ref(false)
      editorEvent.on('link-selected', attrs => {
        url.value = attrs.href
      })
      onBeforeUnmount(() => {
        editorEvent.off('link-selected')
      })
      watch(() => props.isActive(), isActive => {
        if (!isActive) {
          showPopover.value = false
        }
      })

      // 控制顯示
      const handleAction = () => {
        showPopover.value = !showPopover.value
        if (!showPopover.value) return
        if (props.isActive()) {
          // 更新連結
          url.value = editor.value.getAttributes('link').href || ''
        } else {
          // 建立連結
          url.value = ''
          props.action(url.value)
        }
        setTimeout(() => {
          urlEl.value.focus()
        })
      }
      
      // 更新連結
      const handleSubmit = () => {
        props.action(url.value)
        showPopover.value = false
      }

      const handleUnlink = () => {
        props.action(null)
        showPopover.value = false
      }
      
      return {
        url,
        urlEl,
        showPopover,
        handleAction,
        handleSubmit,
        handleUnlink,
      }
    },
  }
  </script>