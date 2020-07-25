<template>
    <div class="ctm-sidetree" :class="[sidetreeOpen?'ctm-sidetree_status_open':'ctm-sidetree_status_close']">
        <!-- <span class="ctm-sidetree__status-button" :class="{ 'ctm-sidetree__status-button_status_close':!sidetreeOpen}"  @click="()=>{this.sidetreeOpen_=!this.sidetreeOpen_;}"></span> -->
        <span class="ctm-sidetree__status-button" :class="{ 'ctm-sidetree__status-button_status_close':!sidetreeOpen}"  @click="reverseSideTreeOpen"></span>
        <div class="ctm-sidetree__title" v-show="sidetreeOpen">
            <i class="el-icon-menu"></i>分组列表
        </div>
        <div class="ctm-sidetree__search-keyword" v-show="sidetreeOpen">
            <input type="text" class="ctm-sidetree__input ctm-input" placeholder="关键字过滤" v-model="keyword">
        </div>
        <div class="ctm-sidetree__tree" v-show="sidetreeOpen">
            <!-- <el-tree :data="groups" :props="defaultGroups" :filter-node-method="filterNode" ref="tree" highlight-current :expand-on-click-node="false" @node-click="chooseNode" lazy :load="loadNode"> -->
            <el-tree ref="tree" :data="treeNodes" :props="defaultGroups" node-key="name" :filter-node-method="filterNode" highlight-current :expand-on-click-node="false" @node-click="chooseNode">
                <div class="custom-tree-node" slot-scope="{node, data}">
                    <div>
                        <i class="el-icon-s-tools" v-if="data.deviceId"></i>
                        <i class="el-icon-menu" v-else></i>
                        {{ data.name }}
                    </div>
                </div>
            </el-tree>
        </div>
    </div>
</template>
<script>
// import {deepClone} from '@/js/util/util.js'

export default {
    name:'base-group-sidetree',
    data(){
        return {
            keyword: '',
            defaultGroups: {
                children: 'group',
                label: 'name',
            },
            selectedDevices:[],
            returnDataGroupName:'devices'
        }
    },
    props:['sidetreeOpen','groups','showDevice','dataGroupName'],
    methods:{
        reverseSideTreeOpen(){
            this.$emit('update:sidetreeOpen',!this.sidetreeOpen)
        },
        chooseNode(data){
            this.selectedDevices=[]
            this.statisticDevices(data)
            // this.$emit('transferSelectedDevices',this.selectedDevices)
            this.$emit('update:selectedDevices',this.selectedDevices)
        },
        statisticDevices(data){
            if(data[this.returnDataGroupName]&&data[this.returnDataGroupName].length)
                this.selectedDevices.push(...data[this.returnDataGroupName])
            if(data.group&&data.group.length){
                data.group.forEach(element=>{
                    this.statisticDevices(element)
                })
            }   
        },
        filterNode(value, data) {
            if (!value) 
                return true
            return data.name.indexOf(value) !== -1
        },
        addDeviceNode(groups){
            for(let i=groups.length-1;i>=0;i--){
                if(groups[i].devices&&groups[i].devices.length!==0){
                    let node=this.$refs.tree.getNode(groups[i].name)

                    groups[i].devices.forEach(device=>{
                        this.$refs.tree.append(device,node)
                    })
                }
                if(groups[i].group&&groups[i].group.length!==0)
                    this.addDeviceNode(groups[i].group)
            }
        }
    },
    created(){
        if(this.dataGroupName)
            this.returnDataGroupName=this.dataGroupName
    },
    watch: {
        keyword(val) {
            this.$refs.tree.filter(val)
        },
    },
    computed:{
        treeNodes(){
            // if(this.showDevice){
            //     setTimeout(()=>{
            //         this.addDeviceNode(val)
            //     },700)
            //     return deepClone(this.groups)
            // }
            // else
            return this.groups
        }
    },
}
</script>
<style>
    @import '~@/css/page.css';
    @import './base-group-sidetree.css';
</style>