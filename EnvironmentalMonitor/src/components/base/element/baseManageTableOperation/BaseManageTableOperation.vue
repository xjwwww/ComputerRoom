<template>
    <div class="manage-table-operation">
        <div class="manage-table-operation__part table-operation__part_position_left">
            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_refresh" @click="refresh">刷新</button>
            <button type="button" class="manage-table-operation__button manage-table-operation__button_function_export" @click="openDialog" v-if="hasPermission">新增</button>
        </div>
        <div class="manage-table-operation__part table-operation__part_position_right">
            <div class="search-keyword"> 
                <input type="text" placeholder="关键字过滤" class="ctm-input manage-table-operation__input" v-model="keyword" @input="handleKeyword">
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            keyword:''
        }
    },
    methods:{
        refresh(){
            this.$emit('refresh')
        },
        openDialog(){
            this.$emit('openDialog','add')
        },
        handleKeyword(){
            this.$emit("update:keyword",this.keyword)
        }
    }
}
</script>
<style>
    @import './manage-table-operation.css';
</style>