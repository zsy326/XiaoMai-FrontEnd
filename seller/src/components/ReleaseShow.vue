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
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="演出名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入演出名称"></el-input>
        </el-form-item>

        <el-form-item label="演出简介" prop="introduction">
          <el-col style="width: 600px">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入简介"
              v-model="ruleForm.introduction"
            >
            </el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="演出地址" prop="place">
          <el-input v-model="ruleForm.place" placeholder="请输入演出地址"></el-input>
        </el-form-item>

         <el-form-item label="演出地址" prop="place">
          <el-input v-model="ruleForm.place" placeholder="请输入演出地址"></el-input>
        </el-form-item>

        <el-form-item label="必选标签" prop="tag1" required>
          <el-select v-model="ruleForm.tag1" placeholder="请选择该演出的分类">
           
             <el-option
              v-for="item in TAG1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>

          </el-select>
        </el-form-item>

        <el-form-item label="其他标签 " prop="tag2">
          <el-select
            v-model="ruleForm.tag2"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择其他标签"
          >
            <el-option
              v-for="item in TAG2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即发布</el-button >
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
  name: "ReleaseSlot",
  props: {
  },
  data() {
    return {
      ruleForm: {
        name: '',
        introduction:'',
        place:'',
        tag1:'',
        tag2:'',
      },
      rules: {
        name: [
          { required: true,
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur",
          },
        ],
        introduction: [
          { required: true,
            min: 1,
            max: 4000,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
        place: [
          { required: true,
            min: 1,
            max: 100,
            message: "长度在 1 到 4000 个字符",
            trigger: "blur",
          },
        ],
      },
       successVisible:false,
       TAG1:[
          {label:"音乐会" ,value:"1"},
          {label:"话剧歌剧", value:"2"},
          {label:"演唱会" ,value:"3"},
          {label:"曲苑杂坛", value:"4"},
          {label:"展览休闲" ,value:"5"},
          {label:"舞蹈芭蕾" ,value:"6"},
          { label:"体育" ,value:"7"},
            {label:"其他" ,value:"8"}
      ],
       TAG2: [
          {value: "1",label: "爆笑",},
          {value: "2",label: "催泪",},
          {value: "3",label: "惊悚",},
          {value: "4",label: "爱情",},
        ],
    };
  },
   
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.successVisible=true;
            this.resetForm('ruleForm');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    backToOutline () {
      this.$router.push('/outline')
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
