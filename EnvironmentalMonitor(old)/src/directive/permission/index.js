import permission from './permission.js'

const install=function(Vue){
    Vue.directive('permission',permission)
}

permission.install=install
export default permission