<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/outline' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>历史通知</el-breadcrumb-item>
      <el-breadcrumb-item>通知列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" shadow="always">
      <el-button class="display-all" @click="clearFilter"
        >显示所有通知(取消筛选)</el-button
      >

      <el-button class="display-all" @click="successVisible = true"
        >查看获得的消息列表</el-button
      >
      <el-table ref="filterTable" :data="notices"   stripe  height="520" style="width: 100%">
        <el-table-column
          prop="time"  label="发布日期"
          sortable
          width="300"
          column-key="time"
        >
        </el-table-column>

        <el-table-column prop="title" label="标题" width="700">
        </el-table-column>


 <el-table-column
      prop="tag"
      label="阅读状态"
      width="100"
      :filters="[{ text: '已读', value: '已读' }, { text: '未读', value: '未读' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template >
        <el-tag
          :type="tag === '未读' ? 'danger' : 'success'"
          disable-transitions>{{tag}}</el-tag>
      </template>
    </el-table-column>
          </el-table>
        
      
    </el-card>

    <el-dialog title="读取的消息" :visible.sync="successVisible" width="500px">
      <div>
        消息列表如下：
        <el-card>
            {{ this.tag }}
        </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      notices: [{
        }
      ],
      tag:[],
      hasNotice: false,
      successVisible: false,
    };
  },
  created: function () {
        this.getAllNotices();
      },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
  
   filterTag(value, row) {
        return row.tag === value;
      },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    async getAllNotices() {
      const url = "/SellerNotice";
      await axios
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            this.notices = response.data.value;
            // console.log(response.data.value)
            this.$message.success("查找成功！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.notices.length !== 0) {
        this.hasNotice = true;
      }
      let k=this.notices.length
      while(k>=0){
        this.tag[k]='未读';
        k--;
      }
    },
  },
};
</script>


<style scoped>
.el-card {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}

.el-button {
  margin-left: 10px;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>