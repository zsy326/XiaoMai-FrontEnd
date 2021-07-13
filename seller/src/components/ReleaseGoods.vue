<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我要发布</el-breadcrumb-item>
      <el-breadcrumb-item>发布周边</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="addCard" shadow="always">
      <div class="note">请填写您将要发布的周边的相关信息噢！</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        label-position=left
        class="demo-ruleForm"
      >
        <el-form-item label="对应的演出ID" prop="showId">
          <el-input v-model="ruleForm.showId"  
          placeholder="请输入对应的演出ID"></el-input>
        </el-form-item>

        <el-form-item label="周边名称" prop="goodsName">
          <el-input v-model="ruleForm.goodsName"
          placeholder="请输周边名称"></el-input>
        </el-form-item>

        <el-form-item label="周边简介" prop="description">
          <el-col style="width: 600px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入简介"
              v-model="ruleForm.description"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="价格（RMB）" prop="price">
          <el-input-number
            v-model="ruleForm.price"
            controls-position="right"
            @change="handleChangePrice"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="数量" prop="available">
          <el-input-number
            v-model="ruleForm.available"
            controls-position="right"
            @change="handleChangeNum"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="上传实物图" prop="areaNum">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goodsPhoto" :src="goodsPhoto" class="avatar" />
            <i v-else class="el-icon-plus goods-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>

      </el-form>
    </el-card>
<el-dialog
  title="系统提示"
  :visible.sync="successVisible"
  width="300px">
  <span>发布演出成功</span>

  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="successVisible = false">继续发布</el-button>
    <el-button type="primary" @click="backToOutline"> 
       返回首页
        </el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  goodsName: "ReleaseSlot",
  props: {
    msg: String,
  },
  data() {
    return {
      ruleForm: {
        showId:'',
        goodsName: "",
        description:"",
        goodsPhoto:'',
        price:0,
        available:1,
      },
      rules: {
        showId: [
          { required: true, message: "请输入对应的演出ID", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        goodsName: [
          { required: true, message: "请输入周边名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        description: [
          { required: true, message: "请输入周边简介", trigger: "blur" },
          {
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
        goodsPhoto:[
         { required: true, trigger: "blur" },
        ],
        price:[
           { required: true, message: "请输入周边价格", trigger: "blur" },
        ],
        available:[
            { required: true, trigger: "blur" },
        ],
      },
      successVisible:false,
    };
  },
  methods: {
    submitForm(formgoodsName) {
      this.$refs[formgoodsName].validate((valid) => {
        if (valid) {
          this.successVisible=true;
            this.resetForm('ruleForm');
          url
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formgoodsName) {
      this.$refs[formgoodsName].resetFields();
    },
    handleChangePrice(price) {
      console.log1(price);
    },
    handleChangeNum(num) {
      console.log2(num);
    },
    handleAvatarSuccess(res, file) {
      this.goodsPhoto = URL.createObjectURL(file.raw);
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
.el-card {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
.goods-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.goods-uploader-icon {
  font-size: 48px;
  color: #04152c67;
  background-color: rgba(175, 180, 201, 0.164);
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

.el-input {
  width: 600px;
}
</style>
