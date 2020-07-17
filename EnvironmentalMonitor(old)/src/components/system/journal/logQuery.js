import {service} from '@/js/request/request.js'
import {timeFormatTransform} from '@/js/util/util.js'

const getJournals=function(object){
    return service({
        method: 'post',
        url: '/software/log/selectSysLog',
        data:{
            username:null,
            operationType:null,
            operationName:null,
            startTime:object.startTime,
            endTime:object.endTime
        }
    })
    .then(
        data=>data.map(element=>logDecomposition(element))
    )
}

const logDecomposition=function({id,username,operationType,operationName,createDate}){
    return {
        id,
        username,
        operationType,
        operationName,
        time:createDate
    }
}

const getJournalsExcel=function(startTime,endTime){
    startTime=timeFormatTransform(startTime)
    endTime=timeFormatTransform(endTime)
    let url=`/software/log/sysLogExcel/null/null/null/${startTime}/${endTime}`
    window.location.href=url
}

export default{
    getJournals,
    getJournalsExcel
}