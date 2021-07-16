<template>
  <div class="essay-wrapper">
    <div class="user-info clear-fix">
      <div
        class="user-img-bg left"
        v-if="essayData && essayData.userInfo && essayData.userInfo.avatarUrl"
        :style="[initImgStyle]"
      ></div>
      <div class="user-img-bg user-img-initial left" v-else></div>
      <a class="user-name left">
        {{ essayData && essayData.anglerName }}
      </a>
    </div>
    <h2 class="essay-title">{{ essayData && essayData.title }}</h2>
    <p class="essay-content">{{ essayData && essayData.content }}</p>

    <show-hide-img
      :img-arr="essayData.imgArr"
      v-if="essayData && essayData.imgArr.length > 0"
    ></show-hide-img>

    <div class="publishTimeBox clear-fix">
      <span class="right">{{ essayData.publishTime | myformatted }}</span>
    </div>
  </div>
</template>

<script>
import ShowHideImg from "components/common/showHideImg";
import customFormattedDate from "util/customTime";
export default {
  name: "essayDetailCpn",
  components: {
    ShowHideImg,
  },
  props: {
    essayData: Object,
  },
  data() {
    return {};
  },
  filters: {
    myformatted(da) {
      return customFormattedDate(da);
    },
  },
  computed: {
    initImgStyle() {
      return {
        backgroundImage: "url(" + this.essayData.userInfo.avatarUrl + ")",
        backgroundPositionX:
          -1 * this.essayData.userInfo.avatarRadX * 44 + "px",
        backgroundPositionY:
          -1 * this.essayData.userInfo.avatarRadY * 44 + "px",
        backgroundSize: "44px 44px",
      };
    },
  },
  methods: {},
};
</script>

<style>
div.user-info {
  padding: 0.4em;
  border-top: 1px dashed #eee;
  border-bottom: 1px dashed #eee;
}

div.user-collect-info i.iconfont {
  font-size: 1.6em;
}
a.user-name {
  font-size: 1.6em;
}
a.user-name:hover {
  cursor: pointer;
  text-decoration: underline;
}

h2.essay-title {
  text-align: center;
}

p.essay-content {
  padding: 0.4em;
}
/* 发布时间 */
.publishTimeBox {
  font-size: 0.4em;
  color: #ccc;
}

/* 头像 */
.user-img-bg {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #fff;
  background-repeat: no-repeat;
}
.user-img-initial {
  background-image: url("~assets/img/defaultAvatar.png");
  background-position: center;
  background-size: contain;
}
</style>