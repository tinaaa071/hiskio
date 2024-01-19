import { computed, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const themeOptions = [
  { label: '紫色', value: 'violet', color: 'bg-violet-500' },
  { label: '藍色', value: 'indigo', color: 'bg-indigo-500', htmlClass: 'theme-indigo' },
  { label: '黑色', value: 'dark', color: 'bg-gray-600', htmlClass: 'dark' },
]

const theme = useLocalStorage('theme', 'violet')

const currentTheme = computed(() => themeOptions.find(item => item.value === theme.value))

const applyColor = mapping => mapping[theme.value] || ''

watch(theme, () => {
  // 刪除原有 class
  document.documentElement.classList.remove(
    ...themeOptions
      .filter(item => item.htmlClass)
      .map(item => item.htmlClass)
  )

  // 新增 class
  if (currentTheme.value &&
      currentTheme.value.htmlClass
  ) {
    document.documentElement.classList.add(currentTheme.value.htmlClass)
  }
}, { immediate: true })

export function useTheme() {
  return { theme, themeOptions, currentTheme, applyColor }
}