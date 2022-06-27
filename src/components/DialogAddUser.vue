<template>
  <el-dialog
      title='添加用户'
      v-model="visible"
      width="400px"
      @close="handleClose"
  >
    <el-form label-position="top" :rules="rules" :model="ruleForm" ref="registerForm" class="register-form">
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
          <el-radio v-model="userRole" label="志愿者">志愿者</el-radio>
          <el-radio v-model="userRole" label="活动组织者">活动组织者</el-radio>
          <el-radio v-model="userRole" label="管理员">管理员</el-radio>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, ref, toRefs, unref} from 'vue'
import axios from '@/utils/axios'
import {ElMessage} from 'element-plus'
import {localGet} from "@/utils";

export default {
  name: 'DialogAddUser',
  setup() {
    const userRole = ref('student')
    const registerForm = ref(null)
    const state = reactive({
      visible: false,
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
      }
    })
    // 开启弹窗
    const open = (id) => {
      state.visible = true
      if (id) {
        state.id = id
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
    const handleClose = () => {
      registerForm.value.resetFields()
    }
    const resetForm = () => {
      registerForm.value.resetFields();
    }
    const submitForm = () => {
      registerForm.value.validate((valid) => {
        if (valid) {
          axios.post('/api/manager/register', {
            loginAccount: state.ruleForm.username || '',
            password: state.ruleForm.password,
            roleName: unref(userRole)
          }, {
            headers: {
              Authorization: localGet('token').data.data.token
            }
          }).then((res) => {
            let result = res.data
            console.log(res)
            console.log(result.success)
            if (result.success) {
              ElMessage.success(result.msg)
              state.visible = false
            } else {
              ElMessage.error(result.msg)
              resetForm()
            }
          })
        }
      })
    }
    return {
      ...toRefs(state),
      open,
      close,
      registerForm,
      submitForm,
      handleClose,
      userRole
    }
  }
}
</script>

<style scoped>
</style>