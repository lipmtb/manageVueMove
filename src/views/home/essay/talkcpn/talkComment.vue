<template>
  <div class="comment-wrapper">
    <div class="comment-top">
      <i class="el-icon-edit-outline" @click="toggleCommentArea"></i>
      <span class="comment-oper-text">{{ toggleText }}</span>
    </div>
    <div
      class="comment-lists-wrapper"
      :style="{ height: commentHeight, padding: curpadding }"
    >
      <ul
        class="comment-lists"
        v-if="commentLists.length > 0"
        ref="commentullists"
      >
        <li
          class="comment-item"
          v-for="commitem in commentLists"
          :key="commitem._id"
        >
          <div class="avatar-info">
            <div
              class="user-img-comm"
              v-if="commitem.userInfo.avatarUrl"
              :style="[getCommAvatarUrl(commitem.userInfo)]"
            ></div>
            <div class="user-img-comm user-img-comminit" v-else></div>
          </div>

          <div class="comment-info">
            <a class="comm-username"> {{ commitem.anglerName }}: </a>
            <span class="comment-conten">{{ commitem.commentText }}</span>
            <div class="comm-footer-extra">
              <span>{{ commitem.commentTime | dateFilter }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="more-footer-box clear-fix">
        <span class="more-comm-text right" @click="getMoreComment"
          >更多评论</span
        >
      </div>
    </div>
    <div v-if="commentLists.length==0">暂无评论</div>
  </div>
</template>

<script>
import serverUrl from "network/server";
import customFormattedDate from "util/customTime";
export default {
  name: "commentListsShow",
  props: {
    commentLists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      toggleText: "相关评论",
      commentHeight: 0,
      curpadding: 0,
    };
  },
  filters: {
    dateFilter(date) {
      return customFormattedDate(date);
    },
  },
  updated() {
    let that = this;
    // console.log("updated");
    if (that.$refs.commentullists && that.commentHeight) {
      // console.log("updated height", that.$refs.commentullists.offsetHeight);
      that.commentHeight = that.getCommentHeight();
    }
  },
  methods: {
    //转换头像
    getCommAvatarUrl(userobj) {
      return {
        backgroundImage:
          "url(" + serverUrl + "/images/avatar/" + userobj.avatarUrl + ")",
        backgroundPositionX: -1 * userobj.avatarRadX * 30 + "px",
        backgroundPositionY: -1 * userobj.avatarRadY * 30 + "px",
        backgroundSize: "30px 30px",
      };
    },
    //计算评论区域高度
    getCommentHeight() {
      //   console.log("get ul height", this.$refs.commentullists.offsetHeight);
      return this.$refs.commentullists.offsetHeight + 100 + "px";
    },
    //展开关闭评论区域
    toggleCommentArea() {
      if (this.commentHeight) {
        // console.log("关闭评论");
        this.commentHeight = 0;
        this.curpadding = 0;
      } else {
        // console.log("打开评论");
        if (this.commentLists.length > 0) {
          this.commentHeight = 1;
          this.curpadding = "0.2em";
        }
      }
    },
    getMoreComment() {
      this.$emit("moreevent");
    },
  },
};
</script>

<style>
/* 评论者头像 */
.user-img-comm {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #fff;
  background-repeat: no-repeat;
}

.user-img-comminit {
  background-image: url("~assets/img/defaultAvatar.png");
  background-position: center;
  background-size: contain;
}
/* 评论 */
.comment-wrapper {
  text-align: left;
  font-size: 1.4em;
}

.comment-wrapper .comment-top i:hover {
  color: tomato;
  cursor: pointer;
}

.comment-wrapper span.comment-oper-text {
  margin-left: 0.1em;
}
.comment-lists-wrapper {
  background-color: rgb(216, 212, 212);
  border-radius: 10px;
  overflow: hidden;
  transition: height 500ms linear;
  padding: 0.2em;
}

.comment-lists-wrapper li.comment-item {
  display: flex;
  margin: 0.4em 0;
}
.comment-lists-wrapper li.comment-item .comment-info {
  margin-left: 0.2em;
}
.comment-lists-wrapper li.comment-item .comment-info .comm-username {
  font-size: 0.8em;
}
.comment-lists-wrapper .comm-footer-extra {
  font-size: 0.4em;
  color: #999;
}
.more-comm-text {
  font-size: 0.6em;
  color: #666;
}
</style>