import {Notification} from 'element-ui'
import 'element-ui/lib/theme-chalk/notification.css';
import Vue from 'vue'

function notifyError(){
    let notifyPromise=Promise.resolve()
    return (msg,type='error')=>{
        //console.log(msg)
        notifyPromise=notifyPromise.then(Vue.$nextTick).then(()=>{
            Notification[type]({title:msg,offset: 100})
        })
    }
}

const notifyMaker=notifyError()

export {
    notifyMaker
}