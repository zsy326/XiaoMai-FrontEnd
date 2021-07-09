<template>
  <div id="show">
      <span>
        {{this.showInfo}}
      </span>
      <span>
        {{this.goodsInfo}}
      </span>
  </div>
</template>

<script>
import axios from 'axios'
export default
{
  name:"Search",
  data()
  {
    return{
      showInfo:[],
      goodsInfo:[]
    }
  },
  created:function()
  {
    this.Search()
  },
  beforeRouteUpdate(to, from, next) {
    console.info("==当前路由id==" + this.$route.params.id);
    if (this.$route.params.id) {
      console.info("加载页面数据");
    }
    next();
},
  methods:
  {
    async Search()
    {
      const url = '/Search/'+this.$route.params.id
      await axios.get(url).then(
        (response) =>
        {
          if(response.status == 200)
          {
            this.showInfo = response.data.value.shows
            this.goodsInfo = response.data.value.goods
            console.log(response.data.value)
            console.log(this.showInfo[0].avgRate)
          }
          else if(response.status == 404)
          {
            console.log("无匹配结果")
          }
        }
      )
      .catch(
        (err)=>
        {
          console.log(err)
        }
      )
    }
  }
}

</script>

<style>

</style>