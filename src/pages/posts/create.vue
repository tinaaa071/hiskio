<template>
    <Layout>
      <PageHeader>
        <template #title>
          <RouterLink to="/posts" class="link">文章</RouterLink>
          / 新增文章
        </template>
      </PageHeader>
  
      <Card class="mt-6" stretch>
        <!-- 表單區塊 -->
        <CardContent>
          <PostForm
            v-model="form"
            :default-image="defaultImage"
            :tags-autocomplete-items="tagsAutocompleteItems"
            @submit="submit"
            @submit-draft="submitDraft"
          />
        </CardContent>

        <!-- 載入中 -->
        <Loading :show="loading" text="保存中..." />
      </Card>
    </Layout>
  </template>
  
  <script>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { promiseTimeout } from '@vueuse/core'
  import { successNotify } from '@/composables/useNotification'
  export default {
    setup() {
      const router = useRouter()

      const loading = ref(false)

      // 預設圖片
      const defaultImage = ref('')

      const tagsAutocompleteItems = ref([
      'Vue 2',
      'Vue 3',
      'Tailwind CSS',
      ])

      // 表單
      const form = reactive({
        title: '',
        content: '',
        image: null,
        description: '',
        tags: [],
      })

      // 送出
      const submit = async () => {
        loading.value = true
        await promiseTimeout(1000)
        loading.value = false
        router.push('/posts').then(() => {
          successNotify('文章發布成功')
        })
      }

      // 送出草稿
      const submitDraft = async () => {
        loading.value = true
        await promiseTimeout(1000)
        loading.value = false
        router.push('/posts').then(() => {
          successNotify('草稿保存成功')
        })
      }

      return {
      loading,
      defaultImage,
      tagsAutocompleteItems,
      form,
      submit,
      submitDraft,
      }
    },
  }
  </script>