const getters={
    unReadAlarmNumber:state=>state.alarm.unReadAlarmNumber,
    readAlarmNumber:state=>state.alarm.readAlarmNumber,
    groups:state=>state.group.groups,
    roles:state=>state.role.roles,
    name:state=>state.role.name,
    systems:state=>state.system.systems,
    menu:state=>state.system.menu,
    selectedSystem:state=>state.system.selectedSystem,
    hasPermission:(state)=>(value)=>{
        const roles=state.role.roles
        return roles.some(role=>{
            return value.includes(role)
        })
    }
}

export default getters