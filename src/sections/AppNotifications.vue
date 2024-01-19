<template>
  <notifications>
    <template #body="{ item, close }">
        <div 
        class="relative mx-4 mb-4 overflow-hidden bg-white rounded-lg shadow-lg notification dark:bg-gray-600"
        :class="`notification-${item.type || 'default'}`"
        >
            <div class="flex p-3 border-l-4 notification-inner">
                <!-- icon -->
                <div>
                    <!-- success -->
                    <heroicons-outline-check-circle
                    v-if="item.type === 'success'" 
                    class="notification-icon" 
                    />
                    <!-- warn -->
                    <heroicons-outline-information-circle
                    v-else-if="item.type === 'warn'"
                    class="notification-icon" 
                    />
                    <!-- error -->
                    <heroicons-outline-x-circle
                    v-else-if="item.type === 'error'"
                    class="notification-icon" 
                    />
                    <!-- default -->
                    <heroicons-outline-information-circle 
                    v-else class="notification-icon" 
                    />
                </div>
    
                <div class="ml-2">
                    <!-- title -->
                    <div class="mt-0.5 text-gray-600 dark:text-white font-normal tracking-wide">
                        {{ item.title }}
                    </div>
    
                    <!-- text -->
                    <div v-if="item.text" class="mt-0.5 text-gray-400 dark:text-gray-300 text-sm">
                        {{ item.text }}
                    </div>
    
                    <!-- button -->
                    <button 
                    type="button" 
                    @click="close" 
                    class="absolute flex items-center justify-center w-6 h-6 text-gray-400 transition-colors duration-100 right-2 top-2 hover:text-gray-500 dark:hover:text-gray-300"
                    :class="item.text ? 'top-2' : 'top-4'"
                    >
                        <heroicons-outline-x class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </template>
  </notifications>
</template>

<script>
export default {
    
}
</script>