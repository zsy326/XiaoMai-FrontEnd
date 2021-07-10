<template>
  <div id="allShows">
  <div v-if="this.hasShow">
    {{this.shows}}
  </div>
  <div v-else>
    暂无演出
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default
{
  data()
  {
    return{
      shows:[],
      hasShow:false
    }
  },
  created:function()
  {
    this.getAllShows()
  },
  methods:
  {
    async getAllShows()
    {
      const url = '/GeneralShows'
      await axios.get(url).then(
        (response) =>
        {
          if(response.status === 200)
          {
            this.shows = response.data.value
          }
        }
      ).catch(
        (err) =>
        {
          console.log(err)
        }
      )
      if(this.shows.length !== 0)
      {
        this.hasShow = true
      }
    }
  },
}
</script>

<style>

</style>