import { ref } from "vue";
// mitt
import mitt from 'mitt'

const confirmEvents = mitt()

const showModal = ref(false)
const confirmTitle = ref('')

const handleSuccess = () => {
    confirmEvents.emit('success')
};
const handleCancel = () => {
    confirmEvents.emit('cancel')
}

export function useConfirmModal() {
    return { showModal, confirmTitle, handleSuccess, handleCancel }
}

export function useConfirm(title) {
    confirmTitle.value = title
    showModal.value = true
    
    // 非同步
    return new Promise(resolve => {
        confirmEvents.on('success', () => {
            resolve(true)
          })
        confirmEvents.on('cancel', () => {
            resolve(false)
        })
    })
}