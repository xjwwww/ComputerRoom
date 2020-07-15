import systemQuery from '../../query/store/systemQuery.js'

const state={
    systems:undefined,
    menu:[],
    selectedSystem:undefined,
    iType: 2
}

const mutations={
    UPDATE_MENU(state,data){
        //console.log(data)
        state.menu=data
        
    },
    UPDATE_SYSTEMS(state,data){
        state.systems=data
    },
    UPDATE_SELECTEDSYSTEM(state,data){
        state.selectedSystem=data
    },
    UPDATE_ITYPE(state, data){
        state.iType = data
    }
}

const actions={
    updateMenu({commit}){
        let filename=state.selectedSystem.filename

        return systemQuery.getMenu(filename)
        .then(data=>{
                commit('UPDATE_MENU',data)
            }
        )
    },

    updateSystems({commit}){
        return systemQuery.getSystems()
        .then(systems=>{
            // console.log(systems)
            systems=systems.filter(system=>system.visible===1)
            commit('UPDATE_SYSTEMS',systems)
            if(systems.length===1)
                commit('UPDATE_SELECTEDSYSTEM',systems[0])
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}