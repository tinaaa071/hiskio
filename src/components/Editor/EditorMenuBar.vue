<template>
    <div class="sticky top-0 inset-0 z-10 px-3 py-2 flex items-center flex-wrap bg-white border-b border-gray-200 rounded-t-md">
      <template
      v-for="(item, index) in items"
      :key="item.type === 'divider' ? `divider-${index}` : item.icon"
    >
        <div class="w-[2px] h-5 bg-gray-200 ml-2 mr-3" v-if="item.type === 'divider'" />
        <EditorMenuLink v-else-if="item.icon === 'link'" v-bind="item" />
        <EditorMenuImage v-else-if="item.icon === 'image-line'" v-bind="item" />
        <EditorMenuItem v-else v-bind="item" />
      </template>
    </div>
  </template>
  
  <script>
  import { inject } from 'vue'
  export default {
    props: {
      editor: {
        type: Object,
        required: true,
      },
    },
    setup() {
      const editor = inject('editor')
      const items = [
        {
          icon: 'bold',
          title: '粗體',
          action: () => editor.value.chain().focus().toggleBold().run(),
          isActive: () => editor.value.isActive('bold'),
        },
        {
          icon: 'italic',
          title: '斜體',
          action: () => editor.value.chain().focus().toggleItalic().run(),
          isActive: () => editor.value.isActive('italic'),
        },
        {
          icon: 'strikethrough',
          title: '刪除線',
          action: () => editor.value.chain().focus().toggleStrike().run(),
          isActive: () => editor.value.isActive('strike'),
        },
        // 連結功能
        {
            icon: 'link',
            title: '連結',
            action: url => {
              // 判斷已點選連結時
              // 為 String => 新增連結
              // 若不是 => 刪除連結
              if (typeof url === 'string') {
              editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            } else if (editor.value.isActive('link')) {
              editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
            }
            },
            isActive: () => editor.value.isActive('link'),
        },
        // 圖片功能
        {
          icon: 'image-line',
          title: '圖片',
          action: url => editor.value.chain().focus().setImage({ src: url }).run(),
        },
        {
          type: 'divider',
        },
        {
          icon: 'h-1',
          title: '標題 1',
          action: () => editor.value.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.value.isActive('heading', { level: 1 }),
        },
        {
          icon: 'h-2',
          title: '標題 2',
          action: () => editor.value.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.value.isActive('heading', { level: 2 }),
        },
        {
          icon: 'paragraph',
          title: '文字',
          action: () => editor.value.chain().focus().setParagraph().run(),
          isActive: () => editor.value.isActive('paragraph'),
        },
        {
          icon: 'list-unordered',
          title: '無序列表',
          action: () => editor.value.chain().focus().toggleBulletList().run(),
          isActive: () => editor.value.isActive('bulletList'),
        },
        {
          icon: 'list-ordered',
          title: '有序列表',
          action: () => editor.value.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.value.isActive('orderedList'),
        },
        {
          type: 'divider',
        },
        {
          icon: 'double-quotes-l',
          title: '註釋區塊',
          action: () => editor.value.chain().focus().toggleBlockquote().run(),
          isActive: () => editor.value.isActive('blockquote'),
        },
        {
          icon: 'separator',
          title: '分隔線',
          action: () => editor.value.chain().focus().setHorizontalRule().run(),
        },
      ]
      return { items }
    },
  }
  </script>