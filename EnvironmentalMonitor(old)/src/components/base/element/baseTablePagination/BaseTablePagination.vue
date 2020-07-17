<template>
    <div class="ctm-table-pagination">
        <div class="set-amounts">
            <el-pagination :page-sizes="[5, 10, 15, 20]" @size-change="handleSizeChange" :page-size.sync="paginationPageSize" :current-page.sync="paginationCurrentPage" @current-change="handleCurrentChange" layout=" sizes, total" :total="total" background>
            </el-pagination>
        </div>
        <div class="show-page">
            <el-pagination :page-sizes="[5, 10, 15, 20]" @size-change="handleSizeChange" :page-size.sync="paginationPageSize" :current-page.sync="paginationCurrentPage" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" background>
            </el-pagination>
        </div>
        <div class="change-page">
            <el-pagination :page-sizes="[5, 10, 15, 20]" @size-change="handleSizeChange" :page-size.sync="paginationPageSize" :current-page.sync="paginationCurrentPage" @current-change="handleCurrentChange" layout=" jumper" :total="total" background>
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            paginationPageSize:10,
            paginationCurrentPage:1
        }
    },
    props:['total','pageSize','currentPage'],
    methods:{
        handleSizeChange(data){
            this.$emit("update:pageSize",data)
        },
        handleCurrentChange(data){
            this.$emit("update:currentPage",data)
        }
    },
    watch:{
        total(){
            setTimeout(()=>{
                if(this.paginationCurrentPage!==this.currentPage)
                    this.handleCurrentChange(this.paginationCurrentPage)
                    // this.$emit("update:currentPage",this.paginationCurrentPage)
            },0)
        }
    }
}
</script>
<style>
    @import './base-table-pagination.css';
</style>