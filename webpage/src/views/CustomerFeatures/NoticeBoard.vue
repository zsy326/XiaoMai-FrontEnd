<template>
  <div id="allNotice">
    <h3 id="title">
      通知列表
    </h3>
      <div v-if="hasNotice">
        {{this.notices}}
      </div>
      <div v-else>
        暂无通知
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data()
  {
    return{
      notices:[],
      hasNotice:false
    }
  },
  created:function()
  {
    this.getAllNotices()
  },
  methods:
  {
     async getAllNotices()
    {
      const url = '/GeneralCustomerNotice'
      await axios.get(url).then(
        (response) =>
        {
          if(response.status === 200)
          {
            this.notices = response.data.value
            // console.log(response.data.value)
          }
        }
      ).catch(
        (err) => 
        {
          console.log(err)
        }

      )
      if(this.notices.length !== 0)
      {
        this.hasNotice = true
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