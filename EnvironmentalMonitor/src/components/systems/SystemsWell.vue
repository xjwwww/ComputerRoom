<template>
    <div class="systems-well" :style="system.wellBackground" :class="{'systems-well_selected':isSelected}">
        
        <img :src="imgSrc" width="60px" class="systems-well__icon">
        <div class="systems-well__name">
            {{system.name}}
        </div>
    </div>
</template>
<script>
    import query from '@/js/query/store/systemQuery.js'
    import {mapGetters} from 'vuex'

    export default {
        data(){
            return{
                imgSrc:undefined
            }
        },
        props:['system'],
        created(){
            //console.log(this.system)
            query.getImage(this.system.imgUrl)
            .then(imgSrc=>this.imgSrc=imgSrc)
        },
        computed:{
            ...mapGetters(["selectedSystem","systems"]),
            isSelected(){
                if(this.selectedSystem)
                    return this.system.key===this.selectedSystem.key
                return false
            }
        }
    }
</script>
<style>

</style>