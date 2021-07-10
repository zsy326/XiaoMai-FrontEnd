<template>
  <div class="home-container">
    <el-container class="biggest-box" height="100%">
      <el-aside class="aside-box" width="280px" height="900px">
        <div class="logo">
          <img src="../assets/images/logo.jpg" alt="" />
        </div>

        <el-menu class="menu-box">
          <!--侧边导航栏-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-data"></i>首页</template>
            <router-link to="/outline">
              <el-menu-item index="1-1">概要信息</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>已发布</template>

            <router-link to="/slotList">
              <el-menu-item index="2-1">演出列表</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-upload2"></i>我要发布</template
            >

            <router-link to="/releaseSlot">
              <el-menu-item index="3-1">发布演出</el-menu-item>
            </router-link>

            <router-link to="/releaseGoods">
              <el-menu-item index="3-2">发布周边</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-message-solid"></i>历史通知</template
            >
            <router-link to="/notification">
              <el-menu-item index="4-1">通知列表</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-setting"></i>编辑资料</template
            >

            <router-link to="/editInfo">
              <el-menu-item index="5-1">填写资料</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-s-order"></i>查看订单</template
            >
            <router-link to="/orderList">
              <el-menu-item index="6-1">订单列表</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- <el-header> -->
          <el-header type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div>
                <span id="ID">商家管理系统</span>
              </div></el-col
            >
            <el-col :span="26"
              ><div>
                <div id="user-name">欢迎您：TJ影城 ID:01001</div>
                </div
            ></el-col>

             <el-col :span="1"
>
                <img
                      id="user-avatar"
                      src="../assets/images/avatar.png"
                      alt="">
            </el-col>
          </el-header>
          
        <router-view> </router-view>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
export default {};
</script>


<style Lang='less' scoped>
.home-container {
  height: 100%;
}

.el-header {
  height: 20px;
  background-color: #df5f39d0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
img {
  width: 280px;
  height: 70px;
  /* margin-right: 45px; */
}

#ID {
  color:rgb(255, 255, 255);
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
}
#user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 0;
}
#user-name {
  color:rgb(255, 255, 255);
  font-weight: bold;
  font-size: 20px;
  margin-left: 0px;
}

.el-main {
  position: relative;
  background-color: #b5b7c0;
}

.aside-box {
  background-color: rgb(248, 248, 248);
}

</style>