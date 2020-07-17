import alarmQuery from '../../query/alarm/totalAlarmQuery.js'


const state={
    unReadAlarmNumber:'待刷新',
    readAlarmNumber:'待刷新'
}

const mutations={
    UPDATA_ALARM(state,[data1,data2]){
        state.unReadAlarmNumber=data1
        state.readAlarmNumber=data2
    }
}

const actions={
    updateAlarm(context,enforce=false){
        if(enforce||(context.state.unReadAlarmNumber==='待刷新'&&context.state.readAlarmNumber==='待刷新')){
            return Promise.all([alarmQuery.queryAlarmNumber(0),alarmQuery.queryAlarmNumber(1)])
            .then(result=> {
                    context.commit('UPDATA_ALARM',result)
                }
            )
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
