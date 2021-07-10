<template>
  <div id="result">
      <div v-if="this.hasShow">
        演出
        {{this.showInfo}}
      </div>
      <div v-if="this.hasGoods">
        周边
        {{this.goodsInfo}}
      </div>
      <div v-if="!this.hasRes">
        无匹配结果
      </div>
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
      goodsInfo:[],
      hasShow:false,
      hasGoods:false,
      hasRes:false,
    }
  },
  created:function()
  {
    this.Search()
  },
  methods:
  {
    async Search()
    {
      const url = '/Search/'+this.$route.params.input
      await axios.get(url).then(
        (response) =>
        {
          if(response.status === 200)
          {
            this.showInfo = response.data.value.shows
            this.goodsInfo = response.data.value.goods
            console.log("有结果")
          }
        }
      )
      .catch(
        (err)=>
        {
          console.log(err)
        }
      )
      if(this.showInfo.length !== 0 )
      {
        this.hasRes = true
        this.hasShow = true
      }
      if(this.goodsInfo.length !== 0)
      {
        this.hasRes = true
        this.hasGoods = true
      }
    }
  }
}

</script>

<style>

</style>