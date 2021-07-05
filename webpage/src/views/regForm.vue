<template>
  <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="account" required>
      <el-input v-model.number="registerForm.account"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass" required>
      <el-input type="password" v-model="registerForm.pass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required>
      <el-input type="password" v-model="registerForm.checkPass" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item style="text-align: center">
      <el-button style="text-align:center" type="primary" @click="submitForm('registerForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
  export default {
    name: "regForm",
  data() {
  var checkAccount = (rule, value, callback) => {
  if (!value) {
  return callback(new Error('账号不能为空'));
}
};
  var validatePass = (rule, value, callback) => {
  if (value === '') {
  callback(new Error('请输入密码'));
} else {
  if (this.registerForm.checkPass !== '') {
  this.$refs.ruleForm.validateField('checkPass');
}
  callback();
}
};
  var validatePass2 = (rule, value, callback) => {
  if (value === '') {
  callback(new Error('请再次输入密码'));
} else if (value !== this.registerForm.pass) {
  callback(new Error('两次输入密码不一致!'));
} else {
  callback();
}
};
  return {
  registerForm: {
  pass: '',
  checkPass: '',
  account: ''
},
  rules: {
  pass: [
{ validator: validatePass, trigger: 'blur' }
  ],
  checkPass: [
{ validator: validatePass2, trigger: 'blur' }
  ],
  account: [
{ validator: checkAccount, trigger: 'blur' }
  ]
}
};
},
  methods: {
  submitForm(formName) {
  this.$refs[formName].validate((valid) => {
  if (valid) {
  alert('submit!');
} else {
  alert('注册不成功，请重试');
  return false;
}
});
}
}
}
</script>

<style scoped>

</style>