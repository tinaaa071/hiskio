<template>
    <Card class="flex items-center px-5 py-3">
      <div class="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 indigo:bg-indigo-100 dark:bg-gray-600 text-violet-600 indigo:text-indigo-600 dark:text-violet-300">
        <heroicons-outline-eye v-if="icon === 'eye'" />
        <heroicons-outline-star v-else-if="icon === 'star'" />
        <heroicons-outline-annotation v-else-if="icon === 'annotation'" />
      </div>
      <div class="flex-grow ml-3">
        <h4 class="text-sm font-normal tracking-wider text-gray-400">
          {{ label }}
        </h4>
        <div class="text-3xl font-semibold text-gray-800 dark:text-gray-50">
          {{ value }}
        </div>
      </div>
      <Trending 
      :is-up="isUp" 
      :value="trending" 
      percentage 
      />
    </Card>
  </template>
  
  <script>
  export default {
    props: {
      icon: String,
      label: String,
      value: [Number, String],
      isUp: Boolean,
      trending: [Number, String],
    },
  }
  </script>