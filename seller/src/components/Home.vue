<template>
  <div class="home-container">
    <el-container class=biggest-box>
  <el-header class=header-box>
 <div class=header-div>
        <img class=logo src="../assets/images/logo.jpg" alt="" />
        <span>商家管理系统</span>
        <span id="ID">Seller Management System</span>
      </div>
      <div>
        <div id="user-name">欢迎您：TJ影城   ID:01001</div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link d-flex">
            <img id="user-avatar" src="../assets/images/avatar.png" alt="" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </el-dropdown>
      </div>
  </el-header>

  <el-container height="100%">
    <el-aside class=aside-box width="280px" height="900px">
       <el-menu class=menu-box >
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
        <template slot="title"><i class="el-icon-upload2"></i>我要发布</template>

         <router-link to="/releaseSlot">
            <el-menu-item index="3-1">发布演出</el-menu-item>
          </router-link>
      
          <router-link to="/releaseGoods">
            <el-menu-item index="3-2">发布周边</el-menu-item>
          </router-link>

      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message-solid"></i>历史通知</template>  
          <router-link to="/notification">
             <el-menu-item index="4-1">通知列表</el-menu-item>
          </router-link>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>编辑资料</template>
          
           <router-link to="/editInfo">
            <el-menu-item index="5-1">填写资料</el-menu-item>
          </router-link>
          
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-s-order"></i>查看订单</template>
          <router-link to="/orderList">
            <el-menu-item index="6-1">订单列表</el-menu-item>
          </router-link>
            
            
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-container>
      <el-main>

        <router-view>
    </router-view>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
export default {};
</script>


<style Lang='less' scoped>

.home-container{
  height:100%
}
.el-header {
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 .header-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(252, 252, 252);
    font-size: 20px;
    font-weight: bold;
 }
 img {
      width: 280px;
      height: 66px;
      margin-right: 45px;
    }

  #ID {
      font-weight: normal;
      font-size: 16px;
      margin-left: 0px;
    }

.el-main {
  position: relative;
  background-color: #ffffff;
}


.header-box{
  background-color: rgb(73, 88, 119);
}

.aside-box{
  background-color: rgb(173, 169, 169);
}
#user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 0;
}
#user-name{
  font-weight: normal;
  margin-right: 55px;
  font-size: 20px;
  color: #ffffff;
}
</style>