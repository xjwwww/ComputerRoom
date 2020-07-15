<template>
    <div class="systems-container">
        <div class="systems-container__flip systems-container__flip_left" v-if="pageNumber>1" @click="flipPage(-1)">
            <img src="./img/left.png" width="40">
        </div>
        <transition-group name="slide-fade" tag="div" class="systems-row">
            <system-well :system="item" v-for="item in systemsToBeShown" :key="item.key" @click.native="setSelectedSystem(item)"></system-well>
        </transition-group>
        <div class="systems-container__flip systems-container__flip_right" v-if="pageNumber>1" @click="flipPage(1)">
            <img src="./img/right.png" width="40">            
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import SystemsWell from './SystemsWell.vue'
import {resetRouter} from '@/js/router'

export default {
    data(){
        return{
            PAGECOUNT:5,
            currentPage:1,
            pageNumber:undefined
        }
    },
    methods:{
        async setSelectedSystem(system){
            this.$store.commit('system/UPDATE_SELECTEDSYSTEM',system)
            resetRouter()
            await this.$store.dispatch('system/updateMenu')
            this.setSystemCookie(system)
            this.$router.push("/")
        },
        setSystemCookie(system){
            let cookieValue=JSON.stringify(system,["name","filename"])
            let days=30
            let expireTime=new Date()
            expireTime.setTime(expireTime.getTime() + days*24*60*60*1000)
            document.cookie=`selectedSystem=${cookieValue};expires=${expireTime.toGMTString()};`
            // this.$router.go(0)
            // window.location.assign("/")
        },
        flipPage(number){
            this.currentPage+=number
            if(this.currentPage<1)
                this.currentPage=1
            else if(this.currentPage>this.pageNumber)
                this.currentPage=this.pageNumber
        }

    },
    computed:{
        ...mapGetters(["systems"]),
        systemsToBeShown(){
            if(this.systems)
                return this.systems.slice((this.currentPage-1)*this.PAGECOUNT,this.currentPage*this.PAGECOUNT)
            return []
        }
    },
    created(){
        if(!this.systems)
            this.$store.dispatch('system/updateSystems')
            .then(()=>{
                this.pageNumber=Math.ceil(this.systems.length/this.PAGECOUNT)
            })
        else
            this.pageNumber=Math.ceil(this.systems.length/this.PAGECOUNT)
    },
    components:{
        'system-well':SystemsWell
    },
}
</script>
<style>
    @import '~@/css/page.css';
    @import './systems.css';
    .slide-fade-enter-active{
        transition: all .3s ease .3s;
    }

    .slide-fade-leave-active{
        position:absolute;
        transition: all .3s ease;
    }

    /* .slide-fade-move{
        transition: all .3s;
    } */

    .slide-fade-enter{
        transform: translateY(10px);
        opacity: 0;
    }

    .slide-fade-leave-to{
        transform: translateY(-10px);
        opacity: 0;
        /* display:none; */
    }
</style>