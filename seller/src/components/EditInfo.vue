<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>编辑资料</el-breadcrumb-item>
      <el-breadcrumb-item>填写资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" shadow="always">
      <el-row type="flex" class="title" justify="space-around">
        <el-col :span="8"><div>项目</div></el-col>
        <el-col :span="12"><div>当前信息</div></el-col>
        <el-col :span="2"><div>操作</div></el-col>
      </el-row>
      <el-row type="flex" class="id" justify="space-around">
        <el-col :span="8"><div>商家ID</div></el-col>
        <el-col :span="12"
          ><div>{{ id }}</div></el-col
        >
        <el-col :span="2"><div></div> </el-col>
      </el-row>

      <el-row type="flex" class="name" justify="space-around">
        <el-col :span="8"><div>商家名称:</div></el-col>
        <el-col :span="12"
          ><div>{{ name }}</div></el-col
        >
        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editName=true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="name" justify="space-around">
        <el-col :span="8"><div>账号密码</div></el-col>
        <el-col :span="12"><div>**********</div></el-col>
        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editPasswrd = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="address" justify="space-around">
        <el-col :span="8"><div>商家地址</div></el-col>
        <el-col :span="12"
          ><div>{{ address }}</div></el-col
        >

        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editAddress=true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="introduction" justify="space-around">
        <el-col :span="8"><div>商家简介</div></el-col>
        <el-col :span="12"
          ><div>{{ introduction }}</div></el-col
        >

        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editIntroduction=true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="logo" justify="space-around">
        <el-col :span="8"><div>商家logo:</div></el-col>
        <el-col :span="12"
          ><div>
            <img
              id="user-avatar"
              src="../assets/images/avatar.png"
              alt=""
            /></div
        ></el-col>

      <el-col :span="2"
          ><div class="edit">
        <el-button
                icon="el-icon-edit"
                circle
                size="mini"
                @click="editLogo=true"
              ></el-button>
               </div>
        </el-col>
       
          
      </el-row>
    </el-card>

    <!-- 更改名称的对话框 -->
     <el-dialog title="更改名称" :visible.sync="editName" width="500px" @close="editClosed">
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="125px"
        >
          <el-form-item label="请输入新的名称" prop="name">
            <el-input
              type="name"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editName = false">取 消</el-button>
        <el-button type="primary" @click="submitName('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    

    <!-- 更改密码的对话框 -->
    <el-dialog title="更改密码" :visible.sync="editPasswrd" width="500px" @close="editClosed">
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
        >
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswrd = false">取 消</el-button>
        <el-button type="primary" @click="submitPasswrd('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

     <!-- 更改地址的对话框 -->
     <el-dialog title="更改地址" :visible.sync="editAddress" width="500px" @close="editClosed">
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="125px"
        >
          <el-form-item label="请输入新的地址" prop="address">
            <el-input
              type="address"
              v-model="ruleForm.address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAddress = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

 <!-- 更改简介的对话框 -->
     <el-dialog title="更改简介" :visible.sync="editIntroduction" width="500px" @close="editClosed">
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="125px"
        >
          <el-form-item label="请输入新的简介" prop="introduction">
            <el-input
              type="introduction"
              v-model="ruleForm.introduction"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editIntroduction = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

<!-- 更改logo的对话框 -->
     <el-dialog title="更改logo" :visible.sync="editLogo" width="500px" @close="editClosed">
      <div>
        <el-upload
          class="logo-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="logo" />
          <i v-else class="el-icon-plus logo-uploader-icon"></i>
        </el-upload>
        
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLogo = false">取 消</el-button>
        <el-button type="primary" @click="submitLogo('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      id: "01001",
      name: "TJ影城",
      introduction:
        "是一家优秀的电影院，创办于1907年，口碑极佳，在大众点评上连续3年获得‘嘉定区最佳电影院’",
      address: "上海市嘉定区曹安公路4800号",
      editName:false,
      editPasswrd: false,
      editAddress:false,
      editIntroduction:false,
      editLogo:false,

       ruleForm: {
          pass: '',
          checkPass: '',
          name:'',
          address:'',
          introduction:'',
          imageUrl: "",
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
          { required: true, trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          }],
          address: [
          { required: true, trigger: "blur" },
          {
            min: 5,
            max: 50,
            message: "长度在 5 到 50 个字符",
            trigger: "blur",
          }],
          introduction: [
          { required: true, trigger: "blur" },
          {
            min: 5,
            max: 4000,
            message: "长度在 5 到 4000 个字符",
            trigger: "blur",
          }],
           
      }
    };
  },
  
  methods: {
    submitName(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.editName = false;
              this.$message({
            type: 'success',
            message: '名称修改成功',
          })
          }else{
            return false;
          } 
        });
      },
       submitPasswrd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.editPasswrd = false;
              this.$message({
            type: 'success',
            message: '密码修改成功',
          })
          }else{
            return false;
          } 
        });
      },
       submitAddress(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.editAddress = false;
              this.$message({
            type: 'success',
            message: '地址修改成功',
          })
          }else{
            return false;
          } 
        });
      },
      submitIntroduction(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.editIntroduction = false;
              this.$message({
            type: 'success',
            message: '介绍修改成功',
          })
          }else{
            return false;
          } 
        });
      },
      submitLogo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.editLogo = false;
              this.$message({
            type: 'success',
            message: 'Logo修改成功',
          })
          }else{
            return false;
          } 
        });
      },
       editClosed(){
          this.$refs.ruleForm.resetFields()
      },
      handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传座位图片只能是 JPG 格式!");
      }
      if (!isLt5M) {
        this.$message.error("上传座位图片大小不能超过 5MB!");
      }
      return isJPG && isLt5M;
    },
  }
};
</script>


<style scoped>
.el-card {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
.title {
  margin-bottom: 20px;
  font-size: 20px !important;
  padding: 10px;
  background-color: #7584a83d !important;
  font-weight: bold;
}
.el-row {
  padding: 15px;
  font-size: 18px;
  color: rgb(31, 41, 77);
  background-color: #ffffff;
}
#user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.el-button {
  color: #fff;
  background-color: rgba(74, 83, 134, 0.445);
}
.logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
</style>