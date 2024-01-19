<template>
    <div :class="wrapperClass">
      <label :for="id" class="form-label">
        {{ label }}
      </label>
  
      <div :class="imageWrapperClass">
        <div class="overflow-hidden" :class="imageClass">
          <!-- 預覽圖片 -->
          <img
            v-if="previewImageSrc || defaultImage"
            :src="previewImageSrc || defaultImage"
            class="object-cover"
          >
    
          <!-- 預設佔位灰底區塊 -->
          <div v-else class="flex items-center justify-center text-white bg-gray-400 dark:bg-gray-600 dark:text-gray-300">
            <heroicons-outline-photograph class="w-10 h-10" />
          </div>
  
          <!-- 刪除圖片按鈕 -->
          <div v-if="modelFile">
            <button
              type="button"
              class="absolute flex items-center justify-center w-6 h-6 text-white rounded-full top-4 right-4 bg-gray-700/50"
              @click="removeSelectedFile"
            >
              <heroicons-outline-x class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
  
      <PrimaryButton class="flex items-center w-full mt-3" @click="selectFile">
        <heroicons-outline-cloud-upload class="mr-1" />
        上傳圖片
      </PrimaryButton>
  
      <div v-if="error" class="form-error">{{ error }}</div>
      <div class="mt-2 text-sm text-gray-400">
        圖片最大 5MB
      </div>
  
      <input
        ref="fileEl"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onChangeFile"
      >
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useVModel } from '@vueuse/core'
  export default {
    inheritAttrs: false,
    emits: ['update:modelValue'],
    props: {
      id: String,
      modelValue: File,
      defaultImage: String,
      label: String,
      error: String,
      wrapperClass: [String, Array, Object],
      imageClass: {
      type: [String, Array, Object],
      default: 'aspect-w-1 aspect-h-1',
    },
    imageWrapperClass: [String, Array, Object],
    },
    setup(props, { emit }) {
      const modelFile = useVModel(props)
      const fileEl = ref(null)
      const previewImageSrc = ref(null)
      const selectFile = () => {
        fileEl.value.click()
      }

      // 上傳新圖片
      const onChangeFile = () => {
        const [file] = fileEl.value.files
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const dataUrl = reader.result
          previewImageSrc.value = dataUrl
          emit('update:modelValue', file)
        }
      }

      // 刪除選擇檔案
      const removeSelectedFile = () => {
        previewImageSrc.value = null
        emit('update:modelValue', null)
      }

      return { modelFile, fileEl, previewImageSrc, selectFile, onChangeFile, removeSelectedFile }
    },
  }
  </script>