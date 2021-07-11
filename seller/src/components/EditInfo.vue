<template>
  <div>
  

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
         <el-button icon="el-icon-edit" circle size="mini" @click="editName"
            ></el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="name" justify="space-around">
      <el-col :span="8"><div>账号密码</div></el-col>
      <el-col :span="12"><div>**********</div></el-col>
      <el-col :span="2"
        ><div class="edit">
         <el-button  icon="el-icon-edit" circle size="mini" @click="editPasswrd"
            ></el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="address" justify="space-around">
      <el-col :span="8"
        ><div>商家地址</div></el-col>
      <el-col :span="12"><div>{{ address }}</div></el-col>

      <el-col :span="2"
        ><div class="edit">
         <el-button icon="el-icon-edit" circle size="mini" @click="editAddress"
            ></el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="introduction" justify="space-around">
      <el-col :span="8"
        ><div>商家简介</div></el-col
      > <el-col :span="12"
        ><div>{{ introduction }}</div></el-col
      >

      <el-col :span="2"
        ><div class="edit">
         <el-button icon="el-icon-edit" circle size="mini" @click="editIntroduction"
            ></el-button
          >
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="logo" justify="space-around">
      <el-col :span="8"
        ><div>
          商家logo:
         </div
      ></el-col>
       <el-col :span="12"
        ><div>
          <img id="user-avatar" src="../assets/images/avatar.png" alt="" /></div
      ></el-col>

      <el-col :span="2"
        ><div class="edit">
          
          <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
        <el-button icon="el-icon-edit" circle size="mini" @click="editLogo"
            ></el-button
          >
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus goods-uploader-icon"></i> -->
        </el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "01001",
      name: "TJ影城",
      introduction:
        "是一家优秀的电影院，创办于1907年，口碑极佳，在大众点评上连续3年获得‘嘉定区最佳电影院’",
      address: "上海市嘉定区曹安公路4800号",
    };
  },
  methods: {
    editName() {
        this.$prompt('请输入新名称', '更改名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //检测是否为20字符以内
          inputErrorMessage: '名称格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您的新名称是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      editPasswrd() {
        this.$prompt('请输入新密码', '更改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //检测是否为20字符以内
          inputErrorMessage: '密码格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '密码更改成功 ' 
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      editAddress() {
        this.$prompt('请输入新地址', '更改地址', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //检测是否为20字符以内
          inputErrorMessage: '地址格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您的新地址是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      editIntroduction() {
        this.$prompt('请输入新简介', '更改简介', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          //检测是否为4000字符以内
          inputErrorMessage: '简介格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '您的新简介是: ' + value,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
     
    // handleEdit(index, row) {
    //   console.log(index, row);
    // },
  },
};
</script>


<style scoped>
.title {
  margin-bottom: 20px;
  font-size: 20px !important;
  padding: 10px;
  background-color: #7584a83d;
  font-weight: bold;
}
.el-row {
  padding: 15px;
  font-size: 18px;
  color: rgb(31, 41, 77);
  background-color: #a8afbe3d;
}
#user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.el-button{
    color:#fff;
    background-color: rgba(74, 83, 134, 0.445);
}
</style>