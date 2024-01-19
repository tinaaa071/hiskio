<template>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" @close="handleCancel" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-700/20 dark:bg-gray-900/50" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex items-center justify-center min-h-full p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
            <div
              class="inline-block w-full max-w-sm my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl dark:bg-gray-700 rounded-2xl"
            >
                <div class="px-6 py-4">
                    <slot name="icon"></slot>
                    <slot name="title">
                        <DialogTitle
                          as="h3"
                          class="text-2xl font-medium text-center text-gray-900"
                        >
                        {{ title }}
                        </DialogTitle>
                    </slot>
                    <slot name="content"></slot>
                </div>
  
                <div class="p-6">
                    <slot name="footer">
                        <PrimaryButton
                            class="w-full py-1.5"
                            @click="handleSuccess"
                        >
                            確定
                        </PrimaryButton>
                    </slot>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  
<script>
// import { ref } from 'vue'
// 載入 VueUse
import { useVModel } from "@vueuse/core";
import PrimaryButton from "./PrimaryButton.vue";

export default {
    // 送出
    emits: ['update:model-value', 'success', 'cancel'],
    // 傳入
    props: {
        // 設定開關
        modelValue: Boolean,
        // 標題
        title: String
    },
    setup(props, { emit }) {
        const isOpen = useVModel(props);
        const openModal = () => {
            // emit('update:model-value', true)
            isOpen.value = true;
        };
        const closeModal = () => {
            // emit('update:model-value', false)
            isOpen.value = false;
        };
        const handleSuccess = () => {
            emit('success')
            closeModal()
        };
        const handleCancel = () => {
            emit('cancel')
            closeModal()
        }
        return { isOpen, openModal, closeModal, handleSuccess, handleCancel };
    },
    components: { PrimaryButton }
}
</script>