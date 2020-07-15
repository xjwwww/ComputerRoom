import {service} from '../../request/request.js'

const getGroups=function(){
    return service({
        method:'get',
        url:'/software/group/findGroupAll'
    })
    .then(data=>
            groupCopy(data)
    )
    .catch(()=>
            Promise.reject()
    )
}

function groupDecomposition({gId,gName}){
	return {
		groupId:gId,
		name:gName,
	}
}

function groupCopy(data){
	var node=groupDecomposition(data);
	if(data.children&&data.children.length!==0){
		if(!node.group)
			node.group=[]
		data.children.forEach(element=>{
			node.group.push(groupCopy(element))
		})
	}
	return node
}

export default{
    getGroups
}