<template>
  <div class="home">
    <el-container class="container">
      <!-- 左边导航 -->
      <el-aside width="180px">
        <h1 class="topic-title">垂钓</h1>
        <menu-lists :menudatas="menudata"></menu-lists>
      </el-aside>
      <!-- 右边主要内容 -->
      <el-container>
        <el-header>
          <homeHeaderCpn />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeHeaderCpn from "./homeHeader.vue";
import MenuLists from "components/content/home/menulists.vue";
import menuObj from "assets/menudata/menu.js";
export default {
  name: "Home",
  components: {
    homeHeaderCpn,
    MenuLists,
  },
  data() {
    return {
      menudata: [],
    };
  },
  created() {
    this.menudata = menuObj.menuLists;
    // console.log(this.menudata);
  },
  methods: {},
};
</script>

<style scoped>

.container {
  height: 100vh;
    background-color: #58a7ff47;
}

h1.topic-title{
  height:60px;
  margin:0;
  padding:0;

  line-height:60px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","宋体";
}
.el-aside {
  color: #333;
  text-align: center;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding:10px;
}
</style>