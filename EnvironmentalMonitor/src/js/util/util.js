const initGroupsArray=function (item,groupsArray) {
    groupsArray[item.groupId]=item
    if(item.group&&item.group.length)
        item.group.forEach(element => {
            initGroupsArray(element,groupsArray)
        })
    return
}

function initGroupsReflect(item,groupsReflect) {
  groupsReflect[item.groupId]=item
    if(item.group&&item.group.length)
        item.group.forEach(element => {
            initGroupsReflect(element,groupsReflect)
        })
    return
}

const addDeviceToGroup=function (devices,groupsArray){
    Object.values(devices).forEach(element=>{
        if(!groupsArray[element.groupId].devices)
            groupsArray[element.groupId].devices=[]
        groupsArray[element.groupId].devices.push(element)
        element.groupName=groupsArray[element.groupId].name
    })
}

const deepClone=function(obj, parent = null){
    let result = Array.isArray(obj)?[]:{}
    let _parent = parent
    while(_parent){
      if(_parent.originalParent === obj){
        return _parent.currentParent
      }
      _parent = _parent.parent
    }
    if(obj && typeof obj === "object"){
      for(let key in obj){
        // if(obj.hasOwnProperty(key)){
        if(Object.prototype.hasOwnProperty.call(obj,key)){
          if(obj[key] && typeof obj[key] === "object"){
            result[key] = deepClone(obj[key],{
              originalParent: obj,
              currentParent: result,
              parent: parent
            })
          }else{
            result[key] = obj[key]
          }
        }
      }
    }
    return result
}

const timeFormatTransform=function(t1){
  console.log(t1)
  let year=t1.getFullYear()
  let month=t1.getMonth()+1
  let date=t1.getDate()
  let hour=t1.getHours()
  let minute=t1.getMinutes()
  let second=t1.getSeconds()
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

const pickerOptions={
  shortcuts: [{
      text: '最近4小时',
      onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 4)
      picker.$emit('pick', [start, end])
      }
  }, {
      text: '当天',
      onClick(picker) {
      const end = new Date()
      const start = new Date(end.getFullYear(),end.getMonth(),end.getDate())
      picker.$emit('pick', [start, end])
      }
  }, {
      text: '本周(周日起)',
      onClick(picker) {
      const end = new Date()
      const start = new Date(end.getFullYear(),end.getMonth(),end.getDate()-end.getDay())
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
      }
  }]
}

// 轮询时间
const queryIntervalTime=3000 

const floatPass=(rule,value,callback)=>{
  if(value==='')
      callback(new Error('请输入数值'))
  else if(parseFloat(value)!=value)
      callback(new Error('请按照格式输入数值'))
  else
      callback()
}

const build=function(){
  Promise.all([this.getDevices(),this.$store.dispatch('group/updateGroups',true)])
  .then(()=>{
      this.groups=deepClone(this.$store.getters.groups)
      initGroupsReflect(this.groups[0],this.groupsReflect) //不能放在store的getters中，否则与grooups中的数据不是同一个地址
      addDeviceToGroup(this.devices,this.groupsReflect)
      this.$refs.deviceExhibition.selectedDevices=Object.values(this.devices)
      if(this.$refs.management)
          this.$refs.management.selectedDevices=Object.values(this.devices)
  }).catch(error => console.log(error))
}

const encodeName=function(name){
  let obj={
    name,
    time:new Date().toUTCString()
  }
  obj=JSON.stringify(obj) // 把 obj 对象编码为字符串
  for(let i=0;i<5;i++){
    obj=window.btoa(obj) // 把 obj 字符串编码为一个 Base64 字符串
  }
  return obj
}

const decodeName=function(name){
  for(let i=0;i<5;i++){
    name=window.atob(name) // 解码使用 Base64 编码的字符串
  }
  name=JSON.parse(name).name // 解码为 json 格式的对象
  return name
}

const dataTransform=function(format,variable,reverse){
  // console.log(format)
  // console.log(variable)
  let result={},inIndex=1,outIndex=0
  if(reverse){
    inIndex=0
    outIndex=1
  }
  for(let i=format.length-1;i>=0;i--)
    result[format[i][outIndex]]=variable[format[i][inIndex]]
  return result
}

export {
    initGroupsArray,
    initGroupsReflect,
    addDeviceToGroup,
    deepClone,
    timeFormatTransform,
    pickerOptions,
    queryIntervalTime,
    floatPass,
    build,
    dataTransform,
    encodeName,
    decodeName
}