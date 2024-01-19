<template>
    <div class="flex items-center">
      <div class="flex flex-grow rounded-md shadow md:flex-grow-0">
        <!-- 篩選 -->
        <Popover class="relative flex-shrink-0 -mr-px focus:z-[1]">
          <PopoverButton class="pl-4 rounded-r-none form-select">
            篩選
          </PopoverButton>
  
          <TransitionZoom>
            <PopoverPanel
                class="absolute z-10 origin-top-left"
                v-slot="{ close }"
            >
            <div class="mt-2 p-4 w-[270px] bg-white dark:bg-gray-700 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg space-y-4">
                <div>
                    <label class="text-sm text-gray-400">建立日期</label>
                    <div class="flex mt-1">
                    <select
                        v-model="form.created_date_compare"
                        class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                    >
                        <option value="before">之前</option>
                        <option value="after">之後</option>
                    </select>
                    <input
                        v-model="form.created_date_value"
                        type="date"
                        class="form-input form-input-sm rounded-l-none focus:z-[1]"
                    >
                    </div>
                </div>

                <div>
                    <label class="text-sm text-gray-400">瀏覽次數</label>
                    <div class="flex mt-1">
                    <select
                        v-model="form.visits_compare"
                        class="form-select form-select-sm w-[100px] -mr-px rounded-r-none focus:z-[1]"
                    >
                        <option value="gt">大於</option>
                        <option value="lt">小於</option>
                    </select>
                    <input
                        v-model="form.visits_count"
                        type="number"
                        class="form-input form-input-sm rounded-l-none focus:z-[1]"
                    >
                    </div>
                </div>

                <div>
                    <label class="text-sm text-gray-400">標籤</label>
                    <div class="mt-1">
                    <label
                        v-for="tag in tagOptions"
                        :key="tag"
                        class="flex items-center"
                    >
                        <input
                        type="checkbox"
                        class="mr-1 form-checkbox"
                        v-model="form.tags"
                        :value="tag"
                        >
                        <span>{{ tag }}</span>
                    </label>
                    </div>
                </div>

                <div>
                    <label class="text-sm text-gray-400">軟刪除</label>
                    <div class="mt-1">
                    <!-- 默認 -->
                    <label class="flex items-center">
                        <input
                        type="radio"
                        class="mr-1 form-radio"
                        v-model="form.soft_delete"
                        value="default"
                        >
                        <span>默認</span>
                    </label>
                    <!-- 包含軟刪除 -->
                    <label class="flex items-center">
                        <input
                        type="radio"
                        class="mr-1 form-radio"
                        v-model="form.soft_delete"
                        value="contains"
                        >
                        <span>包含軟刪除</span>
                    </label>
                    <!-- 只有軟刪除 -->
                    <label class="flex items-center">
                        <input
                        type="radio"
                        class="mr-1 form-radio"
                        v-model="form.soft_delete"
                        value="only"
                        >
                        <span>只有軟刪除</span>
                    </label>
                    </div>
                </div>

                <div class="flex justify-end space-x-2">
                    <SecondaryButton class="btn-sm" @click="close">
                    取消
                    </SecondaryButton>
                    <PrimaryButton class="btn-sm" @click="submit(close)">
                    確定
                    </PrimaryButton>
                </div>
                </div>
                </PopoverPanel>
            </TransitionZoom>
        </Popover>
  
        <!-- 搜尋 -->
        <input
        type="text"
        placeholder="搜尋..."
        v-model="search"
        class="form-input placeholder-gray-400 focus:z-[1] rounded-l-none md:max-w-[200px]"
        @keyup.enter="submitSearch"
        >
      </div>
  
      <button
      type="button"
      class="flex-shrink-0 ml-2 text-gray-400 transition-colors duration-100 hover:text-gray-500"
      @click="reset"
      >
        清除
      </button>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue'
  export default {
  emits: ['filter', 'search', 'reset'],
  setup(props, { emit }) {
    // 標籤
    const tagOptions = ref([
      '標籤1', '標籤2', 'Tailwind CSS',
    ])

    // 表單
    const form = reactive({
      created_date_compare: null,
      created_date_value: null,
      visits_compare: null,
      visits_count: null,
      tags: [],
      soft_delete: 'default',
    })

    // 搜尋
    const search = ref('')

    // 點擊確認關閉
    const submit = close => {
      emit('filter', { ...form })
      close()
    }

    // 呼叫 search，將值傳出
    const submitSearch = () => {
      emit('search', search.value)
    }

    // 清除
    const reset = () => {
      form.created_date_compare = null
      form.created_date_value = null
      form.visits_compare = null
      form.visits_count = null
      form.tags = []
      form.soft_delete = 'default'
      search.value = ''
    }

    return { tagOptions, form, search, submit, submitSearch, reset }
  },
}
  </script>