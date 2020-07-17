import groupQuery from '../../query/store/groupQuery.js'

const state={
    groups:[]
}

const mutations={
    UPDATE_GROUPS(state,data){
        if(!data)
            state.groups=[]
        else
            state.groups[0]=data
    }
}

const actions={
    updateGroups(context,enforce=false){
        if(enforce||context.state.groups.length===0){
            return groupQuery.getGroups()
            .then(
                groups=>{
                    context.commit('UPDATE_GROUPS',groups)
                    return groups
                }
            )
            // .catch(
            //     ()=>context.commit('UPDATE_GROUPS',null)
            // )
        }
        Promise.resolve(context.state.groups)
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}