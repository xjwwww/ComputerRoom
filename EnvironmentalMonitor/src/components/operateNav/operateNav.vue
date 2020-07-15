<template>
    <div>
        <!-- 不要随意清除 window.localStorage 缓存的数据 -->
    
        <div>

            <h3>主菜单</h3>
            <el-checkbox v-for="item in allMenu" :checked="item.visible == 1 ? true : false" :key="item.key" 
            @change="navShowHidden(item.key, item.visible)" >{{item.name}}</el-checkbox>       

        </div>

        <div v-for="item in allMenu" :key="item.key">
        
            <h3>{{item.name}}</h3>
            <el-checkbox v-for="device in item.devices" :checked="device.visible == 1 ? true : false" :key="device.key" 
            @change ="navShowHidden(device.key, device.visible)">{{device.name}}</el-checkbox>
        
        </div>
    

        <div v-for="item in selectSysBtn" :key="item.key" >
            <h3>{{item.name}}</h3>
            <el-checkbox :checked="item.visible==1?true:false" @change="navShowHidden(item.key, item.visible)">{{item.name}}</el-checkbox>
        </div>
        
    </div>

</template>

<script>

    //import allMenu from '@/js/projectConfig/all.menu.json'
    //import operateNav from './operateNav.js'

    //import {mapGetters} from 'vuex'

    import systemQuery from '@/js/query/store/systemQuery.js'


    export default {
        data(){
            return {      
                boo: true,                                                                                 
                allMenu: undefined,
                selectSysBtn: undefined,
                isShow: undefined,
                status: false
            }
        },        
        
        methods: {   
            // 菜单显示隐藏
            async navShowHidden(itemKey, itemVisible){

                //console.log(itemKey, itemVisible)

                let obj = {
                    "key": itemKey,
                    "visible": undefined
                }

                if(itemVisible == 1){
                    obj.visible = 0;
                }else if(itemVisible == 0){
                    obj.visible = 1
                }              

                this.status = await systemQuery.getChangeMenu(obj)                
            },  

            


            // 请求 all.menu.json 的数据
            async getMenu(){

                await systemQuery.getMenu('all.menu.json')
                    .then(data => {
                        this.allMenu = data
                    })   
                //console.log(this.allMenu)
            },

            //选择系统按钮显示隐藏
            async getSelectSysBtn(){
                await systemQuery.getSelectSysBtn()
                        .then(data => {
                            this.selectSysBtn = data
                        })
                //console.log(this.selectSysBtn)
            }

        },
        computed: {

        },
        created(){
            
            this.getMenu()
            this.getSelectSysBtn()

        },

        mounted(){
            
        },
        
        components: {
            
        }
    }

</script>

<style>
    
    .box{
        display: inline-block;
    }

</style>