<template>
    <div class="ctm-header">
        <nav class="ctm-navibar" role="navigation">
            <div class="ctm-navibar__header">
                <div class="software-name">
                    <div class="en-name" v-if="selectedSystem">KITOZER<span class="en-name-suffix">&reg;</span></div>
                    <div class="ch-name">{{selectedSystem?selectedSystem.name:'请选择系统'}}</div>
                </div>
            </div>
            <div class="ctm-navibar__middle">
         
                <el-popover v-model="item.popVisible" :ref="item.key" placement="bottom" trigger="hover" v-for="item in monitoringItem" :key="item.key" popper-class="monitor-item-pop" width="160">
                    <div class="monitor-item-pop__list">
                        <router-link :to="device.urlAddress" @click.native="item.popVisible=false" v-for="device in item.devices" :key="device.key" v-slot="{isActive,href,navigate}" tag="div">
                            <device-item  :isActive="isActive" :device="device" :href="href" :navigate="navigate"></device-item>
                        </router-link>
                    </div>
                </el-popover>

                <div class="ctm-navibar-item ctm-navibar-item_middle" v-if="monitoringItem.length>=1?true:false">
                    <router-link to="/homepage" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_middle" active-class="ctm-navibar-item__href_active">
                        主页
                    </router-link>
                </div>

                <!-- 这里是显示物联系统的头部信息 -->
                <router-link :to="item.urlAddress" class="ctm-navibar-item ctm-navibar-item_middle" v-slot="{isActive}"  v-for="item in monitoringItem" :key="item.name" v-popover="item.key">
                    <a class="ctm-navibar-item__href ctm-navibar-item__href_middle" :class="isActive && 'ctm-navibar-item__href_active'">
                        {{item.name}}
                    </a>
                </router-link>
            </div>
              
            <!-- 新增功能 -->
            <div class="ctm-navibar__right">
            <el-popover
                placement="top"
                trigger="hover"
                width="150"
               >
                <div class="tips-content">
                    <div  v-for="(item, index) in Text" :key="item.name" @click="jump(item.path,index)" >
                        <img :src="item.src"/>
                        <div :class='[index==mark ? "active" : ""]' style="width: 6vw;display: block;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"> {{item.name}}</div>
                   </div>
                </div>
                <span slot="reference">
                  <div class="ctm-navibar-item ctm-navibar-item_right">
                    <div class="ctm-navibar-item__href ctm-navibar-item__href_right">
                        <i class="el-icon-copy-document"></i>
                    </div>
                </div>
                </span>
              </el-popover>

                <div class="ctm-navibar-item ctm-navibar-item_right">
                    <a class="ctm-navibar-item__href ctm-navibar-item__href_right" href="#"  title="软件帮助文档">
                        <i class="el-icon-chat-dot-round"></i>
                    </a>
                </div>

                <div class="ctm-navibar-item ctm-navibar-item_right" style="display: none;">
                    <router-link to="/systems"  title="选择系统" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_right">
                        <i class="el-icon-setting"></i>
                    </router-link>
                </div>

                <div class="ctm-navibar-item ctm-navibar-item_right">
                    <router-link to="/alarm"  title="告警信息查询" tag="a" class="ctm-navibar-item__href ctm-navibar-item__href_right">
                        <el-badge :value="unReadAlarmNumber" class="item" :max="99">
                            <i class="el-icon-bell"></i>
                        </el-badge>
                    </router-link>
                </div>

                <div class="ctm-navibar-item ctm-navibar-item_right">
                    <span class="ctm-navibar-item__href ctm-navibar-item__href_right" @click.stop="$refs.personDialog.dialogVisible=true"  title="个人信息">
                        <i class="el-icon-user"></i>
                    </span>
                </div>

                <div class="ctm-navibar-item ctm-navibar-item_right">
                    <span class="ctm-navibar-item__href ctm-navibar-item__href_right" href="#" @click.stop="logout"  title="退出登录">
                        <i class="el-icon-switch-button"></i>
                    </span>
                </div>
            </div>
        </nav>
        <person-info-dialog ref="personDialog"></person-info-dialog> 
    </div>
</template>
<script>
import DeviceItem from "./DeviceItem.vue";
import PersonInfoDialog from "./PersonInfoDialog.vue";
import register from "@/components/register.js";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
        Text:[
          {name:'天窗消防门磁',path:'/skylight',src:require("./img/Gatemagnetism.png")},
          {name:"机柜内散热风机",path:'/coolingFan',src:require('./img/Coolingfan.png')}
        ],
        mark : -1
    };
  },
  methods: {
    jump(res,index){
        this.mark = index
        this.$router.push(res)
    },
    logout() {
      sessionStorage.removeItem("name");
      window.location.href = "/login.html";
    },
    async initRoute(items) {
      let dynamicRoutes = [];
      await items.forEach(async ({ key, auth, visible, devices }) => {
        if (!visible) return;
        if (auth) {
          let result = await this.checkAuth(auth);
          if (!result) return;
        }

        devices.forEach(async device => {
          if (!device.visible) return;
          if (device.auth) {
            let result = await this.checkAuth(device.auth);
            if (!result) return;
          }
          let newRoute = {
            path: `/${key}/${device.key}`,
            meta: { requireAuth: true },
            component: register[device.key]
          };
          dynamicRoutes.push(newRoute);
        });
      });
      //[...dynamicRoutes]把路由添加到router中
      this.$router.addRoutes([...dynamicRoutes]);
    },
    async checkAuth(auth) {
      if (!this.roles) await this.$store.dispatch("role/updateRole");
      if(typeof this.roles !== "undefined"){
        for (let i = auth.length - 1; i >= 0; i--)
            if (this.roles.includes(auth[i])) return true;
          return false;
      }
    },
    checkAuthSync(auth, roles) {
      // if(!this.roles)
      //     await this.$store.dispatch('role/updateRole')
      for (let i = auth.length - 1; i >= 0; i--)
        if (roles.includes(auth[i])) return true;
      return false;
    },
    checkSystemCookie() {
      let cookies = document.cookie.split(";");
      let keyName = "selectedSystem";
      for (let i = cookies.length - 1; i >= 0; i--) {
        cookies[i] = cookies[i].trim();
        if (cookies[i].indexOf(keyName) == 0) {
          return JSON.parse(
            cookies[i].substring(keyName.length + 1, cookies[i].length)
          );
        }
      }
      return null;
    }
    // ...mapActions(['queryReadAlarm','queryMenu','querySystems']),
    // ...mapMutations(['UPDATE_SELECTEDSYSTEM'])
  },
  created() {
    let loading = document.getElementById("loading");
    if (loading != null) document.body.removeChild(loading);
    this.$store.dispatch("alarm/updateAlarm");

    // this.querySystems()
    this.$store
      .dispatch("system/updateSystems")
      .then(() => {
        if (!this.selectedSystem) {
          let system = this.checkSystemCookie();
          if (!system) {
            this.$router.push({ name: "systems" });
            return Promise.reject();
          } else this.$store.commit("system/UPDATE_SELECTEDSYSTEM", system);
          // this.UPDATE_SELECTEDSYSTEM(system)
        }
      })
      .then(() => this.$store.dispatch("system/updateMenu"));
    // this.queryMenu()
  },
  computed: {
    ...mapGetters(["menu", "unReadAlarmNumber", "selectedSystem", "roles"]),
    monitoringItem: {
      get: function() {
        this.initRoute(this.menu);
        let items = [];
        this.menu.forEach(({ name, auth, key, visible, devices }) => {
          if (!visible) return;
          if (auth) {
            let result = this.checkAuthSync(auth, this.$store.getters.roles);
            if (!result) return;
          }
          let newItem = {
            name,
            key,
            urlAddress: `/${key}`,
            devices: []
          };
          devices.forEach(device => {
            if (!device.visible) return;
            if (device.auth) {
              if(typeof this.roles !== "undefined"){
                 let result = this.checkAuthSync(
                  device.auth,
                  this.roles
                );
                if (!result) return;
              }
            }
            let newDevice = {
              name: device.name,
              key: device.key,
              urlAddress: `/${key}/${device.key}`
            };
            newItem.devices.push(newDevice);
          });
          items.push(newItem);
        });
        return items;
      }
    }
  },
  components: {
    "device-item": DeviceItem,
    "person-info-dialog": PersonInfoDialog
  }
};
</script>
<style>
@import "~@/css/monitorpage/page-navigator.css";
</style>