import { ref } from "vue";

export default function useButton(props) {
    const getTag = () => {
        if (props.is) {
            return props.is
        } else if (!props.is && props.to) {
            return 'RouterLink'
        }
        return 'button'
    }

    const tag = ref(getTag())
    // 按鈕類型
    const buttonType = ref(props.type || (tag.value === 'button' ? 'button' : null))

    return { tag, buttonType }
}