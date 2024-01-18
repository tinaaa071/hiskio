import { notify as baseNotify } from "@kyvg/vue3-notification";

// title, text
export function notify(title, text, options) {
    return baseNotify({ title, text, ...options })
}

// type - success
export function successNotify(title, text, options) {
    return notify(title, text, { ...options, type: 'success' })
}
// type - warn
export function warnNotify(title, text, options) {
    return notify(title, text, { ...options, type: 'warn' })
}
// type - error
export function errorNotify(title, text, options) {
    return notify(title, text, { ...options, type: 'error' })
}