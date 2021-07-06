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
        <el-col :span="5">
            <el-input
  placeholder="搜索演出、周边"
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
          <el-dropdown-item @click.native="gotoLink('/CustomerInfoCenter')">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/Orders')"> 订单管理</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/VIP')"> 会员管理</el-dropdown-item>
          <el-dropdown-item @click.native="gotoLink('/ResetPassword')">密码修改</el-dropdown-item>
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
import UserRegLogin from "../CusRegLogin/userRegLogin";
import axios from 'axios'
export default {
  components: {UserRegLogin},
  data() {
      return {
        input: ''
      }
    },
  computed:{
    isLogin:function(){
      return false;
      // 刷新页面更新这个值，或者用其他属性或者函数代替
    }
  },
    methods:
    {
      gotoLink(r)
      {
        this.$router.replace(r)
      },
      handleSearch()
      {
        if(this.input === '')
        {
          this.$message.error("搜索条件不能为空！");
        }
        else
        {
          console.log(this.input)
          this.Search()
          if(this.$route.path !="/SearchList")
          {
            this.gotoLink("/SearchList")
          }
          
        }
      },
      Search()
    {
      const url = '/api/Search/'+this.input
      axios.get(url).then(
        function(response)
        {
          if(response.status == 200)
          {
            console.log(response.data)
          }
          else if(response.status == 404)
          {
            console.log("无匹配结果")
          }
        }
      )
      .catch(
        function(err)
        {
          console.log(err)
        }
      )
    }
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
    line-height: 60px;
    font-size: 7px;
  }
  .el-main{
    height: 650px;
  }
</style>