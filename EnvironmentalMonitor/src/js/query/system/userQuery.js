import {service} from '../../request/request.js'

const getAccounts=function(){
    return service({
        method: 'get',
        url: '/software/config/findUserAll',
    })
    .then(
        data=>data.map(element=>accountDecomposition(element))
    )
}

const  getAccountsByName=async function(name){
    return service({
        method:'get',
        url:`/software/config/getUserMessage/${name}`
    })
    .then(data=>accountDecomposition(data))
}

const updateAccount=function(account){
    return service({
        method:'put',
        url:'/software/config/updateUserById',
        data:accountInDecomposition(account)
    })
}

const addAccount=function(account){
    return service({
        method:'post',
        url:'/software/config/insertUser',
        data:accountInDecomposition(account)
    })
}

const deleteAccount=function(id){
    return service({
        method:'delete',
        url:`/software/config/deleteUserById/${id}`
    })
}

const accountDecomposition=function({id,username,telephone,email,gId}){
    return {
        id,
        username,
        telephone,
        email,
        groupId:gId
    }
}

const accountInDecomposition=function({id,username,password,telephone,email,groupId}){
    return{
        id,
        username,
        password:password?password:null,
        telephone,
        email,
        gId:groupId
    }
}

const getConnectionsWithRole=function(){
    return service({
        method: 'get',
        url: '/software/config/selectAllUserRole',
    })
    .then(
        data=>data.map(({id,rid,uid})=>{
            return{
                id,
                roleId:rid,
                accountId:uid
            }
        })
    )
}

const updateAccountWithRole=function(accountId,roleIds){
    roleIds=roleIds.join()
    return service({
        method: 'get',
        url: `/software/config/updateUserRoles/${accountId}/${roleIds}`,
        // data:{
        //     uid:accountId,
        //     roleIds
        // }
    })
}

// const deleteRoleByUser=function(accountId){
//     return service({
//         method:'delete',
//         url:`/software/config/deleteRoleByUser/${accountId}`
//     })
// }

export default{
    getAccounts,
    getAccountsByName,
    getConnectionsWithRole,
    updateAccount,
    addAccount,
    deleteAccount,
    updateAccountWithRole
}