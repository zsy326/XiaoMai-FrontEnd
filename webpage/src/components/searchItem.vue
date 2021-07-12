<template>
  <el-card>
    <div id="body">
      <span id="photo">
        <a :href="href">
          <el-image :src="photo_src"  fit="fill" >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
             </div>
          </el-image>
        </a>

    </span>
      <span>
        <a :href="href"  id="title">{{name}}</a>
        <div style="line-height: 1.9;">
            <div class="text" style="color: #909399;margin-bottom: 50px"><!--改图片高度这个也要改-->
              <div style="text-align: left">
                <i class="el-icon-time icon"></i>场次：{{time}}
              </div>
              <div class="text">
                <i class="el-icon-location-information icon"></i>地点：{{place}}
              </div>
            </div>
          <span id="price"><i  class="el-icon-money"></i>￥{{price}}起</span><span class="text" style="font-size: 18px;float: left">{{status}}</span><!--起可能没有-->
        </div>
      </span>
    </div>

  </el-card>
</template>

<script>
export default {
  name: "searchItem",
  props:{
    type:String,
    id:Number,
    name:String,
    photo_src:String,//图片超链接，base64的话请更改el-image的:src为其他值
    time:Date,
    place:String,
    price:Number,
    status:String
  },
  computed:{
    href:function () {
      return ""
    }
  }
}
</script>

<style scoped>
#photo{
  height: 168px;
  width: 126px;
  margin-right: 12px;
  float: left;
  margin-bottom: 20px;
}

#title{
  display: block;
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: black;
  margin-bottom: 12px;
  text-align: left;
}

#price{
  color: #F56C6C;
  font-size: 18px;
  font-weight: bold;
  margin-right: 30px;
  float: left;
}

.text{
  font-size: 15px;
  line-height: 1.9;
  text-align: left;
}
.icon{
  color: #3096ff;
}
</style>