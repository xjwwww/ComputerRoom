import {service} from '../../request/request.js'

const getRoles=function(){
    return service({
        method: 'get',
        url: '/software/config/selectAllRole',
    })
    .then(
        data=>data.map(element=>roleDecomposition(element))
    )
}

function roleDecomposition({id,name,desc_}){
    return{
        id,
        name,
        description:desc_
        // name:desc_
    }
}

function roleInDecomposition({id,name,description}){
    return{
        id,
        name,
        desc_:description
    }
}

const addRole=function(role){
    return service({
        method: 'post',
        url: '/software/config/addRole',
        data:roleInDecomposition(role)
    })
    .then(({role})=>roleDecomposition(role))
}

const updateRole=function(role){
    let permissionIds=role.permissions.map(el=>el.id)
    return service({
        method: 'post',
        url: '/software/config/updateRole',
        data:{
            ...roleInDecomposition(role),permissionIds
        }
    })
}

const deleteRole=function(id){
    return service({
        method: 'delete',
        url: `/software/config/deleteRole/${id}`,
    })
}

const getConnectionsWithPermission=function(){
    return service({
        method: 'get',
        url: '/software/config/selectAllRolePermission',
    })
    .then(data=>data.map(({id,rid,pid})=>{
        return{
            id,
            roleId:rid,
            permissionId:pid
        }
    }))
}

export default{
    getRoles,
    addRole,
    updateRole,
    deleteRole,
    getConnectionsWithPermission
}