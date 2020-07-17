import {service} from '@/js/request/request.js'

const getDailyAlarmSettings=function(){
    return service({
        method: 'get',
        url: '/software/deviceIp/findDeviceAlarmAll',
    })
    .then(
        data=>data.map(element=>alarmSettingDecomposition(element))
    )
}

const alarmSettingDecomposition=function({daId,week,timeQuantumOne,timeQuantumTwo,timeQuantumThree,emailStatus,smsStatus,soundLightStatus,phoneStatus,intervalTime}){
    return {
        id:daId,
        week,
        time1:timeQuantumOne,
        time2:timeQuantumTwo,
        time3:timeQuantumThree,
        email:emailStatus,
        sms:smsStatus,
        soundLight:soundLightStatus,
        phone:phoneStatus,
        timeInterval:intervalTime
    }
}

const updateDailyAlarmSetting=function(object){
    return service({
        method: 'put',
        url: '/software/deviceIp/updateDeviceAlarmById',
        data:alarmSettingIndecomposition(object)
    })
}

const alarmSettingIndecomposition=function({id,week,time1,time2,time3,email,sms,soundLight,phone,timeInterval}){
    return {
        daId:id,
        week,
        timeQuantumOne:time1,
        timeQuantumTwo:time2,
        timeQuantumThree:time3,
        emailStatus:email,
        smsStatus:sms,
        soundLightStatus:soundLight,
        phoneStatus:phone,
        intervalTime:timeInterval
    }
}

const getEmailSetting=function(){
    return service({
        method: 'get',
        url: '/software/emailController/getEmailFromMessage',
    })
    .then(
        data=>emailSettingDecomposition(data)
    )
}

function emailSettingDecomposition({emailId,emailFrom,emailAuthorization,emailType,emailSubject}){
    return{
        id:emailId,
        from:emailFrom.slice(0,emailFrom.indexOf('@')),
        password:emailAuthorization,
        type:emailType,
        subject:emailSubject
    }
}

const updateEmailSetting=function(setting){
    return service({
        method: 'put',
        url: '/software/emailController/updateEmail',
        data:emailSettingInDecomposition(setting)
    })
}

function emailSettingInDecomposition({id,from,password,type,subject}){
    return{
        emailId:id,
        emailFrom:from,
        emailAuthorization:password,
        emailType:type,
        emailSubject:subject
    }
}


export default{
    getDailyAlarmSettings,
    updateDailyAlarmSetting,
    getEmailSetting,
    updateEmailSetting
}