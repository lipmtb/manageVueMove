<template>
  <div class="home-header-wrapper">
    <el-row>
      <el-col :span="20">
        <!-- 面包 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }"></el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="r in routedMatched" :key="r.path">{{r.meta.info}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4">
        <!-- 退出系统 -->
        <el-button type="info" @click="toLogout" size="small"
          >退出登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name:'homeHeader',
    data(){
      return {
        curRouteMatched:[]
      }
    },
    computed:{
      routedMatched(){
        if(this.$route&&this.$route.matched){
            return this.$route.matched;
        }
      }
    },
  methods: {
    //退出登录
    toLogout() {
      sessionStorage.removeItem("anglerName");
      this.$router.replace("/login");
    }
  },
};
</script>

<style scoped>
.el-col-20 {
  margin-top: 1em;
}

.el-col-4 {
  margin-top: 1em;
}
</style>