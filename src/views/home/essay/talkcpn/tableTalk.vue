<template>
  <div class="new-talk-send">
    <el-table :data="talkData" style="width: 100%" border>
      <el-table-column label="发布者" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.userInfo.userName
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="发布时间" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.publishTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="相关图片" width="80">
        <template slot-scope="scope">
          <i
            style="margin: 0; padding: 0; line-height: 16px"
            class="el-icon-picture"
          ></i>
          <p
            style="
              margin: 0;
              padding: 0;
              line-height: 16px;
              margin-block-start: 0;
            "
          >
            {{ scope.row.imgArr.length }}
          </p>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRead(scope.$index, scope.row)"
            type="primary"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "talktableshow",
  props: {
    talkData: Array,
  },
 
  methods: {
    handleRead(idx, row) {
      //   console.log(idx, row);
      this.$emit("onread", idx, row);
    },
    handleDelete(idx, row) {
      // console.log(idx, row);
      this.$emit("ondelete",idx,row);
    },
  },
};
</script>

<style>
.el-table th,
.el-table td {
  text-align: center;
}
.talk-title {
  margin-bottom: 10px;
}
</style>