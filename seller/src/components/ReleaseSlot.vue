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
        label-width="80px"
        label-position="left"
        class="demo-slotForm"
      >
        <el-form-item label="演出 ID" prop="id">
          <el-input v-model="slotForm.id"></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="添加场次" prop="slotNum">
              <el-button
                @click="addSlot = true"
                icon="el-icon-circle-plus-outline"
                style="margin-left: 0px; background-color: "
              >
                点击增加场次
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submit(slotForm)"
            >立即发布</el-button
          >
          <el-button @click="resetForm('slotForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 增加场次的对话框 -->
    <el-dialog
      title="增加场次"
      :visible.sync="addSlot"
      width="900px"
      @close="editClosed"
    >
      <div>
        <el-form
          :model="slotForm"
          :rules="rules"
          ref="slotForm"
          label-width="95px"
          label-position="left"
          class="demo-slotForm"
        >
          <el-form-item label="场次日期" required>
            <el-col :span="6">
              <el-form-item prop="day">
                <el-date-picker
                  type="date"
                  placeholder="日期"
                  v-model="slotForm.day"
                  style="width: 150px"
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
                minTime: startTime,
              }"
            >
            </el-time-select>
          </el-form-item>

          <!-- 分区信息列表 -->
          <el-card class="AreaList">
            <el-form :model="area" :rules="areaRules" :ref="`ruleForm${index}`">
              <el-row
                type="flex"
                justify="space-between"
                v-for="(area, index) in slotForm.areas"
                :label="index"
                :key="area.key"
              >
                <el-col span="10">
                  <el-form-item label="分区名称" prop="name">
                    <el-input
                      v-model="area.value"
                      style="width: 80px"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col span="10"
                  ><el-form-item label="座位数" prop="available">
                    <el-input-number
                      v-model="area.value"
                      controls-position="right"
                      @change="handleavailable"
                      style="width: 120px"
                      :min="1"
                    ></el-input-number> </el-form-item
                ></el-col>
                <el-col span="10"
                  ><el-form-item label="票价" prop="price">
                    <el-input-number
                      v-model="slotForm.areas.price"
                      controls-position="right"
                      @change="handlePrice"
                      style="width: 120px"
                      :min="0"
                    ></el-input-number> </el-form-item
                ></el-col>

                <el-col span="10"
                  ><el-button type="danger" @click.prevent="removeArea(area)"
                    >删除</el-button
                  ></el-col
                >
              </el-row>
            </el-form>
          </el-card>
          <el-form-item required label="添加分区" style="margin-top: 20px">
            <el-button
              @click="addAreas"
              type="primary"
              style="margin-left: 0px"
            >
              点击增分区
            </el-button>
          </el-form-item>
          <el-form-item label="上传座位图" required>
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
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSlot = false">取 消</el-button>
        <el-button type="primary" @click="submitSlot('slotForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      slotForm: {
        areas: [
          {
            name: "",
            available: 0,
            price: 0,
          },
        ],
        day: "",
        timeStart: "",
        timeEnd: "",
      },
      areaNum: 1,
      available: 1,
      addSlot: false,
      rules: {
        day: [{ required: true, trigger: "blur" }],
        timeStart: [{ required: true, trigger: "blur" }],
        timeEnd: [{ required: true, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
      },
      areaRules: {
        name: [{ required: true, trigger: "blur" }],
        available: [{ required: true, trigger: "blur" }],
        price: [{ required: true, trigger: "blur" }],
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
    handleSlotNum(slotNum) {
      console.log1(slotNum);
    },
    handleAreaNum(value) {
      console.log2(value);
    },
    handleavailable(value) {
      console.log3(value);
    },
    handlePrice(value) {
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
    removeArea(item) {
      var index = this.slotForm.areas.indexOf(item);
      if (index !== -1) {
        this.slotForm.areas.splice(index, 1);
      }
    },
    addAreas() {
      this.slotForm.areas.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.seat-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.seat-uploader-icon {
  font-size: 48px;
  color: #04152c67;
  background-color: rgba(175, 180, 201, 0.164);
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-input {
  width: 300px;
}
#submit {
  margin-left: 30px;
  margin-top: 30px;
}
.AreaList {
  margin-left: 20px !important;
  margin-right: 20px !important;
  margin-top: 30px !important;
  margin-bottom: 0px !important;
  background-color: #1d597c1f;
}

</style>
