import systemQuery from '../../query/store/systemQuery.js'

const state={
    systems:undefined,
    menu:[],
    selectedSystem:undefined,
}

const mutations={
    UPDATE_MENU(state,data){
        state.menu=data
    },
    UPDATE_SYSTEMS(state,data){
        state.systems=data
    },
    UPDATE_SELECTEDSYSTEM(state,data){
        state.selectedSystem=data
    }
}

const actions={
    updateMenu({commit,state}){
        let filename=state.selectedSystem.filename
        return systemQuery.getMenu(filename)
        .then(menu=>
            commit('UPDATE_MENU',menu)
        )
    },
    updateSystems({commit}){
        return systemQuery.getSystems()
        .then(systems=>{
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