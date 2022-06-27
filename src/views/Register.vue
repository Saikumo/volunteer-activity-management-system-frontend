<template>
  <div class="register-body">
    <div class="register-container">
      <div class="head">
        <div class="name">
          <div class="title">志愿者活动管理系统</div>
          <div class="tips">志愿者注册</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="registerForm" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="registerButton" style="width: 100%" type="primary" @click="submitForm">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {reactive, ref, toRefs} from 'vue'
import axios from '@/utils/axios'
import {ElMessage} from 'element-plus'
export default({
  name: 'Register',
  setup() {
    const userRole = ref('student')
    const registerForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: 'true', message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    const resetForm = () => {
      registerForm.value.resetFields();
    }
    const submitForm = async () => {
      registerForm.value.validate((valid) => {
        if (valid) {
          axios.post('/api/auth/register', {
            loginAccount: state.ruleForm.username || '',
            password: state.ruleForm.password,
          }).catch(function (){
            ElMessage.error("用户名已存在")
            resetForm()
          }).then(res => {
            let result = res.data.success
            if(result){
              ElMessage.success("注册成功")
              window.location.href = '/'
            }else{
              ElMessage.error(res.data.msg)
              resetForm()
            }
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
    return {
      ...toRefs(state),
      registerForm,
      submitForm,
      userRole
    }
  }
})
</script>

<style scoped>
  .register-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
  }
  .register-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .register-form {
    width: 70%;
    margin: 0 auto;
  }
  #registerButton{
    margin-top: 25px;
  }
</style>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .register-form .el-form-item {
    margin-bottom: 12px;
  }

</style>