<!-- 按鈕 -->
<!-- <template>
  <Layout>
    <div class="p-4 space-y-4">
      <div class="space-x-4">
        <PrimaryButton disabled>
          主要按鈕
        </PrimaryButton>
        <PrimaryButton to="/">
          主要按鈕
        </PrimaryButton>

        <SecondaryButton disabled>
          次要按鈕
        </SecondaryButton>

        <DangerButton disabled>
          刪除帳號
        </DangerButton>
      </div>
    </div>
  </Layout>
</template> -->


<!-- 表單 -->
<!-- <template>
  <Layout>
    <div class="p-4 space-y-4">
      <div>
        <input type="text" class="form-input">
      </div>

      <div>
        <textarea class="form-textarea"></textarea>
      </div>

      <label>
        <input type="checkbox" class="form-checkbox">多選框
      </label>

      <label>
        <input type="radio" class="form-radio">單選框
      </label>
    </div>
  </Layout>
</template> -->


<!-- 彈出視窗 -->
<!-- <template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="showModal = true">
        彈出視窗
      </PrimaryButton>
    
      <Modal v-model="showModal">
        <template v-slot:title>
          哈囉，這是標題
        </template>
        <template v-slot:content>
          <div class="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aspernatur, deleniti culpa, asperiores quae natus tempore laboriosam expedita veniam adipisci, eaque libero cupiditate pariatur iure! Sequi fugit illum fugiat natus?
          </div>
        </template>
      </Modal>
    </div>
  </Layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const showModal = ref(false)

    return {
      showModal
    }
  }
}
</script> -->


<!-- 確認彈出視窗 -->
<!-- <template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="showModal = true">
        彈出視窗
      </PrimaryButton>
    
      <ConfirmModal 
        v-model="showModal"
        title="確定要刪除文章嗎？" 
        @success="console.log('success')"
        @cancel="console.log('cancel')"
      />
    </div>
  </Layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const showModal = ref(false)

    // 測試
    // const success = () => console.log('success')
    // const cancel = () => console.log('cancel')

    return { showModal }
  }
}
</script> -->


<!-- 刪除彈出視窗 -->
<!-- <template>
  <Layout>
    <div class="p-4">
      <DangerButton @click="deletePost">
        刪除
      </DangerButton>
    
    </div>
  </Layout>
</template>

<script>
import { useConfirmModal } from "@/composables/useConfirmModal";
// import { ref } from "vue";

export default {
  setup() {
    const { showModal, confirmTitle } = useConfirmModal()

    const deletePost = () => {
      confirmTitle.value = '1234'
      showModal.value = true
    }

    return { deletePost }
  }
}
</script> -->


<!-- 刪除彈出視窗(ver.2) -->
<!-- <template>
  <Layout>
    <div class="p-4">
      <DangerButton @click="deletePost">
        刪除
      </DangerButton>
    
    </div>
  </Layout>
</template>

<script>
import { useConfirm } from "@/composables/useConfirmModal";

export default {
  setup() {
    const deletePost = () => {
      useConfirm('確定要刪除文章嗎?').then(result => {
        if (result) {
          console.log('刪除成功')
        }
      })
    }

    return { deletePost }
  }
}
</script> -->


<!-- 訊息提示 -->
<!-- <template>
  <Layout>
    <div class="p-4">
      <PrimaryButton @click="open">
        顯示通知
      </PrimaryButton>
    
    </div>
  </Layout>
</template>

<script>
import { notify, successNotify, warnNotify, errorNotify } from "@/composables/useNotification";
// import { notify } from "@kyvg/vue3-notification";

export default {
  setup() {
    const open = () => {
      notify('更新成功！')
    }

    return { open }
  }
}
</script> -->


<!-- 首頁 -->
<template>
  <Layout>
    <!-- 標題 -->
    <PageHeader>
      <template #title="">首頁</template>
    </PageHeader>

    <!-- 內容 -->
    <div class="grid gap-4 mt-6 md:grid-cols-12">
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="eye"
        label="瀏覽人次"
        value="145"
        :is-up="true"
        trending="12"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="star"
        label="點讚數"
        value="591"
        :is-up="false"
        trending="2"
        stretch
      />
      <TrendingCard
        class="md:col-span-12 lg:col-span-4"
        icon="annotation"
        label="留言數"
        value="7"
        :is-up="true"
        trending="53"
        stretch
      />

      <Card class="min-w-0 md:col-span-8" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">瀏覽人次</h2>
          <div class="flex-grow min-h-0 pt-4">
            <canvas ref="lineChartEl"></canvas>
          </div>
        </div>
      </Card>

      <Card class="min-w-0 md:col-span-4" stretch>
        <div class="h-[300px] flex flex-col p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">瀏覽裝置</h2>
          <div class="flex-grow min-h-0 pt-4">
            <canvas ref="barChartEl"></canvas>
          </div>
        </div>
      </Card>

      <!-- 文章列表 -->
      <Card class="h-full min-w-0 md:col-span-8" stretch>
        <div class="flex justify-between p-5 pb-0">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">熱門文章</h2>
          <RouterLink to="/posts" class="flex items-center font-normal link">
            全部文章
            <heroicons-outline-chevron-double-right class="ml-1" />
          </RouterLink>
        </div>

        <Table
          class="mt-4"
          :columns="postsColumns"
          :data="postsData"
          :show-selection="false"
          :show-actions="false"
          :show-paginator="false"
        >
          <template #column-title="{ record, value }">
            <RouterLink :to="`/posts/${record.id}`" class="font-normal link">
              {{ value }}
            </RouterLink>
          </template>
          <template #column-visits="{ record, value }">
            <div class="inline-flex items-center font-normal">
              <heroicons-outline-eye class="inline-block w-4 h-4 mr-1" />
              {{ value }}次
              <Trending
                class="ml-2"
                :is-up="record.visits_trending_is_up"
                :value="record.visits_trending_value"
                percentage
              />
            </div>
          </template>
        </Table>
      </Card>

      <!-- 最新留言 -->
      <Card class="h-full min-w-0 md:col-span-4" stretch>
        <div class="p-5">
          <h2 class="text-xl font-semibold tracking-wide text-gray-700">最新留言</h2>
          <ul class="mt-4 space-y-4">
            <li class="flex" v-for="comment in comments" :key="comment.id">
              <img class="object-cover w-8 h-8 rounded-full" :src="comment.author_avatar" alt="">
              <div class="flex-grow mt-1 ml-4">
                <div class="font-medium tracking-wide text-gray-800">
                  {{ comment.author_name }}
                </div>
                <div class="mt-2 text-sm text-gray-500">
                  {{ comment.content }}
                </div>
                <div class="mt-2 px-3 py-1.5 bg-gray-100 text-gray-500 text-sm rounded">
                  留言文章：<RouterLink :to="`/posts/${comment.post_id}`" class="link">{{ comment.post_title }}</RouterLink>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>

    </div>
  </Layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useLineChart, useBarChart } from '@/composables/useChart'
import { useTheme } from '@/composables/useTheme'

export default {
  setup() {
    const { applyColor } = useTheme()

    const lineChartEl = ref(null)
    const barChartEl = ref(null)

    onMounted(() => {
      // 折線圖
      useLineChart(
        lineChartEl,
        ['6/21(一)', '6/22(二)', '6/23(三)', '6/24(四)', '6/25(五)', '6/26(六)', '6/27(日)'],
        [
          {
            label: '6/21 - 6/27',
            data: [0, 10, 5, 2, 20, 30, 45],
            color: applyColor({ violet: '#7C3AED', indigo: '#4f46e5' }), // violet-600
          },
          {
            label: '6/14 - 6/20',
            data: [6, 25, 22, 37, 14, 8, 4],
            color: applyColor({ violet: '#C4B5FD', indigo: '#a5b4fc' }), // violet-300
          },
          ]
      )

      // 長條圖
      useBarChart(
        barChartEl,
        ['一', '二', '三', '四', '五', '六', '日'],
        [
          {
            label: '電腦',
            data: [0, 10, 5, 2, 20, 30, 45],
            color: applyColor({ violet: '#7C3AED', indigo: '#4f46e5' }), // violet-600
          },
          {
            label: '手機',
            data: [6, 25, 22, 37, 14, 8, 4],
            color: applyColor({ violet: '#C4B5FD', indigo: '#a5b4fc' }), // violet-300
          },
          ]
          // 此處無修改 options，所以沒有傳入
      )
    })

    // 文章欄位
    const postsColumns = ref([
      { key: 'title', label: '標題' },
      { key: 'visits', label: '瀏覽次數' },
      { key: 'created_at', label: '建立日期' },
    ])

    // 文章資料
    const postsData = ref([
      {
        id: 1,
        title: '我的文章1',
        visits: 38,
        visits_trending_is_up: false,
        visits_trending_value: 4,
        created_at: '2021/11/01',
      },
      {
        id: 2,
        title: '我的文章2',
        visits: 29,
        visits_trending_is_up: false,
        visits_trending_value: 9,
        created_at: '2021/11/01',
      },
      {
        id: 3,
        title: '我的文章3',
        visits: 13,
        visits_trending_is_up: true,
        visits_trending_value: 12,
        created_at: '2021/11/01',
      },
      {
        id: 4,
        title: '我的文章4',
        visits: 4,
        visits_trending_is_up: false,
        visits_trending_value: 3,
        created_at: '2021/11/01',
      },
      {
        id: 5,
        title: '我的文章5',
        visits: 15,
        visits_trending_is_up: false,
        visits_trending_value: 8,
        created_at: '2021/11/01',
      },
      {
        id: 6,
        title: '我的文章6',
        visits: 45,
        visits_trending_is_up: true,
        visits_trending_value: 18,
        created_at: '2021/11/01',
      },
      {
        id: 7,
        title: '我的文章7',
        visits: 71,
        visits_trending_is_up: true,
        visits_trending_value: 7,
        created_at: '2021/11/01',
      },
    ])

    // 留言資料
    const comments = ref([
      {
        author_name: 'Tina',
        author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Tina',
        author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: '哈囉~~ 你好~',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Tina',
        author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
      {
        author_name: 'Tina',
        author_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        content: '哇！寫得好好喔！！！',
        post_id: 1,
        post_title: '我的文章1',
      },
    ])

    return {
      lineChartEl,
      barChartEl,
      postsColumns,
      postsData,
      comments
    }
  }
}
</script>