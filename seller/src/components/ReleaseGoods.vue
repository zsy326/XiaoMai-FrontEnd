<template>
  <div>
  <div class="note" >
   请填写您将要发布的周边的相关信息噢！ 
  </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
     <el-form-item label="对应的演出ID" prop="slotID">
        <el-input v-model="ruleForm.slotID"></el-input>
      </el-form-item>


      <el-form-item label="周边名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="周边简介" prop="introduction">
       
      
      <el-input
  type="textarea"
  :rows="4"
  placeholder="请输入简介"
  v-model="ruleForm.introduction">
</el-input>

      </el-form-item>

      <el-form-item label="价格（RMB）" prop="price">
        <el-input-number
          v-model="price"
          controls-position="right"
          @change="handleChange4"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="上传实物图/平面图" prop="areaNum">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus goods-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ReleaseSlot",
  props: {
    msg: String,
  },
  data() {
    return {
      ruleForm: {
        name: "喵喵",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      value: [],
      price: 0,
      rules: {
        slotID: [
          { required: true, message: "请输入对应的演出ID", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入周边名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        introduction: [
          { required: true, message: "请输入周边简介", trigger: "blur" },
          {
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入演出地址", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        tag1: [
          { required: true, message: "请选择一个标签", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      imageUrl: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange1(value) {
      console.log1(value);
    },
    handleChange2(value) {
      console.log2(value);
    },
    handleChange3(value) {
      console.log3(value);
    },
    handleChange4(value) {
      console.log4(value);
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.goods-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  background-color: rgba(175, 180, 201, 0.192);
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

.note {
  margin-left: 10px;
  margin-bottom: 20px;
  color: rgb(49, 168, 189);
  font-size: 20px;
  font-weight: bold;
}
.el-input {
  width: 600px;
}

</style>
