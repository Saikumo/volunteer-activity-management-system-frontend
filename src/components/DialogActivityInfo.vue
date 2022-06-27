<template>
  <el-dialog
      title='活动详情'
      v-model="visible"
      width="400px"
      @close="close()"
  >
    <div>活动名:{{ data.name }}</div>
    <div>活动组织者:{{data.organizerName}}</div>
    <div>活动描述:{{data.description}}</div>
    <div>活动地点:{{data.location}}</div>
    <div>活动时间:{{date}}</div>

  </el-dialog>
</template>

<script>
import {reactive, ref, toRefs} from 'vue'
import axios from '@/utils/axios'
import {localGet} from "@/utils";

export default {
  name: 'DialogActivityInfo',
  setup() {
    const userRole = ref('student')
    const registerForm = ref(null)
    const state = reactive({
      visible: false,
      id: -1,
      data: {},
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: 'true', message: '用户名不能为空', trigger: 'blur'}
        ],
        password: [
          {required: 'true', message: '密码不能为空', trigger: 'blur'}
        ]
      },
      date:null
    })
    // 开启弹窗
    const open = (id) => {
      state.visible = true
      if (id) {
        state.id = id
        getIndexConfig()

      } else {
        state.ruleForm = {
          name: '',
          id: '',
          link: '',
          sort: ''
        }
      }
    }
    // 关闭弹窗
    const close = () => {
      state.visible = false
    }
    // 活动列表
    const getIndexConfig = () => {
      state.loading = true
      axios.get('/api/manager/activityinfo', {
        headers: {
          Authorization: localGet('token').data.data.token
        },
        params: {
          activityId: state.id
        },
      }).then(res => {
        state.data = res.data.data
        state.date = new Date(state.data.timestamp)
        state.loading = false
      })
    }
    const handleClose = () => {
      registerForm.value.resetFields()
    }
    return {
      ...toRefs(state),
      open,
      close,
      registerForm,
      handleClose,
      getIndexConfig,
      userRole
    }
  }
}
</script>

<style scoped>
</style>