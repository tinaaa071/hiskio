<template>
  <div class="flex flex-col min-h-screen sm:flex-row">
    <!-- 左側選單欄 -->
    <div class="relative z-20 flex flex-col justify-between flex-shrink-0 w-full text-white bg-violet-600 indigo:bg-indigo-600 indigo:bg-indigo-600 sm:w-64 sm:fixed sm:inset-y-0">
      <!-- Logo -->
      <div class="flex items-center justify-between h-16 px-3 sm:justify-center r">
        <div class="flex items-center justify-center">
            <heroicons-outline-book-open class="w-10 h-10 mr-2" />
            <span class="text-xl font-medium">Dashboard</span>
        </div>

        <button type="button" 
        class="flex items-center justify-center w-8 h-8 sm:hidden"
        @click="toggleMenu">
          <heroicons-outline-menu class="w-5 h-5" />
        </button>
      </div>

      <div 
      class="flex-grow sm:flex sm:flex-col sm:justify-between"
      :class="showMenu ? '' : 'hidden'">
          <!-- 主要選單 -->
          <ul>
            <!-- 原做法 -->
            <!-- <li>
              <RouterLink to="/" class="flex px-3 py-3 text-white items- center sm:px-5">
                <heroicons-outline-home class="w-5 h-5 mr-2" />
                首頁
              </RouterLink>
            </li> -->

            <!-- 使用 v-for -->
            <li v-for="item in menuItems" :key="item.to">
              <RouterLink :to="item.to" 
              class="flex px-3 py-3 items- center sm:px-5 "
              :class="isActive(item.to) ? 'text-white' : 'text-violet-400 indigo:text-indigo-400 indigo:text-indigo-400 hover:text-white'">
                <component :is="item.icon" class="w-5 h-5 mr-2" />
                {{ item.text }}
              </RouterLink>
            </li>
          </ul>

          <!-- 用戶名稱區塊（手機版） -->
          <div class="py-1 mt-2 border-t border-violet-400 indigo:border-indigo-400 indigo:border-indigo-400 sm:hidden">
            <div class="flex px-3 py-3 items- center">
              <img class="object-cover w-8 h-8 mr-2 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
              <div class="font-medium tracking-wide">Tina</div>
            </div>

            <ul>
              <template
              v-for="item in userMenuItems"
              :key="item.text">
                <li v-if="item.mobile">
                  <component 
                  :is="item.tag"
                  :to="item.to"
                  class="flex items-center w-full px-4 py-3 text-violet-400 indigo:text-indigo-400 indigo:text-indigo-400 hover:text-white"
                  @click="item.onClick">
                    {{ item.text }}
                  </component>
                </li>
              </template>
            </ul>
          </div>

          <!-- 用戶名稱區塊（電腦版） -->
          <div class="hidden px-5 py-4 border-t sm:flex sm:justify-between sm:items-center border-violet-400 indigo:border-indigo-400 indigo:border-indigo-400">
            <div class="flex items-center">
              <img class="object-cover w-8 h-8 mr-2 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
              <div class="font-medium tracking-wide">Tina</div>
            </div>

            <!-- Menu -->
            <!-- 預設不會渲染出 html，使用 as 設定要渲染出的標籤 -->
            <Menu as="div" class="relative">
              <!-- 按鈕 -->
              <MenuButton class="flex items-center justify-center transition-colors duration-100 rounded w-7 h-7 hover:bg-violet-500 indigo:hover:bg-indigo-500 indigo:hover:bg-indigo-500" type="button">
                <heroicons-outline-dots-vertical class="w-4 h-4" />
              </MenuButton>

              <!-- 動畫 -->
              <TransitionZoom>
                <MenuItems class="absolute bottom-0 flex flex-col w-32 ml-2 overflow-hidden origin-bottom-left bg-white rounded-md shadow-lg left-full">
                  <MenuItem 
                  v-slot="{ active }" 
                  v-for="item in userMenuItems"
                  :key="item.text">
                    <component
                    :is="item.tag"
                    :to="item.to" 
                    class="px-3 py-2 text-base font-normal text-left text-gray-700"
                    :class="active ? 'bg-gray-100' : ''"
                    @click="item.onClick"
                    >
                      {{ item.text }}
                    </component>
                  </MenuItem>
                </MenuItems>
              </TransitionZoom>
            </Menu>
          </div>
        </div>
    </div>

    <!-- 右側內容區 -->
    <div class="relative z-10 flex-grow min-w-0 bg-gray-50 sm:pl-64">
      <div class="p-6 sm:px-10 sm:py-8">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import HeroiconsOutlineHome from "~icons/heroicons-outline/home";
import HeroiconsOutlineDocumentText from "~icons/heroicons-outline/document-text";
import HeroiconsOutlineUser from "~icons/heroicons-outline/user";

export default {
  components: {
    HeroiconsOutlineHome,
    HeroiconsOutlineDocumentText,
    HeroiconsOutlineUser
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const showMenu = ref(false)
    // 在 setup 內操作 value 需加上「.value」
    const toggleMenu = () => showMenu.value = !showMenu.value

    // 「主選單按鈕」功能
    const menuItems = [
      { to: '/', text: '首頁', icon: 'heroicons-outline-home' },
      { to: '/posts', text: '文章', icon: 'heroicons-outline-document-text' },
      { to: '/setting', text: '個人資料', icon: 'heroicons-outline-user' },
    ]

    // 「個人資料區按鈕」功能
    const userMenuItems = [
      {
        tag: 'RouterLink',
        to: '/setting',
        text: '個人資料'
      },
      {
        tag: 'button',
        text: '登出',
        mobile: true,
        onClick: () => {
          // 路由
          router.push('/login')
        }
      }
    ]

    // 建立變數 activeItem 判斷哪個選項和當前匹配
    // 若有子項目時，可用 startsWith 判斷是否在前一個路徑下
    const activeItem = computed(() => 
      [...menuItems]
        .reverse()
        .find(item => route.path.startsWith(item.to))
    )

    // 判斷當前路徑目標的 to 是否等於 activeItem 的 to
    const isActive = to => to === activeItem.value.to

    return { showMenu, toggleMenu, menuItems, isActive, userMenuItems }
  }
}
</script>

