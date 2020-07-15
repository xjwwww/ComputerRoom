import store from '@/js/store/store.js'

const hasPermission=(value)=>{
    const roles=store.state.roles
    return roles.some(role=>{
        return value.includes(role)
    })
}

export default {
    hasPermission
}