<template>
 <div class="SellerRegister">
  <el-container>
        <el-header>
        小麦网后台管理系统
        </el-header>

        <h3>商家注册</h3>
            <el-form ref="SellerRegister" :model="SellerRegister" status-icon label-width="80px" :rules="rules">
              

              <el-form-item label="商家名称" prop="sellerName" label-width="80px">
                <el-input v-model="SellerRegister.sellerName" maxlength="50"></el-input>
              </el-form-item>
              
              <el-form-item label="设置密码" prop="password" label-width="80px">
                <el-input v-model="SellerRegister.password" maxlength="25"  show-password></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="password_2" label-width="80px">
                <el-input v-model="SellerRegister.password_2" show-password></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('SellerRegister')" icon="el-icon-check">注册</el-button>
              </el-form-item>
            </el-form>
        <el-footer>
        小麦网 Copyright 2021 DB Principle Project
        </el-footer>

  </el-container>
  </div>
</template>

<script>
export default {
  name:'SellerRegister',
  data(){
   var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.SellerRegister.password_2 !== '') {
            this.$refs.SellerRegister.validateField('password_2');
          }
          callback();
        }
      };
  var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.SellerRegister.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
  }
  return{
      SellerRegister:{
        sellerName:'',
        password:'',
        password_2:''

      },
      rules:
      {
         sellerName:[{required:true,trigger:'blur',message:'请输入商家名称'}],
         password:[{required:true,validator:validatePass,trigger:'blur'}],
         password_2:[{required:true,validator:validatePass2,trigger:'blur'}],
      }
    }
  },
  methods:
  {
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName)
      {
        this.$refs[formName].resetFields();
      }
      
  }
  }
</script>

<style>
.el-header{
    background-color: #409eff;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
    background-color: #409eff;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 7px;
  }
  .el-input{
    width: 250px;
  }
  h3 {
  color: #409eff;
  font-size: 24px;
}
.el-form{
  margin: 75px auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>