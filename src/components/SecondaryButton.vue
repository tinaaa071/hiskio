<template>
    <component 
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-violet-500 indigo:focus:outline-indigo-500 disabled:bg-white disabled:text-gray-400">
        <slot></slot>
    </component>
</template>

<script>
import useButton from "@/composables/useButton";

export default {
    props: {
        is: String,
        type: String,
        to: String
    },
    setup(props) {
        return { ...useButton(props) }
    }
}
</script>