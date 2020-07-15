import roleQuery from '@/js/query/store/roleQuery.js'
import {decodeName} from '@/js/util/util.js'

const state={
    roles:undefined,
    name:undefined
}

const mutations={
    UPDATE_ROLE(state,roles){
        state.roles=roles
    },
    UPDATE_NAME(state,name){
        state.name=name
    }
}

const actions={
    updateRole(context,name){
        // console.log(name)
        if(name != undefined){
            // console.log(name)
            
            roleQuery.getRolesByName(name)
            .then(roles=>{
                
                context.commit('UPDATE_ROLE',roles)
                return roles
            })
        }
    },
    updateName(context){
        let name=sessionStorage.getItem("token")
        context.commit('UPDATE_NAME',decodeName(name))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}