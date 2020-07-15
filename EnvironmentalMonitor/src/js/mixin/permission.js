import store from '@/js/store/index.js'

const permission={
    data(){
        return{
            appropriate:['admin','superAdmin']
        }
    },
    computed:{
        hasPermission(){
            let roles=store.getters.roles
            //console.log(roles)
            if(!roles)
                return false
            for(let i=0;i<roles.length;i++)
                if(this.appropriate.includes(roles[i]))
                    return true
            return false
        }
    }
}

export default permission