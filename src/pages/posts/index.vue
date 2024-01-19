<template>
    <Layout>
        <!-- 標題區 -->
        <PageHeader>
            <template #title="">文章</template>
            <template #actions="">
                <PrimaryButton to="/posts/create">
                    新增
                </PrimaryButton>
            </template>
        </PageHeader>

        <!-- 篩選、搜尋 -->
        <div class="mt-6 md:flex md:justify-between md:items-center">
            <SearchFilter
                @filter="handleFilter"
                @search="handleSearch"
            />

            <SortSelect
                v-model="sort"
                class="mt-4 md:mt-0 md:ml-2"
            />
        </div>

        <!-- 表格 -->
        <Card class="mt-6" stretch>
            <Table
                :columns="columns"
                :data="data"
                confirm-delete-text="確定要刪除文章嗎?"
                @delete-selected="handleDeleteSelectedPosts"
            >
                <!-- 文章標題、簡介 -->
                <template #column-title="{ record, value }">
                    <RouterLink :to="`/posts/${record.id}`" class="font-normal link">
                        {{ value }}
                    </RouterLink>
                </template>
                <!-- 瀏覽次數 -->
                <template #column-visits="{ value }">
                    <heroicons-outline-eye class="inline-block w-4 h-4" />
                    {{ value }}次
                </template>
                <!-- 標籤 -->
                <template  #column-tags="{ value }">
                    <span class="inline-flex space-x-2">
                        <span 
                        v-for="tag in value" 
                        :key="tag"
                        class="bg-violet-600 indigo:bg-indigo-600 px-2 py-0.5 text-white rounded-full text-sm font-normal tracking-wider"
                        >
                        {{ tag }}
                    </span>
                    </span>
                </template>
                <!-- 按鈕 -->
                <template #actions="{ record, confirmDeleteText }">
                    <EditAction :to="`/posts/${record.id}`" />
                    <DeleteAction 
                    :record="record"
                    :confirm-text="confirmDeleteText"
                    @delete="handleDeletePost" 
                    />
                </template>
            </Table>
        </Card>
    </Layout>
</template>

<script>
import { ref } from "vue";
import { successNotify } from '@/composables/useNotification'

export default {
    // 設定資料
    setup () {
        // 欄位
        const columns = ref([
            { key: 'title', label: '標題' },
            { key: 'description', label: '簡介' },
            { key: 'visits', label: '瀏覽次數' },
            { key: 'created_at', label: '建立日期' },
            { key: 'tags', label: '標籤' }
        ])
        // 資料
        const data = ref([
            {
                id: 1,
                title: '測試文章1',
                description: '文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介...',
                visits: 123,
                created_at: '2024/01/11',
                tags: ['標籤一', '標籤二'],
            },
            {
                id: 2,
                title: '測試文章2',
                description: '文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介...',
                visits: 1000,
                created_at: '2024/01/11',
                tags: ['標籤一', '標籤二'],
            },
            {
                id: 3,
                title: '測試文章3',
                description: '文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介文章簡介...',
                visits: 33,
                created_at: '2024/01/11',
                tags: ['Tailwind', 'Vue', 'TEST'],
            },
        ])

        // 排序
        const sort = ref('asc')

        const handleDeletePost = deleteRecord => {
        // 刪除單一文章
        data.value = data.value.filter(record => record.id !== deleteRecord.id)
        successNotify('文章刪除成功')
        }

        const handleDeleteSelectedPosts = ids => {
        // 刪除選取文章
        data.value = data.value.filter(record => !ids.includes(record.id))
        successNotify('文章刪除成功')
        }

        const handleFilter = data => {
        console.log(data)
        }
        const handleSearch = query => {
        console.log(query)
        }

        return {
        columns,
        data,
        sort,
        handleDeletePost,
        handleDeleteSelectedPosts,
        handleFilter,
        handleSearch,
        }
    }
}
</script>

