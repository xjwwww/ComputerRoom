import Vue from 'vue'

let echarts = require('echarts/lib/echarts')
// let echarts=()=>import('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/toolbox')

let styleObj=require('./walden.project.js')
echarts.registerTheme('walden', styleObj)
Vue.prototype.$echarts = echarts