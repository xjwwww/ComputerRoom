<template>
    <div class="generator-well">
        <img src="./img/icon.png" class="generator-well__icon"
        :class="{'generator-well__icon_normal':device.status===0,
        'generator-well__icon_alarm':device.status===1,
        'generator-well__icon_unconnected':device.status===2}">
        <div class="generator-well__header">
            <div class="generator-well__name">{{device.name}}</div>
            <div class="generator-well__subname">{{device.groupName}}</div>
        </div>
        <div class="generator-well__content">
            <div></div>
            <div class="generator-well__key">电流</div>
            <div class="generator-well__key">电压</div>
            <div class="generator-well__key">A相</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':AcurrentAlarm}" data-unit="A">{{device.Acurrent}}</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':AvoltageAlarm}" data-unit="V">{{device.Avoltage}}</div>
            <div class="generator-well__key">B相</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':BcurrentAlarm}" data-unit="A">{{device.Bcurrent}}</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':BvoltageAlarm}" data-unit="V">{{device.Bvoltage}}</div>
            <div class="generator-well__key">C相</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':CcurrentAlarm}" data-unit="A">{{device.Ccurrent}}</div>
            <div class="generator-well__value" :class="{'generator-well__value_alarm':CvoltageAlarm}" data-unit="V">{{device.Cvoltage}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            AcurrentAlarm:false,
            AvoltageAlarm:false,
            BcurrentAlarm:false,
            BvoltageAlarm:false,
            CcurrentAlarm:false,
            CvoltageAlarm:false,
        }
    },
    props:['device'],
    watch:{
        'device.status':{
            handler(val){
                if(val===1){
                    this.AcurrentAlarm=(this.device.Acurrent>this.device.AMaxcurrent||this.device.Acurrent<this.device.AMincurrent)
                    this.AvoltageAlarm=(this.device.Avoltage>this.device.AMaxvoltage||this.device.Avoltage<this.device.AMinvoltage)
                    this.BcurrentAlarm=(this.device.Bcurrent>this.device.BMaxcurrent||this.device.Bcurrent<this.device.BMincurrent)
                    this.BvoltageAlarm=(this.device.Bvoltage>this.device.BMaxvoltage||this.device.Bvoltage<this.device.BMinvoltage)
                    this.CcurrentAlarm=(this.device.Ccurrent>this.device.CMaxcurrent||this.device.Ccurrent<this.device.CMincurrent)
                    this.CvoltageAlarm=(this.device.Cvoltage>this.device.CMaxvoltage||this.device.Cvoltage<this.device.CMinvoltage)
                }
            },
            immediate:true
        }
    }
}
</script>
<style>
    @import './generator-well.css';
</style>