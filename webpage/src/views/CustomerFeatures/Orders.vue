<template>
  <div id="allOrders">
    <h3 id="title">
      我的订单
    </h3>
      <div v-if="hasShows">
        演出订单
        {{this.showOrders}}
      </div>
      <div v-if="hasGoods">
        周边订单
        {{this.goodOrders}}
      </div>
      <div v-if="!hasRes">
        暂无订单
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data()
  {
    return{
      goodOrders:[],
      showOrders:[],
      hasGoods:false,
      hasShows:false,
      hasRes:false,

    }
  },
  created:function()
  {
    this.getAllOrders()
  },
  methods:
  {
    async getAllOrders()
    {
      const url = '/AllOrder/'+this.$route.params.id
      await axios.get(url).then(
        (response) =>
        {
          if(response.status === 200)
          {
            this.goodOrders = response.data.value.goodOrders
            this.showOrders = response.data.value.showOrders
          }
        }
      ).catch(
        (err) => 
        {
          console.log(err)
        }
      )
      if(this.goodOrders.length !== 0)
      {
        this.hasGoods = true
        this.hasRes = true
      }
      if(this.showOrders.length !== 0)
      {
        this.hasShows = true
        this.hasRes = true
      }
    }
  }


}
</script>

<style scoped>
#title
{
  color: #409eff;
}
</style>