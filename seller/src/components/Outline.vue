<template>
  <el-row>
    <el-col :span="20"><div class="grid-content bg-purple-dark">您已发布场次</div></el-col>
    <br />
    <el-col :span="20"><div class="grid-content bg-purple-dark">您的总收入</div></el-col>
    <br />
    <el-col :span="20"><div class="grid-content bg-purple-dark">您的入驻天数</div></el-col>
    <br />
    <el-col :span="20"><div class="grid-content bg-purple-dark">观看演出总人数</div></el-col>
  </el-row>
</template>

<script>
export default {};
</script>


<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #26c5b8;
}
.bg-purple-light {
  background: #8cbb1f;
}
.grid-content {
  margin-top: 3px;
  padding: 20px;
  border-radius: 4px;
  min-height: 6px;
}
</style>