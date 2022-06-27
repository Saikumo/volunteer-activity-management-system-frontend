<template>
  <el-dialog
      title='修改密码'
      v-model="visible"
      width="400px"
      @close="handleClose"
  >
    <el-form label-position="top" :rules="rules" :model="ruleForm" ref="registerForm" class="register-form">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input type="password" v-model.trim="ruleForm.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model.trim="ruleForm.newPassword" autocomplete="off"></el-input>
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
import {reactive, ref, toRefs} from 'vue'
import axios from '@/utils/axios'
import {ElMessage} from 'element-plus'
import {localGet} from "@/utils";

export default {
  name: 'DialogChangePassword',
  setup() {
    const userRole = ref('student')
    const registerForm = ref(null)
    const state = reactive({
      visible: false,
      ruleForm: {
        oldPassword: '',
        newPassword: ''
      },
      rules: {
        oldPassword: [
          {required: 'true', message: '旧密码不能为空', trigger: 'blur'}
        ],
        newPassword: [
          {required: 'true', message: '新密码不能为空', trigger: 'blur'}
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
          axios.post('/api/user/changepassword', {
            oldPassword: state.ruleForm.oldPassword || '',
            newPassword: state.ruleForm.newPassword,
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