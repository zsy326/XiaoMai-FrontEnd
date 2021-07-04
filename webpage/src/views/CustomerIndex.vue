<template>
  <el-container>
  <el-container>
    <el-header>
        <el-row :gutter="20" type="flex">
             <el-col :span="5">logo</el-col> <!--放logo-->

        <el-col :span="4">
      <el-menu 
      class="top-nav" 
      mode="horizontal"
      router
      :default-active="this.$route.path"
      >
  <el-menu-item index="/" >首页</el-menu-item>
  <el-menu-item index="/Category" >分类</el-menu-item>
</el-menu>

        </el-col>
        <el-col :span="6">
            <el-input
  placeholder="搜索演出、周边"
  v-model="input"
  clearable style="width:250px">
</el-input>
        </el-col>
<el-col :span="2">
    <el-button circle icon="el-icon-search"></el-button>
</el-col>
<el-col :span="5">
  <el-dropdown>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item > 个人中心</el-dropdown-item>
          <el-dropdown-item > 订单管理</el-dropdown-item>
          <el-dropdown-item > 会员管理</el-dropdown-item>
          <el-dropdown-item >密码修改</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
</el-col>
        </el-row>
    </el-header>
    <el-main>
         <router-view></router-view>
    </el-main>

    <el-footer>
        小麦网 Copyright 2021 DB Principle Project
    </el-footer>
  </el-container>
</el-container>
</template>

<script>
export default {
    data() {
      return {
        input: ''
      }
    },
  }
</script>

<style>
.el-header {
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .el-footer {
    line-height: 60px;
    font-size: 7px;
  }
  .el-main{
    height: 650px;
  }
</style>