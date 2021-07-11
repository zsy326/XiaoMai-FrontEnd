<template>
    <div>
  <el-button class="display-all" @click="clearFilter">显示所有通知(取消筛选)</el-button>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="发布日期"
      sortable
      width="300"
      column-key="date"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      width="700">
    </el-table-column>
    
    <el-table-column
      prop="tag"
      label="阅读状态"
      width="300"
      :filters="[{ text: '已读', value: '已读' }, { text: '未读', value: '未读' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '已读' ? 'success' : 'danger'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
export default {
 data() {
      return {
        tableData: [{
          date: '2021-04-29',
          name: '关于通知所有商家的“劳动节优惠方案”',
          tag: '已读'
        }, {
          date: '2021-05-05',
          name: '关于对所有商家的劳动节活动补贴的通知',
          tag: '已读'
        }, {
          date: '2021-07-01',
          name: '关于纪念“建党100周年”的七月电影排片规则',
          tag: '未读'
        }, {
          date: '2021-07-08',
          name: '关于盗摄现象频繁出现的解决对策建议',
          tag: '已读'
        },{
          date: '2021-07-08',
          name: '关于平台七月份补贴发放的通知',
          tag: '未读'
        },{
          date: '2021-07-12',
          name: '关于通报不合规定适用平台的商家失信名单',
          tag: '未读'
        }]
    }
 },
  methods: {
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
};

</script>


<style scoped>
.el-button{
    margin-left: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>