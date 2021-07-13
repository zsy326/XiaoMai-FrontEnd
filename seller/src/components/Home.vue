<template>
  <el-container class="home-container" height="100%">
    <el-aside class="aside-box" width="260px" height="100%">
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
          <router-link to="/goodsList">
            <el-menu-item index="2-2">周边列表</el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template class="first" slot="title"
            ><i class="el-icon-upload2"></i>我要发布</template
          >

          <router-link to="/releaseShow">
            <el-menu-item index="3-1">发布演出</el-menu-item>
          </router-link>

          <router-link to="/releaseSlot">
            <el-menu-item index="3-2">发布场次</el-menu-item>
          </router-link>

          <router-link to="/releaseGoods">
            <el-menu-item index="3-3">发布周边</el-menu-item>
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
        <el-col :span="5"
          ><div style="min-width:300px">
            <span id="ID">商家管理系统</span>
          </div></el-col
        >
        <el-col :span="26"
          ><div>
            <div id="user-name">欢迎您：TJ影城 ID:01001</div>
          </div></el-col
        >

        <el-col :span="1">
          <img id="user-avatar" src="../assets/images/avatar.png" alt="" />
        </el-col>
      </el-header>
      <el-container class="main">
        <div class="router">
          <router-view> </router-view>
        </div>
        <el-footer>
          <div style="min-width:1200px">
          <span id="p1" 
            >小麦网简体中文版提供的内容仅用于课程设计作业，不保证数据的真实性。通过观看本站内容随之而来的风险与本站无关。</span
          >
          <a
            href="https://github.com/SchweitzerGAO/XiaoMai-FrontEnd"
            class="github"
            >我们的github地址</a
          >
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
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
  background-color: #1d597c;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
img {
  width: 260px;
  height: 60px;
}

#ID {
  color: rgb(255, 255, 255);
  font-weight: bold;
  font-size: 23px;
  margin-left: 20px;
}
#user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 30px;
}
#user-name {
  color: rgb(255, 255, 255);
  font-weight: 2px;
  font-size: 20px;
}

.aside-box {
  background-color: #ffffff;
  height: 100vh;
}
.menu-box {
  background-color: #fdfdfd;
}
.el-menu-item {
  font-size: 15px;
  border-bottom: none !important;
}

.el-menu-item.is-active {
  background-color: #1d597ca2 !important;
  color: #fff;
  border-bottom: none;
}

.main {
  /* background-color: #6e82b93d; */
  background-color: #fff;
  position: relative;
  width: 100%;
  padding-bottom: 20px;
  /* box-sizing: border-box; */
}

.el-footer {
  width: 100%;
  position: absolute;
  bottom: 0px;
  background-color: #1d597ca2;
  margin-left: 30px;
}
.router {
  margin-bottom: 50px;
}
#p1 {
  margin-top: 20px;
  color: #fff;
  font-size: 16px;
  margin-left: 25%;
}
.github {
  margin-top: 15px;
  color: rgb(31, 70, 94);
  font-size: 15px;
  margin-left: 45%;
}
</style>