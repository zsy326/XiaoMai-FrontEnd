<template>
    <div>
        <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>已发布</el-breadcrumb-item>
  <el-breadcrumb-item>演出列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 视图 -->
<el-card class="box-card">
  
  <!-- 演出列表区域 -->
  <el-table :data="showList" border stripe>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="演出ID" prop="showid"></el-table-column>
    <el-table-column label="演出名称" prop="showname"></el-table-column>
    <el-table-column label="日期" prop="showdate"></el-table-column>
    <el-table-column label="时间" prop="showtime"></el-table-column>
    <el-table-column label="上座率" prop="showaudience"></el-table-column>
    <el-table-column label="状态" prop="showstate"></el-table-column>
    <template slot-scope="scope">
        <el-switch v-model="scope.row.showstate" @change="showStateChanged(scope.row)">
        </el-switch>
    </template>
     <el-table-column label="操作">
         <template slot-scope="scope">
           <el-tooltip effect="dark" content="删除演出信息" placement="top" :enterable="false">
             <el-button type="danger" icon="el-icon-delete" @click="removeShowById(scope.row.id)"></el-button>
           </el-tooltip>
            <el-tooltip effect="dark" content="修改演出" placement="top" :enterable="false">
             <el-button type="warning" icon="el-icon-edit" @click="showEditDialog(scope.row.showid)"></el-button>
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
      :total="0">
    </el-pagination>

</el-card>

<el-dialog
  title="修改演出"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed">

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="演出ID">
    <el-input v-model="editForm.showid" disabled></el-input>
  </el-form-item>
   </el-form>

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="演出名称">
    <el-input v-model="editForm.showname" disabled></el-input>
  </el-form-item>
   </el-form>

  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="演出日期" prop="showdate">
    <el-input v-model="editForm.showdate"></el-input>
  </el-form-item>
  </el-form>

<el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
  <el-form-item label="演出时间" prop="showtime">
    <el-input v-model="editForm.showtime"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editShowInfo">确 定</el-button>
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
      showlist: [],
      total: 0,
      editDialogVisible: false,
      //查询到的演出信息对象
      editForm: {},
    //修改表单验证规则对象
      editFormRules:{
          showdate:[
              {
                  required:true,
                  message:"请输入目标日期",
                  trigger:'blue'
              },
              {
                  validator:checkDate,
                  trigger:'blur'
              }
          ],
          showtime:[
              {
                  required:true,
                  message:"请输入目标时间",
                  trigger:'blue'
              },
              {
                  validator:checkTime,
                  trigger:'blur'
              }
          ]
      }
    };
  },
  create() {
    this.getShowList();
  },
  methods: {
    async getShowList() {
      const { data: res } = await this.$http.get("Show", {
        params: this.queryInfo,
      });

      if (res.meta.status !== 200) return this.$message.error("获取数据失败");

      this.showlist = res.data.Shows;
      this.total = res.data.total;

      console.log(res);
    },

    //监听pagesize
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getShowList();
    },

    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getShowList();
    },

    async showStateChanged(showInfo) {
      const { data: res } = this.$http.put(
        `show/${showInfo.id}/state/${showInfo.showstate}`
      );
      if (res.meta.status != 200) {
        showInfo.showstate = !showInfo.showstate;
        return this.$message.error("上架/下架更新失败！");
      }
      this.$message.success("上架/下架更新成功！");
    },

    //根据id删除对应演出记录
    async removeShowById(id) {
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
      const { data: res } = await this.$http.delete("shows/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除记录失败！");
      }
      this.$message.success("删除记录成功！");
      this.getShowList();
    },

    async showEditDialog(showid) {
      const { data: res } = await this.$http.get("shows/" + showid);
      if (res.meta.status != 200) {
        return this.$message.error("查询演出信息失败！");
      }
      this.editForm = res.data;

      this.editDialogVisible = true;
    },

    editDialogClosed(){
        this.$refs.editFormRef.resetFilelds()
    },

    //表单预验证
    editShowInfo(){
        this.$refs.editFormRef.validate(async valid=>{
            if(!valid)return
         const {data:res} = await this.$http.put('shows/'+this.editForm.showid,{
                showdate:this.editForm.showdate,
                showtime:this.editForm.showtime
            })
            if(res.meta.status !==200)
            return this.$message.error('更新用户信息失败！')

            this.editDialogVisible=false
            this.getShowList()
            this.$message.success('更新用户信息成功！')
            })
    }
  }
};
</script>


<style scoped>
</style>