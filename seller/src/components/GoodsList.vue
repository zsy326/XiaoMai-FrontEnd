<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>已发布</el-breadcrumb-item>
      <el-breadcrumb-item>周边列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图 -->
    <el-card class="box-card">
      <!-- 演出列表区域 -->
      <el-table :data="showList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="周边ID" prop="goodsid"></el-table-column>
        <el-table-column label="周边名称" prop="goodsname"></el-table-column>
        <el-table-column label="价格" prop="goodsprice"></el-table-column>
        <el-table-column label="库存" prop="goodsleft"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="删除周边"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeGoodsById(scope.row.id)"
              ></el-button>
              </el-tooltip>
               <el-tooltip effect="dark" content="修改周边" placement="top" :enterable="false">
             <el-button type="warning" icon="el-icon-edit" @click="showEditDialog(scope.row.goodsid)"></el-button>
              <el-button>上边</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="2"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="0"
      >
      </el-pagination>
    </el-card>

<el-dialog
  title="修改周边"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed">

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="周边ID">
    <el-input v-model="editForm.goodsid" disabled></el-input>
  </el-form-item>
</el-form>

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="周边名称">
    <el-input v-model="editForm.goodsname" disabled></el-input>
  </el-form-item>
  </el-form>

  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="周边价格" prop="goodsprice">
    <el-input v-model="editForm.goodsprice"></el-input>
  </el-form-item>
  </el-form>

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="周边库存" prop="goodsleft">
    <el-input v-model="editForm.goodsleft"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editGoodsInfo">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  date() {
    return {
      queryInfo: {
        querry: "",
        pagenum: 1,
        pagesize: 2,
      },
      goodslist: [],
      total: 0,

      //修改表单验证规则对象
      editFormRules:{
          goodsprice:[
              {
                  required:true,
                  message:"请输入价格",
                  trigger:'blue'
              },
              {
                  validator:checkPrice,
                  trigger:'blur'
              }
          ],
          showtime:[
              {
                  required:true,
                  message:"请输入库存",
                  trigger:'blue'
              },
              {
                  validator:checkLeft,
                  trigger:'blur'
              }
          ]
      }
    };
  },
  create() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get("Goods", {
        params: this.queryInfo,
      });

      if (res.meta.status !== 200) return this.$message.error("获取数据失败");

      this.goodslist = res.data.Goods;
      this.total = res.data.total;

      console.log(res);
    },

    //监听pagesize
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },

    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },

    //根据id删除对应周边记录
    async removeGoodsById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该记录, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消");
      } else {
        return this.$message.info("删除成功");
      }
      const { data: res } = await this.$http.delete("goods/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除记录失败！");
      }
      this.$message.success("删除记录成功！");
      this.getGoodsList();
    },

      async showEditDialog(goodsid) {
      const { data: res } = await this.$http.get("goods/" + goodsid);
      if (res.meta.status != 200) {
        return this.$message.error("查询周边信息失败！");
      }
      this.editForm = res.data;

      this.editDialogVisible = true;
    },

    editDialogClosed(){
        this.$refs.editFormRef.resetFilelds()
    },

    //表单预验证
    editGoodsInfo(){
        this.$refs.editFormRef.validate(async valid=>{
            if(!valid)return
         const {data:res} = await this.$http.put('shows/'+this.editForm.goodsid,{
                goodsprice:this.editForm.goodsprice,
                goodsleft:this.editForm.goodsleft
            })
            if(res.meta.status !==200)
            return this.$message.error('更新周边信息失败！')

            this.editDialogVisible=false
            this.getGoodsList()
            this.$message.success('更新周边信息成功！')
            })
    }
  },
};
</script>


<style scoped>
</style>