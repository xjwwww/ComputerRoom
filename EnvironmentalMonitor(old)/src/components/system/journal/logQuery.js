import { service } from '@/js/request/request.js'
import { timeFormatTransform } from '@/js/util/util.js'


const getJournals = function(object, pageSize, pageNum) {
    return service({
            method: 'post',
            url: '/software/log/selectSysLog',
            data: {
                username: null,
                operationType: null,
                operationName: null,
                pageNum,
                pageSize,
                startTime: object.startTime,
                endTime: object.endTime
            }
        })
        .then(
            data => {
                // console.log(data);
                return data
                    // return data.sysLog.list.map(element => logDecomposition(element))
            }
        )
}

// const logDecomposition = function({ id, username, operationType, operationName, createDate }) {
//     return {
//         id,
//         username,
//         operationType,
//         operationName,
//         time: createDate
//     }
// }

const getJournalsExcel = function(startTime, endTime) {
    startTime = timeFormatTransform(startTime)
    endTime = timeFormatTransform(endTime)
        // let url = `/software/log/sysLogExcel/null/null/null/${startTime}/${endTime}?token=95e0b12448bc51906b6f23759ca4456a`
        // window.location.href = url
    return service({
            method: 'post',
            responseType: 'blob',
            url: '/software/log/sysLogExcel',
            data: {
                username: null,
                operationType: null,
                operationName: null,
                startTime: startTime,
                endTime: endTime
            }
        })
        .then(
            data => {
                const content = data;
                const blob = new Blob([content]);
                const time = new Date().getTime() / 1000;
                const fileName = time + ".xlsx";
                if ("download" in document.createElement("a")) {
                    // 非IE下载
                    const elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href); // 释放URL 对象
                    document.body.removeChild(elink);
                } else {
                    // IE10+下载
                    navigator.msSaveBlob(blob, fileName);
                }
                // eslint-disable-next-line handle-callback-err
            }
        )
}

export default {
    getJournals,
    getJournalsExcel,
}