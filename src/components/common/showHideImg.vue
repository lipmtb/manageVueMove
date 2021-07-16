<template>
  <div class="show-hide-wrapper">
    <ul class="img-show-wrapper">
      <li
        class="img-show-item"
        v-for="(item, idx) in imgArr"
        :key="item"
        @click="showBig(idx)"
      >
        <img :src="item" alt="anglerimg" />
      </li>
      <!-- 大图 -->
      <ul
        class="img-show-bigger"
        v-show="showBigImg"
        ref="bigulbox"
        @click.stop="hideBig"
      >
        <li class="big-img-item" v-for="item in imgArr" :key="item">
          <img :src="item" alt="anglerimg" />
        </li>
      </ul>
      <!-- 左右控制箭头 -->
      <i
        class="el-icon-arrow-left arrow-icon-left"
        @click="lastImg"
        v-show="showLeft"
      ></i>
      <i
        class="el-icon-arrow-right arrow-icon-right"
        @click="nextImg"
        v-show="showRight"
      ></i>
    </ul>
  </div>
</template>

<script>
export default {
  name: "imgShowHideCpn",
  data() {
    return {
      showBigImg: false,
      curShowBig: 1,
      showLeft: false,
      showRight: false,
    };
  },
  props: {
    imgArr: Array,
  },
  methods: {
    //   改变展示的图片和左右箭头
    initBigImg() {
      this.$refs.bigulbox.style.left = -1 * this.curShowBig * 100 + "%";
      if (this.imgArr.length == 1) {
        this.showLeft = false;
        this.showRight = false;
        return;
      }

      if (this.curShowBig == 0) {
        this.showLeft = false;
        this.showRight = true;
        return;
      }

      if (this.curShowBig == this.imgArr.length - 1) {
        this.showRight = false;
        this.showLeft = true;
        return;
      }
      this.showRight = true;
      this.showLeft = true;
    },
    //隐藏大图
    hideBig() {
      this.showBigImg = false;
      this.showLeft = false;
      this.showRight = false;
    },
    //显示大图，根据选择的图片索引显示对应的大图
    showBig(idx) {
      this.showBigImg = true;
      this.curShowBig = idx;

      this.initBigImg();
    },
    //上一张
    lastImg() {
      this.curShowBig--;
      this.initBigImg();
    },
    //下一张
    nextImg() {
      this.curShowBig++;
      this.initBigImg();
    },
  },
};
</script>

<style>
ul.img-show-wrapper {
  position: relative;
  width: 90%;
  min-height: 260px;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
ul.img-show-wrapper li.img-show-item {
  width: 33%;
  height: 120px;
  margin-top: 6px;
  border: 1px solid rgba(255, 255, 255, 0.562);
  border-right-width: 0;
  cursor: grabbing;
}
ul.img-show-wrapper li.img-show-item:last-of-type {
  border-right-width: 1px;
}
ul.img-show-wrapper li.img-show-item img {
  width: 100px;
}

/* 大图 */
ul.img-show-bigger {
  width: 300%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #fff;
}

ul.img-show-bigger li.big-img-item {
  width: 33.3%;
  float: left;
}

/* 箭头 */
i.arrow-icon-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 33.3%;
  height: 100%;
  background-color: transparent;
  font-size: 6em;
  line-height: 260px;
  color: #ddd;
}

i.arrow-icon-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 33.3%;
  height: 100%;
  background-color: transparent;
  font-size: 6em;
  line-height: 260px;
  color: #ddd;
}
</style>