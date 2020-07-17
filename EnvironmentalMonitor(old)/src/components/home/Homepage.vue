<template>
    <div class="ctm-container ctm-container_flex_row">
        <div class="homepage">
            <div class="homepage-first-row">
                <div class="homepage-device homepage-well">
                    <h4 class="well-title">设备名称</h4>
                    <div class="row">
                        <div class="col-sm-6">
                            <a href="#">
                                <h4>{{deviceNumber}}</h4>
                                通讯地址总数
                            </a>
                        </div>
                        <div class="col-sm-6">
                            <router-link to="/alarm" style="color: red;" tag="a">
                                <h4>{{dailyalarmNumber}}</h4>
                                当天报警数
                            </router-link>
                        </div>
                        <div class="col-sm-6">
                            <a href="#" style="color:red;">
                                <h4>{{monthlyalarmNumber}}</h4>
                                当月报警数量
                            </a>
                        </div>
                        <div class="col-sm-6">
                            <a href="#">
                                <h4>{{readAlarmNumber}}</h4>
                                已读
                            </a>
                        </div>
                        <div class="col-sm-6">
                            <a href="#" style="color:orange;">
                                <h4>{{weeklyalarmNumber}}</h4>
                                当周报警数量
                            </a>
                        </div>
                        <div class="col-sm-6">
                            <a href="#">
                                <h4>{{unReadAlarmNumber}}</h4>
                                未读
                            </a>
                        </div>
                    </div>
                </div>
                <div class="homepage-map homepage-well">
                    <h4 class="well-title">3D鸟瞰图</h4>
                    <div id="myCarousel" class="carousel slide">
                        <ol class="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <!-- <li data-target="#myCarousel" data-slide-to="1"></li> -->
                        </ol>
                        <div class="carousel-inner">
                            <div class="item active">
                                <img src="./img/view/module1.jpg" class="map-carousel-img" alt="Second slide">
                                <!-- <div class="carousel-caption">房间1</div> -->
                            </div>
                            
                        </div>
                        <a class="carousel-control" href="#myCarousel" role="button" data-slide="prev" style="color:blue;">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control" href="#myCarousel" role="button" data-slide="next" style="right:0;left:auto;color:blue;">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>
                    
                </div>
                <div class="homepage-temp-energy homepage-well">
                    <h4 class="well-title">温度能耗</h4>
                    <div class="row">
                        <div >
                            <h5>温度：</h5>
                            <div class="temp-energy-well temperature-well">
                                <div class="temp-energy-well__data">

                                    <h3>{{temperature}}°C</h3>

                                    平均温度
                                </div>
                                <div class="temp-energy-well__img">
                                    <img src="./img/icon/temperature.png" class="img-responsive">
                                </div>
                            </div>
                        </div>

                        <!--<div >
                            <h5>功率：</h5>
                            <div class="temp-energy-well energy-well">
                                <div class="temp-energy-well__data">
                                    <h3>3.2kW·h</h3>
                                    功率总和
                                </div>
                                <div class="temp-energy-well__img">
                                    <img src="./img/icon/energy.png" class="img-responsive">
                                </div>
                            </div>
                        </div>
                        -->

                    </div>
                </div>
            </div>

            <div class="homepage-second-row">
                <div class="homepage-alarm homepage-well">
                    <h4>
                        <router-link class="check-more" tag="a" to="/alarm">查看更多</router-link>
                    </h4>
                    <h4 class="well-title">警告信息</h4>
                    <el-table :data="alarms" border style="width: 100%" size="mini" height="calc(100% - 39px)" :row-class-name="tableRowClassName">
                        <!-- <el-table-column prop="groupName" label="组名" min-width="80" align="center" head-align="center"></el-table-column> -->
                        <el-table-column prop="deviceName" label="设备名称" min-width="70" align="center" head-align="center"></el-table-column>
                        <!-- <el-table-column prop="description" label="告警描述" min-width="70" align="center" head-align="center"></el-table-column> -->
                        <el-table-column prop="time" label="警告时间"  min-width="110" align="center" head-align="center"></el-table-column>
                        <el-table-column label="信息状态"  min-width="110" align="center" head-align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" type="warning" v-if="scope.row.isRead===0" @click="updateIsRead(scope.row)">转为已读</el-button>
                                <el-tag size="small" type="info" v-else>已读</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import query from '@/js/query/alarm/totalAlarmQuery.js'
import HomepageQuery from './Homepage.js'
import {queryIntervalTime} from '@/js/util/util.js'
import {mapGetters} from 'vuex'

export default {
    data(){
        return{
            alarms:[],

            deviceNumber: '待刷新',
            dailyalarmNumber:'待刷新',
            weeklyalarmNumber:'待刷新',
            monthlyalarmNumber:'待刷新',

            temperature: '待刷新',
            statusInterval: undefined
        }
    },
    methods:{
        tableRowClassName({row}) {
            if (row.isRead===0)
                return 'new-alarm'
            return ''
        },
        getTotalAlarmLimit(){
            return query.getTotalAlarmLimit()
            .then(data=>this.alarms=data)
            
        },
        updateIsRead(alarm){
            return query.updateIsRead(alarm.id)
            .then(()=>{
                    alarm.isRead=1
                    this.$store.dispatch('alarm/updateAlarm')
                }
            )
        },
        getAlarmNumberToday(){
            return query.getAlarmNumberToday()
            .then(data=>{
                this.dailyalarmNumber=data
            })
        },
        getAlarmNumberWeek(){
            return query.getAlarmNumberWeek()
            .then(data=>{
                this.weeklyalarmNumber=data
            })
        },
        getAlarmNumberMonth(){
            return query.getAlarmNumberMonth()
            .then(data=>{
                this.monthlyalarmNumber=data
            })
        },
        //通讯地址总数
        getEquipmentTotal(){
            return query.getEquipmentTotal()
            .then(data => {
                // console.log(data)
                this.deviceNumber = data
            })
        },

        // 温度能耗：温度
        getTemperature(){
            return HomepageQuery.getDevices()
            .then(data => {
                //console.log(data)
                this.temperature = data
            })
        }

        //功率总和
        //getPowerSum(){}
        
    },
    created(){
        this.getTotalAlarmLimit()
        this.$store.dispatch('alarm/updateAlarm')
        this.getAlarmNumberToday()
        this.getAlarmNumberWeek()
        this.getAlarmNumberMonth()
        this.getEquipmentTotal()
        this.getTemperature()

        //this.getPowerSum() // 功率总和
    },
    mounted(){
        this.statusInterval = setInterval(() => {
            this.getTotalAlarmLimit()
            this.$store.dispatch('alarm/updateAlarm')
            this.getAlarmNumberToday()
            this.getAlarmNumberWeek()
            this.getAlarmNumberMonth()
            this.getEquipmentTotal()
            this.getTemperature()

            //this.getPowerSum() // 功率总和
        },queryIntervalTime)
    },
    beforeDestroy(){
        clearInterval(this.statusInterval)
    },
    computed:{
        ...mapGetters(["readAlarmNumber","unReadAlarmNumber"])
    }
}
</script>
<style>
    @import './homepage.css';
    @import '~@/css/page.css';
    /* @import '../css/table-group.css'; */

     /* .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    } */
</style>

