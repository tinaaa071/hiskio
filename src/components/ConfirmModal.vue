<template>
    <!-- 插入現有之 Modal 元件 -->
    <Modal v-model="isOpen" @success="handleSuccess" @cancel="handleCancel">
        <template #icon>
            <heroicons-outline-exclamation class="mt-8 mx-auto w-12 h-12 text-red-600" />
        </template>
        <template v-slot:title>
            <DialogTitle
                as="h3"
                class="text-2xl text-center font-medium text-red-600 tracking-wider mt-2 mb-4"
            >
            {{ title }}
            </DialogTitle>
        </template>
        <template v-slot:footer>
            <div class="grid grid-cols-2 gap-4">
                <!-- 取消 -->
                <SecondaryButton
                    class="w-full py-1.5"
                    @click="handleCancel"
                >
                    取消
                </SecondaryButton>
                <!-- 確認 -->
                <DangerButton
                    class="w-full py-1.5"
                    @click="handleSuccess"
                >
                    確定
                </DangerButton>
            </div>
        </template>
    </Modal>
</template>
  
<script>
import { useVModel } from "@vueuse/core";

export default {
    // 送出
    emits: ['update:modelValue', 'success', 'cancel'],
    // 傳入
    props: {
        // 設定開關
        modelValue: Boolean,
        // 標題
        title: { type: String, default: '確定要刪除嗎？' }
    },
    setup(props, { emit }) {
        const isOpen = useVModel(props);
        const openModal = () => {
            // emit('update:modelValue', true)
            isOpen.value = true;
        };
        const closeModal = () => {
            // emit('update:modelValue', false)
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
    }
}
</script>