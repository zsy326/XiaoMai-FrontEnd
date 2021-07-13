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
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="120px"
        label-position="left"
        class="demo-goodsForm"
      >
        <el-form-item label="对应的演出ID" prop="showId">
          <el-input
            v-model="goodsForm.showId"
            placeholder="请输入对应的演出ID"
          ></el-input>
        </el-form-item>

        <el-form-item label="周边名称" prop="goodsName">
          <el-input
            v-model="goodsForm.goodsName"
            placeholder="请输周边名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="周边简介" prop="description">
          <el-col style="width: 600px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入简介"
              v-model="goodsForm.description"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="价格（RMB）" prop="price">
          <el-input-number
            v-model="goodsForm.price"
            controls-position="right"
            @change="handleChangePrice"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="数量" prop="available">
          <el-input-number
            v-model="goodsForm.available"
            controls-position="right"
            @change="handleChangeNum"
            :min="1"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="上传实物图" prop="goodsPhoto">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goodsForm.goodsPhoto" :src="goodsForm.goodsPhoto" class="avatar" />
            <i v-else class="el-icon-plus goods-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="confirmForm('goodsForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('goodsForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="系统提示" :visible.sync="successVisible" width="300px">
      <span>发布演出成功</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successVisible = false"
          >继续发布</el-button
        >
        <el-button type="primary" @click="backToOutline"> 返回首页 </el-button>
      </span>
    </el-dialog>

    <!-- 更改确认信息的对话框 -->
    <el-dialog
      title="确认信息"
      :visible.sync="confirmVisible"
      width="500px"
    >
      <div>
       您将要发布一个周边，信息如下：
       <el-card>
         <el-row>周边名称{{goodsForm.goodsName}}</el-row>
          <el-row>周边简介{{goodsForm.description}}</el-row>
           <el-row>周边价格{{goodsForm.price}}</el-row>
            <el-row>周边数量{{goodsForm.available}}</el-row>
       </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="Release"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  goodsName: "ReleaseSlot",
  props: {
    msg: String,
  },
  data() {
    return {
      goodsForm: {
        showId: 123456,
        goodsName: "",
        description: "",
        goodsPhoto: "",
        price: 0,
        available: 1,
      },
      rules: {
        showId: [
          { required: true, message: "请输入对应的演出ID", trigger: "blur" },
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
        // goodsPhoto: [{ required: true, trigger: "blur" }],
        price: [{ required: true, message: "请输入周边价格", trigger: "blur" }],
        available: [{ required: true, trigger: "blur" }],
      },
      successVisible: false,
      confirmVisible:false,
    };
  },
  methods: {
    confirmForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmVisible=true
          // url;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formgoodsName) {
      this.$refs[formgoodsName].resetFields();
    },
    async Release() {
      const url = "/releaseGoods";
      await axios
        .post(url, {
          sellerId: 123456,
          showId: this.goodsForm.showId,
          goodsName: this.goodsForm.goodsName,
          description: this.goodsForm.description,
          goodsPhoto: this.goodsForm.goodsPhoto,
          price: this.goodsForm.price,
          available: this.goodsForm.available,
        })
        .then((response) => {
          this.successVisible = true;
          resetForm("goodsForm");
        })
        .catch((err) => {
          this.$message.error("未知错误！");
          console.log(err);
        });
    },
    handleChangePrice(price) {
      console.log1(price);
    },
    handleChangeNum(num) {
      console.log2(num);
    },
    handleAvatarSuccess(res, file) {
      this.goodsForm.goodsPhoto = URL.createObjectURL(file.raw);
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
    backToOutline () {
      this.$router.push('/outline')
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
