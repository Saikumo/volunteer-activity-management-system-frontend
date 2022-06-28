<template>
  <div class="layout">
    <el-container v-if="state.showAdminMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <span>管理员系统</span>
          </div>
        </div>
        <div class="line"/>
        <el-menu
            :router="true"
            background-color="#222832"
            text-color="#fff"
            class="el-menu-vertical-demo"
        >
          <el-menu-item index="/manageUser">
            <el-icon><user-filled/></el-icon>用户管理
          </el-menu-item>
          <el-menu-item index="/manageActivity">
            <el-icon><place/></el-icon>活动管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view/>
        </div>
      </el-container>
    </el-container>
    <el-container v-else-if="state.showVolunteerMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <span>志愿者系统</span>
          </div>
        </div>
        <div class="line"/>
        <el-menu
            :router="true"
            background-color="#222832"
            text-color="#fff"
            class="el-menu-vertical-demo"
        >
          <el-menu-item index="/activityList">
            <el-icon>
              <user-filled/>
            </el-icon>
            活动列表
          </el-menu-item>
          <el-menu-item index="/joinRecord">
            <el-icon>
              <user-filled/>
            </el-icon>
            志愿者申请记录
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view/>
        </div>
      </el-container>
    </el-container>
    <el-container v-else-if="state.showOrganizerMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <span>活动组织者系统</span>
          </div>
        </div>
        <div class="line"/>
        <el-menu
            :router="true"
            background-color="#222832"
            text-color="#fff"
            class="el-menu-vertical-demo"
        >
          <el-menu-item index="/checkVolunteer">
            <el-icon>
              <user-filled/>
            </el-icon>
            志愿者申请审批
          </el-menu-item>
          <el-menu-item index="/organizerManageActivity">
            <el-icon>
              <user-filled/>
            </el-icon>
            活动管理
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header/>
        <div class="main">
          <router-view/>
        </div>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view/>
    </el-container>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {localGet} from "@/utils";
import {onUnmounted, reactive} from "vue";
import Header from '@/components/Header.vue'
import {
  UserFilled,Place
} from '@element-plus/icons-vue'

export default {
  name: 'App',
  components: {
    Header,
    UserFilled,
    Place
  },
  setup() {
    const state = reactive({
      userInfo: null,
      defaultOpen: ['1', '2', '3', '4'],
      showAdminMenu: false,
      showVolunteerMenu: false,
      showOrganizerMenu: false,
      currentPath: '/manageUser',
      count: {
        number: 1
      }
    })
    const router = useRouter()
    const unwatch = router.beforeEach((to, from, next) => {
      if (to.path === '/login' | to.path === '/register') {
        // 如果路径是 /login或/register 则正常执行
        next()
      } else if (!localGet('token')) {
        // 如果没有token 跳转
        next({path: '/login'})
      } else {
        let token = localGet('token')
        setStatus(token)
        next()
      }
      state.currentPath = to.path
    })

    const setStatus = function (token){
      console.log(token)
      console.log("2333333")
      console.log(token.data.data.authorities[0])
      let authorities = token.data.data.authorities[0].authority
      if (authorities === '志愿者') {
        state.showVolunteerMenu = true
      } else if (authorities === '活动组织者') {
        state.showOrganizerMenu = true
      } else if (authorities === '管理员') {
        state.showAdminMenu = true
      }
      console.log("11111111111111")
      console.log(state)
    }
1

    onUnmounted(() => {
      unwatch()
    })

    return {
      state
    }
  }
}
</script>













<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px!important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none!important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px!important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>