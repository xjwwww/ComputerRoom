import store from '@/js/store'

export default{
    inserted(el,binding){
        const {value}=binding
        const roles=store.getters.roles
        
        if(value&&value instanceof Array&&value.length>0){
            const permission=value
            const hasPermission=roles.some(role=>{
                return permission.includes(role)
            })
            if(!hasPermission){
                // console.log(el.parentNode)
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else
            throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
}