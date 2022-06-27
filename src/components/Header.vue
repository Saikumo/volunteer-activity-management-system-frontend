<template>
  <div class="header">
    <div class="left">
      <span style="font-size: 20px">{{ name }}</span>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><UserFilled /></el-icon>
          {{ username || '' }}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <DialogChangePassword ref="changePasswordDialog"></DialogChangePassword>
</template>

<script>
import {onMounted, reactive, ref, toRefs} from 'vue'
import { useRouter } from 'vue-router'
import { localRemove, pathMap,localGet } from '@/utils'
import {
  ArrowDown,
  UserFilled
} from '@element-plus/icons-vue'
import DialogChangePassword from "@/components/DialogChangePassword";
export default {
  name: 'Header',
  components:{
    DialogChangePassword,
    ArrowDown,
    UserFilled
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      name: '',
      username: '',
    })
    const changePasswordDialog = ref(null)
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || ''
      if (!['login'].includes(pathname)) {
        getUserInfo()
      }
    })
    const getUserInfo = function () {
      let token = localGet('token')
      state.username = token.data.data.loginAccount
    }
    const logout = () => {
      localRemove('token')
      window.location.reload()
    }
    const changePassword = () =>{
      changePasswordDialog.value.open()
    }
    router.afterEach((to) => {
      const { id } = to.query
      state.name = pathMap[to.name]
      if (id && to.name == 'add') {
        state.name = '编辑商品'
      }
    })
    return {
      ...toRefs(state),
      logout,
      changePasswordDialog,
      changePassword
    }
  }
}
</script>

<style scoped>
  .header {
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .el-icon-back {
    border: 1px solid #e9e9e9;
    padding: 4px;
    border-radius: 50px;
    margin-right: 10px;
  }
  .right > div > .icon{
    font-size: 18px;
    margin-right: 6px;
  }
  .author {
    margin-left: 10px;
    cursor: pointer;
  }
</style>
<style>
  .popper-user-box {
    background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png') 50% 50% no-repeat!important;
    background-size: cover!important;
    border-radius: 0!important;
  }
  .popper-user-box .nickname {
    position: relative;
    color: #ffffff;
  }
  .popper-user-box .nickname .logout {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
</style>