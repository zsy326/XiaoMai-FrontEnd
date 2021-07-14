<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我要发布</el-breadcrumb-item>
      <el-breadcrumb-item>发布场次</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="addCard">
      <div class="note">请填写您将要发布的场次的相关信息噢！</div>

      <el-form
        :model="slotForm"
        :rules="rules"
        ref="slotForm"
        label-width="100px"
        label-position="left"
        class="demo-slotForm"
      >
        <el-form-item label="演出 ID" prop="showId" required>
          <el-input v-model="slotForm.showId" style="width: 150px"></el-input>
        </el-form-item>

        <el-form-item label="场次日期" required>
          <el-col :span="6">
            <el-form-item prop="day">

              <el-date-picker
                type="date"
                placeholder="日期"
                v-model="slotForm.day"
                style="width: 150px"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy/MM/dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="起止时间" required>
          <el-time-select
            placeholder="起始时间"
            v-model="slotForm.timeStart"
            :picker-options="{
              start: '00:00',
              step: '00:10',
              end: '24:00',
            }"
          >
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="slotForm.timeEnd"
            :picker-options="{
              start: '00:00',
              step: '00:10',
              end: '24:00',
              minTime: slotForm.timeStart,
            }"
          >
          </el-time-select>
        </el-form-item>

  <el-form-item label="演出地址" prop="place" required>
          <el-input v-model="slotForm.place" style="width: 440px"></el-input>
        </el-form-item>

        <!-- 分区信息列表 -->
        <el-card class="AreaList">
        
          <el-form
            :v-model="slotForm.areas"
            label-width="40px"
            class="demo-dynamic"
          >
            <div
              v-for="(item, index) in slotForm.areas"
              :key="index"
              style="width: 100%; display: flex"
            >
              　　
              <el-row :gutter="8">
                <el-col  :span="6">
                  <el-form-item
                    label-width="0"
                    :prop="slotForm.areas.name"
                    :rules="{
                      required: true,
                      message: '名称不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="slotForm.areas[index].name"
                      placeholder="分区名称"
                    ></el-input>
                  </el-form-item>
                  </el-col>

                  <el-col :span="6">
                  <el-form-item
                    label-width="0"
                    :prop="slotForm.areas.availble"
                    :rules="{
                      required: true,
                      message: '价格不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="slotForm.areas[index].available"
                      placeholder="座位数"
                    ></el-input>
                  </el-form-item>
                </el-col>

                 <el-col :span="6">
                  <el-form-item 
                    label-width="0"
                    :prop="slotForm.areas.price"
                    :rules="{
                      required: true,
                      message: '价格不能为空',
                      trigger: 'blur',
                    }"
                  >
                    <el-input
                      v-model="slotForm.areas[index].price"
                      placeholder="票价"
                    ></el-input>
                  </el-form-item>
                </el-col>
                　<el-col :span="4">　
              <el-button @click.prevent="removeArea(item)">删除</el-button> 　　
                　</el-col>
             </el-row>
            </div>
          </el-form>
        </el-card>

        <el-form-item required label="添加分区" style="margin-top: 20px">
          <el-button @click="addAreas" >
            点击增分区
          </el-button>
        </el-form-item>

        <el-form-item label="上传座位图" required>
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
          <el-button type="primary" @click="submitForm('slotForm')"
            >立即发布</el-button
          >
          <el-button @click="resetForm('slotForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

  <!-- 更改确认信息的对话框 -->
    <el-dialog
      title="确认信息"
      :visible.sync="confirmVisible"
      width="500px"
    >
      <div>
       您将要发布一个场次，信息如下：
       <el-card>
         <el-row>演出ID:{{slotForm.showId}}</el-row>
          <el-row>商家ID:{{slotForm.sellerId}}</el-row>
              <el-row>场次地点:{{slotForm.place}}</el-row>
            <el-row>场次日期:{{slotForm.day}}</el-row>
            <el-row>场次开始时间:{{slotForm.timeStart}}</el-row>
             <el-row>场次结束时间:{{slotForm.timeEnd}}</el-row>
              <el-row>座位图:{{slotForm.map}}</el-row>
               <el-row>场次分区:{{slotForm.areas}}</el-row>
       </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="Release"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 发布演出成功信息 -->
    <el-dialog title="系统提示" :visible.sync="successVisible" width="300px">
      <span>发布场次成功</span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successVisible = false"
          >继续发布</el-button
        >
        <el-button type="primary" @click="backToOutline"> 返回首页 </el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ReleaseSlot",
  data() {
    return {
      slotForm: {
        showId: '',
        sellerId: 666666,
        place: "",
        day: "",
        timeStart: "",
        timeEnd: "",
        map: "balabala",
        areas: [
          {
            price:'',
            name: "",
            available:'',
          },
        ],
      },
      confirmVisible:false,
      successVisible:false,
      rules: {
        showId: [{ required: true, trigger: "blur" }],
        day: [{ required: true, trigger: "blur" }],
        timeStart: [{ required: true, trigger: "blur" }],
        timeEnd: [{ required: true, trigger: "blur" }],
      },
      imageUrl: "",
    };
  },
  methods: {
    editClosed() {
      this.$refs.slotForm.resetFields();
      area = {};
    },
    submitForm(formName) {
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
      const url = "/AddSlot";
      await axios
        .post(url, {
        showId: this.slotForm.showId,
        sellerId: this.slotForm.sellerId,
        place:this.slotForm.place,
        day:this.slotForm.day,
        timeStart: this.slotForm.timeStart,
        timeEnd:this.slotForm.timeEnd,
        map: this.slotForm.map,
        areas: this.slotForm.areas
        })
        .then((response) => {
          this.successVisible = true;
          this.resetForm("slotForm");
        })
        .catch((err) => {
          this.$message.error("未知错误！");
          console.log(err);
        });
    },
    // handleavailable(value) {
    //   console.log3(value);
    // },
    // handlePrice(value) {
    //   console.log4(value);
    // },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传座位图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    addAreas() {
       this.slotForm.areas.push({
        });
    },
    delAreas(item) {
      var index = this.slotForm.areas.indexOf(item)
        if (index !== -1) {
          this.slotForm.areas.splice(index, 1)
        }
    },
    backToOutline() {
      this.$router.push("/outline");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#submit {
  margin-left: 30px;
  margin-top: 30px;
}
.AreaList {
  margin-right: 20px !important;
  margin-top: 30px !important;
  margin-bottom: 0px !important;
  background-color: #1d597c1f;
  min-width: 800px;
}
</style>
