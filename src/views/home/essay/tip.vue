<template>
  <div class="talk-manage-wrapper">
    <h2 class="talk-title">技巧发布管理</h2>
    <talk-table :talk-data="tipData" @onread="onreadtip" @ondelete="onDeleteTip"></talk-table>
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
import { getAllTipEssay,deleteTipById } from "network/tip";
import talkTable from "./talkcpn/tableTalk";
export default {
  name: "talktablecpn",
  components: {
    talkTable,
  },
  data() {
    return {
      tipData: [],
      curPage: 1
 
    };
  },
  created() {
    this.getAllTipEssayByPage();
  },
  methods: {
    //获取某页的钓友圈帖子数据
    getAllTipEssayByPage() {
      return getAllTipEssay(this.curPage-1).then((lists) => {
        // console.log("获取到技巧",lists);
        this.tipData = lists;
        return lists;
      });
    },
    handleSizeChange(val) {
      // console.log("size change",val);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`,typeof(val));
      this.curPage=val;
      this.getAllTipEssayByPage();
    },
    onreadtip(idx,row){
      //  console.log(idx,row);
      this.$router.push({
        path:'/home/essay',
        query:{
          type:'tip',
          essayId:row._id
        }
      })
    },
     //删除tip
    onDeleteTip(idx,data) {
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

            deleteTipById(data._id).then((delRes) => {
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
          this.tipData.splice(idx,1);
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