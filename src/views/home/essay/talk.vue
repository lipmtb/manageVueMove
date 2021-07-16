<template>
  <div class="talk-manage-wrapper">
    <h2 class="talk-title">钓友圈发布管理</h2>
    <talk-table
      :talk-data="talkData"
      @onread="onreadtakkdetail"
      @ondelete="onDeleteTalk"
    ></talk-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="curPage"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllTalk, deleteTalkById } from "network/talk";
import talkTable from "./talkcpn/tableTalk";
export default {
  name: "talktablecpn",
  components: {
    talkTable,
  },
  data() {
    return {
      talkData: [],
      curPage: 1,
    };
  },
  created() {
    this.getAllTalkByPage();
  },
  methods: {
    //获取某页的钓友圈帖子数据
    getAllTalkByPage() {
      return getAllTalk(this.curPage - 1).then((lists) => {
        this.talkData = lists;
        return lists;
      });
    },
    handleSizeChange(val) {
      console.log("size change", val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`,typeof(val));
      this.curPage = val;
      this.getAllTalkByPage();
    },
    onreadtakkdetail(idx, row) {
      // console.log(idx,row);
      this.$router.push({
        path: "/home/essay",
        query: {
          type: "talk",
          essayId: row._id,
        },
      });
    },
    //删除talk
    onDeleteTalk(idx,data) {
      // console.log("准备删除",idx, data);
      let h = this.$createElement;
      this.$messagebox({
        title: "删除确认",
        message: h("p", null, [
          h("span", { style: "color:#ddd" }, "是否删除"),
          h("strong", { style: "color:#f00" }, data.title),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";

            deleteTalkById(data._id).then((delRes) => {
              // console.log("删除结果", delRes);
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            });
          } else {
            done();
          }
        }
      }).then((action) => {
          this.talkData.splice(idx,1);
          this.$mymessage({
            type: "success",
            message: "删除成功"
          });
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  }
};
</script>

<style>
</style>