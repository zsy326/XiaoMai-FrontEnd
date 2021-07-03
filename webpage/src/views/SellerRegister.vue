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

              <el-form-item label="地址" prop="address" label-width="80px">
                <el-input v-model="SellerRegister.address" type="textarea" autosize maxlength="100"></el-input>
              </el-form-item>

              <el-form-item v-for="(number,index) in SellerRegister.phoneNumbers" 
              :label="'联系方式'+(index+1)" 
              :key="number.key" 
              :prop="'phoneNumbers.' + index + '.value'"
              :rules="[{required: true, message: '联系方式不能为空'},
              {type:'number',message:'联系电话必须是数字'}]"
               label-width="100px">
                <el-input v-model.number="number.value"></el-input>&nbsp;&nbsp;<el-button @click.prevent="deletePhone(number)" type="danger" circle icon="el-icon-minus" size="small"></el-button>
              </el-form-item>

                <el-form-item>
                <el-button type="success" @click="addPhone()" icon="el-icon-plus" >新增联系方式</el-button>
                <el-button @click="resetForm('SellerRegister')" icon="el-icon-refresh">重置</el-button>
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
        password_2:'',
        address:'',
        phoneNumbers:[
          {
            value:''
          }
        ],
        avatarBlob:''
      },
      rules:
      {
         sellerName:[{required:true,trigger:'blur',message:'请输入商家名称'}],
         password:[{required:true,validator:validatePass,trigger:'blur'}],
         password_2:[{required:true,validator:validatePass2,trigger:'blur'}],
         address:[{required:true,trigger:'blur',message:'请输入地址'}],
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
      },
      addPhone()
      {
        this.SellerRegister.phoneNumbers.push(
          {
            value:'',
            key:Date.now()
          }
        )
      },
      deletePhone(item)
      {
        let index = this.SellerRegister.phoneNumbers.indexOf(item)
        if(index !== -1)
        {
          this.SellerRegister.phoneNumbers.splice(index,1)
        }
        else
        {
          this.$message.error("Something went wrong");
        }
      },
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