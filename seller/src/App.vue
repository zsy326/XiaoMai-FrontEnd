<template>
  <div>
    <el-container style="border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(235, 241, 246)">
    <el-menu :default-openeds="['1']">
       <!--商家头像-->
      <div id="avatar">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <div>
        <h5>商家ID:123456</h5>
        <h5>商家名称:开心麻花</h5>
      </div>

      <!--侧边导航栏-->
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-data"></i>首页</template>
          <el-menu-item index="1-1">概要信息</el-menu-item>
          <el-menu-item index="1-2">销售情况</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>已发布</template>
          <el-menu-item index="2-1">演出列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-upload2"></i>我要发布</template>
          <el-menu-item index="3-1">发布演出</el-menu-item>
          <el-menu-item index="3-2">发布周边</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message-solid"></i>历史通知</template>
          <el-menu-item index="4-1">通知列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>编辑资料</template>
          <el-menu-item index="5-1">填写资料</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-s-order"></i>查看订单</template>
          <el-menu-item index="6-1">编辑界面</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-container>

  <release-session msg="Release Here"/>

  </el-container>
  </el-container>
    </div>
</template>


<script>
import ReleaseSession from './components/ReleaseSession.vue'

export default {
  name: 'App',
  components: {
    ReleaseSession
  },
}

        
</script>

<style>
#avatar{
  height: 60px;
  width: 120px;
  position: relative;
				top: 5px;
				left: 65px;
}
h5 {
  text-align: center;
}
</style>
