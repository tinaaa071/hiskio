<template>
    <div class="flex items-center justify-center min-h-screen bg-violet-600 indigo:bg-indigo-600 dark:bg-gray-800">
      <div class="w-[400px] px-4">
        <h1 class="flex items-center justify-center text-white">
          <heroicons-outline-book-open class="w-10 h-10 mr-2" />
          <span class="text-4xl font-medium">Press</span>
        </h1>
  
        <Card class="p-6 mt-8 sm:p-8">
          <form class="space-y-8" @submit.prevent="handleSubmit">
            <!-- Email -->
            <TextInput label="E-mail" type="email" id="email" v-model="form.email" />
            <!-- 密碼 -->
            <TextInput label="密碼" type="password" id="password" v-model="form.password" />
  
            <!-- 登入按鈕 -->
            <PrimaryButton type="submit" class="w-full" :loading="loading">
              登入
            </PrimaryButton>
          </form>
  
          <!-- 註冊按鈕 -->
          <hr class="mt-6 mb-4 border-gray-300 dark:border-gray-500">
          <div class="text-center text-gray-600 dark:text-gray-300">
            沒有帳號? 
            <RouterLink to="/register" class="link">馬上註冊</RouterLink>
          </div>
        </Card>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { promiseTimeout } from '@vueuse/core'
  export default {
    setup() {
      const router = useRouter()
      const loading = ref(false)
      const form = reactive({
        email: '',
        password: '',
      })
      const handleSubmit = async () => {
        loading.value = true
        await promiseTimeout(1000)
        loading.value = false
        router.push('/')
      }
      return { form, loading, handleSubmit }
    },
  }
  </script>