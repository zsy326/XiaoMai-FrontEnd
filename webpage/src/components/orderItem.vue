<template>
  <!--这个组件高度调整后会非常奇怪，下拉菜单会和上方内容重叠，所以请通过修改.body和图片大小调节此元素大小-->
  <el-card id="box-card" body-style="{ padding-bottom: '0px' }" shadow="hover"><!--我实在不知道怎么设置了,反正这个不行-->
    <div slot="header" class="clearfix">
      <span class="text" style="float: left">{{type}}<el-divider direction="vertical"></el-divider>订单号：{{id}}</span>
    </div>
    <div class="block body">
      <span>
        <el-image :src="photo_src" class="photo inline" fit="fill">
          <div slot="placeholder" class="image-slot">
           加载中<span class="dot">...</span>
         </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </span>
      <span>
        <a :href="href" class="text block" id="item_title">{{name}}</a>
        <div style="line-height: 1.9;">
          <div class="text" style="color: #909399;">
            <div style="text-align: left">
              <i class="el-icon-time"></i>场次：{{time}}
            </div>
            <div class="text">
              <i class="el-icon-location-information"></i>地点：{{place}}
            </div>
          </div>
          <div style="float: right;text-align: right" >
            <div>
              {{status}}
              <el-divider direction="vertical" v-if="not_comment||not_pay"></el-divider>
              <a class="text" v-if="not_comment" href="">去评价</a>
              <a class="text" v-if="not_pay" href="">去支付</a>
              <a class="text" v-if="commented" href="">有问题？</a>
            </div>
            <div>{{'×'+item_num+'  '+'￥'+price}}</div>
          </div>
        </div>
      </span>
    </div>
    <!--下面为详情-->
    <div>
      <el-collapse class="block">
        <el-collapse-item>
          <template slot="title" >
            <span style="float: right;font-size: 16px">订单详情</span>
          </template>
          <!--这里偷了懒，建议用表格-->
          <div class="text">订单时间:</div>
          <div class="text">观看人:</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-card>
</template>

<script>

export default {
  name: "orderItem",
  props:{//更改props请使用智能更改
    type:String,
    id:Number,
    name:String,
    photo_src:String,//图片超链接，base64的话请更改el-image的:src为其他值
    time:Date,
    place:String,
    price:Number,
    status:String,
    item_num:Number
  },
  computed:{
    not_comment:function () {
      return this.status==="已观看"
    },
    not_pay:function () {
      return this.status==="未支付"
    },
    href:function (){//商品信息的超链接
      return ""
    },
    commented:function () {
      return this.status==="已评价"
    }
  }
}

</script>

<style scoped>
#item_title{
  display: block;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
}

.body{/*更改图片大小请一并更改.body的行高*/
  height: 170px;
}

.text {
  font-size: 15px;
  text-align: left;
}

.block{
  display: block;
}

.inline{
  display: inline;

}

.clearfix{
  color: #909399;
  object-fit: fill;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

#box-card {

}
/*更改图片大小请一并更改.body的行高*/
.photo{
  float: left;
  display: inline;
  height: 148px;
  width: 111px;
  margin-right: 15px;
}

</style>