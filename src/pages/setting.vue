<template>
    <Layout>
      <PageHeader>
        <template #title>個人資料</template>
      </PageHeader>
  
      <Card class="mt-6" stretch>
        <CardContent>
          <form @submit.prevent="submit">
            <div class="grid gap-6 md:grid-cols-12">
              <div class="space-y-6 md:col-span-9">
                <TextInput label="姓名" id="name" v-model="form.name" />
                <TextareaInput label="介紹" id="description" v-model="form.description" class="h-28" />
              </div>
  
              <div class="text-center order-first md:col-span-3 md:order-none">
                <ImageUpload
                  id="avatar"
                  v-model="form.avatar"
                  :default-image="defaultAvatar"
                  image-class="aspect-w-1 aspect-h-1 rounded-full"
                  image-wrapper-class="w-32 mx-auto"
                />
              </div>
  
              <div class="md:col-span-6">
                <TextInput label="E-mail" type="email" id="email" v-model="form.email" />
              </div>
  
              <div class="md:col-span-6">
                <TextInput label="密碼" type="password" id="password" v-model="form.password" />
              </div>
            </div>
  
            <div class="mt-6 flex justify-end">
              <PrimaryButton type="submit" class="w-full md:w-auto">
                儲存設定
              </PrimaryButton>
            </div>
          </form>
        </CardContent>
  
        <Loading :show="loading" text="保存中..." />
      </Card>
    </Layout>
  </template>
  
  <script>
  import { reactive, ref } from 'vue'
  import { promiseTimeout } from '@vueuse/core'
  import { successNotify } from '@/composables/useNotification'
  export default {
    setup() {
      const loading = ref(false)

      // 表單
      const form = reactive({
        name: 'Tina',
        description: '哈囉！我是 Tina~',
        avatar: null,
        email: 'test@email.com',
        password: '',
      })

      const defaultAvatar = ref('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

      const submit = async () => {
        loading.value = true
        await promiseTimeout(1000)
        loading.value = false
        successNotify('個人資料保存成功')
      }
      
      return {
        loading,
        form,
        defaultAvatar,
        submit,
      }
    },
  }
  </script>