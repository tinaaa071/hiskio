<template>
   <RouterLink :to="to" class="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-colors hover:text-violet-600 indigo:hover:text-indigo-600 dark:hover:text-violet-400">
        <heroicons-outline-pencil-alt />
   </RouterLink>
</template>

<script>
export default {
    props: {
        to: String
    }
};
</script>