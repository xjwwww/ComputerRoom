const mixinScript={
    data(){
        return{
            sidetreeOpen:true,
            dialogMode:'',
            keyword:'',
            selectedDevices:[],
            pageSize:10,
            currentPage:1,
            dialogVisible:false,
            deviceForm:{},
            groupsProps:{
                label:'name',
                children:'group',
                value:'groupId',
                emitPath:false
            },
            ipMap:{},
        }
    },
    props:['groups','query','devices'],
    methods:{
        refresh(){
            Promise.all([this.getIps(),this.$emit("transferBuild")])
            .then(()=>this.$message.success('刷新成功'))
            .catch(()=>this.$message.error('刷新失败'))
        },
        openDialog(mode,data){
            this.dialogMode=mode
            if(mode==='update')
                this.deviceForm={...data}
            else
                this.deviceForm={}
            this.dialogVisible = true
            this.$nextTick(()=>this.$refs.deviceForm.clearValidate())
        },
        handleDialog(){
            let ruleFlag=false
            this.$refs.deviceForm.validate((valid) => {
                if (valid) {
                    ruleFlag=true
                } else {
                    ruleFlag=false
                    return false
                }
            })
            if(ruleFlag){
                this.dialogVisible = false
                if(this.dialogMode==='add')
                    this.query.addDevice(this.deviceForm).then(()=>this.$emit("transferBuild"))
                else
                    this.query.updateDevice(this.deviceForm).then(()=>this.$emit("transferBuild"))
            }
        },
        deleteOperation(id){
            this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(()=>this.query.deleteDevice(id))
            .then(()=>this.$emit("transferBuild"))
        },
        getIps(){
            return this.query.getIps()
            .then(
                ips=>{
                    for(let i in ips)
                        this.ipMap[ips[i].id]=ips[i]
                }
            )
        }
    },
    computed:{
        deviceSettingsToBeFiltered(){
            return this.selectedDevices.filter(device=>
                {
                    for(let i in device){
                        if(device[i].toString().indexOf(this.keyword)!=-1)
                            return true
                    }
                    let ip=this.ipMap[device.ipId].address+':'+this.ipMap[device.ipId].port
                    return ip.indexOf(this.keyword)!=-1
                }
            )
        },

        deviceSettingsToBeShown(){
            return this.deviceSettingsToBeFiltered.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    created(){
        this.getIps()
        .then(()=>this.selectedDevices=Object.values(this.devices))
    }
}

export default mixinScript