<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>查看订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 视图 -->
    <el-card class="box-card">
      <!-- 演出列表区域 -->
      <el-table :data="showList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单ID" prop="orderid"></el-table-column>
        <el-table-column label="顾客ID" prop="customerid"></el-table-column>
        <el-table-column label="演出名称" prop="showname"></el-table-column>
        <el-table-column label="场次" prop="changci"></el-table-column>
        <el-table-column label="分区" prop="fenqu"></el-table-column>
        <el-table-column label="座位" prop="zuowei"></el-table-column>
        <el-table-column label="订单日期" prop="orderdate"></el-table-column>
        <el-table-column label="订单时间" prop="ordertime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              content="删除该记录"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeOrderById(scope.row.id)"
              ></el-button>
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
      orderlist: [],
      total: 0,
    };
  },
  create() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get("Orders", {
        params: this.queryInfo,
      });

      if (res.meta.status !== 200) return this.$message.error("获取数据失败");

      this.orderlist = res.data.Orders;
      this.total = res.data.total;

      console.log(res);
    },

    //监听pagesize
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },

    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },

    //根据id删除对应演出记录
    async removeOrderById(id) {
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
      const { data: res } = await this.$http.delete("orders/" + id);
      if (res.meta.status !== 200) {
        return this.$message.error("删除记录失败！");
      }
      this.$message.success("删除记录成功！");
      this.getOrderList();
    },
  },
};
</script>


<style scoped>
</style>