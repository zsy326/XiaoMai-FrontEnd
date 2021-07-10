<template>
  <el-container>
  <el-container>
    <el-header>
        <el-row :gutter="20" type="flex">
             <el-col :span="5">
               <img alt="logo" src="../../../public/logo.png" width="250px"/>
               </el-col>

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
        <el-col :span="5">
            <el-input
  placeholder="搜索演出、周边..."
  v-model="input"
  clearable style="width:250px">
</el-input>
        </el-col>
<el-col :span="1">
    <el-button circle icon="el-icon-search" @click="handleSearch()"></el-button>
</el-col>
<el-col :span="5">
  <el-dropdown v-if="isLogin">
        <el-avatar icon="el-icon-user-solid"></el-avatar> <!--以后要换成用户头像-->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="gotoLink('/CustomerInfoCenter/'+id.toString())">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/Orders/'+id.toString())"> 订单管理</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/VIP/'+id.toString())"> 会员管理</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/ResetPassword/'+id.toString())">密码修改</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/NoticeBoard')">查看通知</el-dropdown-item>
          <el-dropdown-item id="logout">退出</el-dropdown-item>
          <el-dropdown-item id="destroy">注销账户</el-dropdown-item>
        </el-dropdown-menu>
  </el-dropdown>
  <user-reg-login v-else></user-reg-login>
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
import UserRegLogin from "../CusRegLogin/userRegLogin"
export default {
name:"CustomerIndex",
  components: {UserRegLogin},
  data() {
      return {
          input: '',
          id:1,
        
      }
    },
  computed:{
    isLogin:function(){
      return true;
      // 刷新页面更新这个值，或者用其他属性或者函数代替
    }
  },
    methods:
    {
      gotoLink(r)
      {
        this.$router.push(r)
      },
      handleSearch()
      {
        if(this.input === '')
        {
          this.$message.error("搜索条件不能为空！");
        }
        else
        {
            this.gotoLink("/SearchList/"+this.input.toString())
        }
      },
    }
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
    text-align: center;
    line-height: 60px;
    font-size: 7px;
  }
  .el-main{
    height: 650px;
  }
  #logout{
    color:red;
  }
  #destroy{
    color:red;
  }
</style>