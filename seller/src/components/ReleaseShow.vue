<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我要发布</el-breadcrumb-item>
      <el-breadcrumb-item>发布演出</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="addCard">
      <div class="note">请填写您将要发布的演出的相关信息噢！</div>
      <el-form
        :model="showForm"
        :rules="rules"
        ref="showForm"
        label-width="100px"
      >
        <el-form-item label="演出名称" prop="name">
          <el-input
            v-model="showForm.name"
            placeholder="请输入演出名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="演出简介" prop="introduction">
          <el-col style="width: 600px">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入简介"
              v-model="showForm.introduction"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="必选标签" prop="label1" >
          <el-select v-model="label1" >
            <el-option
              v-for="item in LABEL1"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="其他标签 " prop="label2">
          <el-select
            v-model="label2"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择其他标签"
          >
            <el-option
              v-for="item in LABEL2"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="演出图片 " prop="photo" >
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
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('showForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('showForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>


<!-- 发布演出成功信息 -->
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
       您将要发布一个演出，信息如下：
       <el-card>
         <el-row>演出名称{{showForm.name}}</el-row>
          <el-row>演出简介{{showForm.introduction}}</el-row>
              <el-row>演出照片{{showForm.photo}}</el-row>
            <el-row>演出标签{{showForm.label}}</el-row>
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
  name: "ReleaseSlot",
  props: {},
  data() {
    return {
      showForm:{
        name: "",
        introduction: "",
        photo: "lalala",
        label:[],
      },
        label1:'',
        label2:[],
      rules: {
        name: [
          {
            required: true,
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        introduction: [
          {
            required: true,
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
        
      },
      successVisible: false,
      confirmVisible:false,
       dialogImageUrl: '',
      LABEL1: [
        { label: "音乐会", value: "1" },
        { label: "话剧歌剧", value: "2" },
        { label: "演唱会", value: "3" },
        { label: "曲苑杂坛", value: "4" },
        { label: "展览休闲", value: "5" },
        { label: "舞蹈芭蕾", value: "6" },
        { label: "体育", value: "7" },
        { label: "其他", value: "8" },
      ],
      LABEL2: [
        { value: "1", label: "爆笑" },
        { value: "2", label: "催泪" },
        { value: "3", label: "惊悚" },
        { value: "4", label: "爱情" },
      ],
    };
  },

  methods: {
    submitForm(formName) {
      this.showForm.label[0]=this.label1
      let k=1
      while(k<this.label2.length+1){
          this.showForm.label[k]=this.label2[k-1]
          k=k+1
      }
    console.log(this.showForm.label)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmVisible=true
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     async Release() {
       this.confirmVisible=false
      const url = "/AddShow";
      await axios
        .post(url, {
          name:this.showForm.name,
          introduction:this.showForm.introduction,
          photo:this.showForm.photo,
          label:this.showForm.label
        })
        .then((response) => {
          this.successVisible = true;
          this.resetForm("showForm");
        })
        .catch((err) => {
          this.$message.error("未知错误！");
          console.log(err);
        });
    },
    backToOutline() {
      this.$router.push("/outline");
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-input {
  width: 600px;
}
#submit {
  margin-left: 30px;
  margin-top: 30px;
}
</style>
