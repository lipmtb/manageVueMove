<template>
  <div class="essay-wrapper">
    <div v-if="essayData">
      <!-- 帖子内容和图片 -->
      <talk-detail :essay-data="essayData"></talk-detail>
      <!-- 帖子相关评论 -->
      <comment-show-cpn
        :comment-lists="commentLists"
        @moreevent="getMoreComment"
      ></comment-show-cpn>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import talkDetail from "./talkcpn/talkDetail.vue";
import commentShowCpn from "./talkcpn/talkComment.vue";
import { getTalkDetail, getTalkComment } from "network/talk";
import { getTipDetail, getTipComment } from "network/tip";

import serverUrl from "network/server.js";
export default {
  components: {
    talkDetail,
    commentShowCpn,
  },
  data() {
    return {
      essayId: "",
      essayData: null,
      type: "talk",
      commentLists: [],
      curCommentCount: 0,
      hasMoreComment: true,
      canGetMore: true,
    };
  },
  created() {
    // console.log("essay cpn created", this.$route.path);
    this.changeRoute();
    if (this.essayId) {
      this.getTalkDetail();
      this.getCommentLists();
    }
  },
  watch: {
    //路由监听
    $route(val, from) {
      // console.log("watch route change", val);
      if (val.path == "/home/essay/talk" || val.path == "/home/essay/tip") {
        this.essayData = null;
        this.commentLists = [];
        this.curCommentCount = 0;
        this.hasMoreComment = true;
        this.canGetMore = true;
        return;
      }
      if (val.path == "/home/essay") {
        // console.log("watched route change", val);
        this.changeRoute();
        this.getTalkDetail();
        this.getCommentLists();
      }
    },
  },
  methods: {
    changeRoute() {
      this.type = this.$route.query.type;
      this.essayId = this.$route.query.essayId;
    },
    //获取帖子详细
    getTalkDetail() {
      let pros = null;
      if (this.type == "talk") {
        pros = getTalkDetail(this.essayId);
      } else {
        pros = getTipDetail(this.essayId);
      }
      pros.then((res) => {
        let data = res.talkData;
        if (data.userInfo.avatarUrl) {
          data.userInfo.avatarUrl =
            serverUrl + "/images/avatar/" + data.userInfo.avatarUrl;
        }
        if (data.imgArr.length > 0) {
          for (let i = 0; i < data.imgArr.length; i++) {
            if (this.type == "talk") {
              data.imgArr[i] = serverUrl + "/images/talk/" + data.imgArr[i];
            } else {
              data.imgArr[i] = serverUrl + "/images/tip/" + data.imgArr[i];
            }
          }
        }
        this.essayData = data;
        // console.log("获取到帖子详情", data);
      });
    },
    //获取帖子评论
    getCommentLists() {
      let pros = null;
      if (this.type == "talk") {
        pros = getTalkComment(this.essayId, this.curCommentCount);
      } else {
        pros = getTipComment(this.essayId, this.curCommentCount);
      }
      return pros.then((res) => {
        // console.log("获取评论成功", res.commentLists);
        if (res.commentLists) {
          let lists = res.commentLists;
          if (lists.length == 0) {
            this.hasMoreComment = false;
          }
          this.commentLists.push(...lists);
          this.curCommentCount += lists.length;
        }
      });
    },
    //更多评论
    getMoreComment() {
      if (!this.hasMoreComment) {
       // console.log("createElement",this.$createElement);
       let h=this.$createElement;
        this.$mymessage({
          message:h('p',null,[h('span',{style:'color:#ccc;'},'没有更多了')]),
          duration:1800,
          showClose:true
        })
        return;
      }
      if (this.canGetMore) {
        this.canGetMore = false;
        this.getCommentLists().then(() => {
          this.canGetMore = true;
        });
      }
    },
  },
};
</script>

<style>
</style>