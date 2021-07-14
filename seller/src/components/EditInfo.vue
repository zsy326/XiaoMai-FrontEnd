<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>编辑资料</el-breadcrumb-item>
      <el-breadcrumb-item>填写资料</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="Info-card" shadow="always">
      <el-row type="flex" class="title" justify="space-around">
        <el-col :span="8"><div>项目</div></el-col>
        <el-col :span="12"><div>当前信息</div></el-col>
        <el-col :span="2"><div>操作</div></el-col>
      </el-row>
<el-row type="flex" justify="space-around">
        <el-col :span="8"><div>注册日期</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.RegDate }}</div></el-col
        >
        <el-col :span="2"><div></div> </el-col>
      </el-row>

<el-row type="flex" class="id" justify="space-around">
        <el-col :span="8"><div>累计收益</div></el-col>
        <el-col :span="12"
          ><div>￥{{ Info.Income }}</div></el-col
        >
        <el-col :span="2"><div></div> </el-col>
      </el-row>

      <el-row type="flex" class="id" justify="space-around">
        <el-col :span="8"><div>商家 ID</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.ID }}</div></el-col
        >
        <el-col :span="2"><div></div> </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
        <el-col :span="8"><div>商家名称</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.SellerName }}</div></el-col
        >
        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editName = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-around">
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



      <el-row type="flex" justify="space-around">
        <el-col :span="8"><div>商家地址:</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.Address }}</div></el-col
        >
        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editAddress = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="PhoneNumber" justify="space-around">
        <el-col :span="8"><div>商家电话</div></el-col>
        <el-col :span="12"
          ><div>{{ Info.PhoneNumber }}</div></el-col
        >
        <el-col :span="2"
          ><div class="edit">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editPhoneNumber = true"
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
              @click="editLogo = true"
            ></el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 更改名称的对话框 -->
    <el-dialog
      title="更改名称"
      :visible.sync="editName"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="tempInfo"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="125px"
        >
          <el-form-item label="请输入新的名称" prop="sellerName">
            <el-input
              v-model="tempInfo.sellerName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editName = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('tempInfo');editName=false;"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 更改密码的对话框 -->
    <el-dialog
      title="更改密码"
      :visible.sync="editPasswrd"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="passwrdForm"
          status-icon
          label-position="left"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
        >
          <el-form-item label="旧密码" prop="pass">
            <el-input
              v-model="passwrdForm.oldPasswrd"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="密 码" prop="pass">
            <el-input
              v-model="passwrdForm.newPasswrd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="passwrdForm.checkNewPasswrd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPasswrd = false">取 消</el-button>
        <el-button type="primary" @click="submitPasswrd('Info')"
          >确 定</el-button
        >
      </div>
    </el-dialog>


<!-- 更改地址的对话框 -->
<el-dialog
      title="更改地址"
      :visible.sync="editAddress"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="tempInfo"
          status-icon
          :rules="rules"
          ref="tempInfo"
          label-width="125px"
        >
          <el-form-item label="请输入新的地址" prop="address">
            <el-input
              v-model="tempInfo.address"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editAddress = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('tempInfo')"
          >确 定</el-button
        >
      </div>
    </el-dialog>


    <!-- 更改电话的对话框 -->
    <el-dialog
      title="更改电话"
      :visible.sync="editPhoneNumber"
      width="500px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="tempInfo"
          status-icon
          :rules="rules"
          ref="Info"
          label-width="125px"
        >
          <el-form-item label="请输入新的电话" prop="phoneNumber">
            <el-input
              v-model="tempInfo.phoneNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPhoneNumber = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('tempInfo')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    
    <!-- 更改logo的对话框 -->
    <el-dialog
      title="更改logo"
      :visible.sync="editLogo"
      width="500px"
      @close="editClosed"
    >
      <div>
         <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                </span>
            </div>
          </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLogo = false">取 消</el-button>
        <el-button type="primary" @click="submitLogo('Info')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.Info.checkPass !== "") {
          this.$refs.Info.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.Info.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      Info: {
        ID: "",
        SellerName: "",
        Address: "",
        RegDate: "",
        Image: "",
        Income: "",
        PhoneNumber: 0,
      },
      tempInfo:{
        id: "",
        sellerName: "",
        address: "",
        regData: "",
        image: "",
        income: "",
        phoneNumber: 0,
      },
      passwrdForm: {
        oldPasswrd: "",
        newPasswrd: "",
        checkNewPasswrd:"",
      },
      editName: false,
      editPasswrd: false,
      editAddress: false,
      editPhoneNumber: false,
      editIntroduction: false,
      editLogo: false,
      imageUrl: "",
      rules: {
        sellerName: [
          { required: true, trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          { required: true, trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在为11个字符",
            trigger: "blur",
          },
        ],
        image: [
          { required: true, trigger: "blur" },
        ],
      },
    };
  },
  created: function () {
    this.GetInfo();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          return false;
        }
      });
    },
    editClosed() {
      this.$refs.tempInfo.resetFields();
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

    async GetInfo() {
      const url = "/PersonalCenter";
      await axios
        .post(url, {
          id: "666666",
          userType: "SELLER",
        })
        .then((response) => {
          this.$message.success("查找信息成功！");
          this.Info = response.data;
        })
        .catch((err) => {
          this.$message.error("查找失败！");
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
.Info-card{
  max-width: 1000px;
  margin-left: 20px;
  background-color: rgba(78, 78, 124, 0.322);
}

.title {
  margin-bottom: 20px;
  font-size: 20px !important;
  padding: 10px;
  background-color: rgba(78, 78, 124, 0.253) !important;
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