<template>
    <component 
    :is="tag"
    :type="buttonType"
    :to="to"
    class="btn bg-violet-500 text-white  hover:bg-violet-600  focus:outline-violet-500 disabled:bg-violet-400"
    :disabled="loading"
    >
        <LoadingIcon v-if="loading" class="w-4 h-4 mr-1" />
        <slot></slot>
    </component>
</template>

<script>
import useButton from "@/composables/useButton";

export default {
    props: {
        is: String,
        type: String,
        to: String,
        loading: {
        type: Boolean,
        default: false,
    },
    },
    setup(props) {
        return { ...useButton(props) }
    }
}
</script>