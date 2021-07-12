<template>
<div id="VIPInfo">
    <h3 id="title">
        我的会员
    </h3>
    <div v-if="isVip">
        <span>
            积分：{{this.point}}
        </span>
        <span>
            等级：{{this.level}}
        </span>
        <span>
            折扣：{{this.discount}}
        </span>
    </div>
    <div v-else>
        <div>
            您还不是VIP
        </div>
        <br/>
        <div>
            <el-button type="primary" @click="newVip()">成为VIP</el-button>
        </div>
        
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data()
    {
        return{
            point:-1,
            level:-1,
            discount:-1,
            isVip:false

        }
    },
    created:function()
    {
    if(sessionStorage.getItem(this.$route.params.id.toString())&& sessionStorage.getItem('userType') == 'C')
    {
      this.getVip()
    }
    else{
      this.$message.error('无权访问！')
      this.$router.push('/')
    }
        this.getVip()
    },
    methods:
    {
        async getVip()
        {
            const url = '/VIPInfo/'+this.$route.params.id
            await axios.get(url).then(
                (response) => 
                {
                    if(response.status === 200)
                    {
                        this.isVip = true
                        this.point = response.data.value.point
                        this.level = response.data.value.level
                        this.discount = response.data.value.discount
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
        },
        async newVip()
        {
            const url = '/Vip/'+this.$route.params.id
            await axios.post(url).then(
                (response) =>
                {
                    if(response.status === 200)
                    {
                        this.$message.success("VIP注册成功") // 本来要交钱，简单来就不搞了
                    }
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            )
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