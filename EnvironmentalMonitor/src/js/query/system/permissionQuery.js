import {service} from '../../request/request.js'

const getPermissions=function(){
    return service({
        method: 'get',
        url: '/software/config/listPermission',
    })
    .then(
        data=>data.map(element=>permissionDecomposition(element))
    )
}

const addPermission=function(data){
    return service({
        method: 'post',
        url: '/software/config/addPermission',
        data:permissionInDecomposition(data)
    })
}

const updatePermission=function(data){
    return service({
        method: 'put',
        url: '/software/config/updatePermission',
        data:permissionInDecomposition(data)
    })
}

const deletePermission=function(id){
    return service({
        method: 'get',
        url: `/software/config/deletePermission/${id}`,
    })
}

const permissionDecomposition=function({id,name,desc_,url}){
    return {
        id,
        key:name,
        name:desc_,
        url
    }
}

const permissionInDecomposition=function({id,name,url}){
    return {
        id,
        // name:key,
        name:url,
        desc_:name,
        url
    }
}

export default{
    getPermissions,
    addPermission,
    updatePermission,
    deletePermission
}