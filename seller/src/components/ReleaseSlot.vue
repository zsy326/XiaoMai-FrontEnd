<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我要发布</el-breadcrumb-item>
      <el-breadcrumb-item>发布演出</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="note">请填写您将要发布的演出的相关信息噢！</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="演出名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="演出简介" prop="introduction">
          <el-col style="width: 600px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入简介"
              v-model="ruleForm.introduction"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="演出地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>

        <el-form-item label="必选标签" prop="tag1">
          <el-select v-model="ruleForm.tag1" placeholder="请选择该演出的分类">
            <el-option label="音乐会" value="1"></el-option>
            <el-option label="话剧歌剧" value="2"></el-option>
            <el-option label="演唱会" value="3"></el-option>
            <el-option label="曲苑杂坛" value="4"></el-option>
            <el-option label="展览休闲" value="5"></el-option>
            <el-option label="舞蹈芭蕾" value="6"></el-option>
            <el-option label="体育" value="7"></el-option>
            <el-option label="其他" value="8"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="其他标签 （多选）" prop="region">
          <el-select
            v-model="value"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择其他标签"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="添加场次" prop="slotNum">
              <el-input-number
                v-model="slotNum"
                controls-position="right"
                @change="handleChange1"
                :min="1"
                :max="50"
              ></el-input-number>
            </el-form-item>
            <div class="grid-content bg-purple"></div
          ></el-col>

          <el-col :span="12">
            <el-button
              @click="drawer = true"
              type="primary"
              style="margin-left: 16px"
            >
              点击确认
            </el-button>
            <div class="grid-content bg-purple"></div
          ></el-col>
        </el-row>


<div class="time">
        <el-form-item label="开始时间" required>
          <el-col :span="6">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="时间"
                v-model="ruleForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-col :span="6">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="6">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="时间"
                v-model="ruleForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
</div>

        <el-form-item label="添加分区" prop="areaNum">
          <el-input-number
            v-model="areaNum"
            controls-position="right"
            @change="handleChange2"
            :min="1"
            :max="50"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="座位数" prop="seatNum">
          <el-input-number
            v-model="seatNum"
            controls-position="right"
            @change="handleChange3"
            :min="1"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="票价（RMB）" prop="price">
          <el-input-number
            v-model="price"
            controls-position="right"
            @change="handleChange4"
            :min="0"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="上传座位图" prop="areaNum">
          <el-upload
            class="img-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus seat-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit(ruleForm)"
            >立即发布</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
        value: [],
       
         options: [
        {
          value: "1",
          label: "爆笑",
        },
        {
          value: "2",
          label: "催泪",
        },
        {
          value: "3",
          label: "惊悚",
        },
        {
          value: "4",
          label: "爱情",
        },
      ],
      },
       slotNum: 1,
        areaNum: 1,
        seatNum: 1,
        price: 0,
      rules: {
        name: [
          { required: true, message: "请输入演出名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        introduction: [
          { required: true, message: "请输入演出简介", trigger: "blur" },
          {
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
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
.el-card {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}

.seat-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.seat-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  background-color: rgba(175, 180, 201, 0.404);
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
.note {
  margin-left: 10px;
  margin-bottom: 20px;
  color: rgb(49, 168, 189);
  font-size: 20px;
  font-weight: bold;
}

#submit {
  margin-left: 30px;
  margin-top: 30px;
}
</style>
