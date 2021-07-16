<template>
  <div class="menu-wrapper">
    <el-menu
      :default-active="curMatch"
      class="el-menu-vertical-demo"
      background-color="#909399"
      text-color="#fff"
      active-text-color="#4bcbff"
      router
    >
      <menu-item
        v-for="item in menudatas"
        :key="item.path"
        :item-data="item"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from "./menuItem.vue";
export default {
  name: "menulists",
  components: {
    MenuItem,
  },
  props: {
    menudatas: Array,
  },
  computed: {
    curMatch() {
      // console.log("computed:", this.$route.path);
      return this.$route.path;
    },
  },
  created() {
    // console.log(this.menudatas);
  },
  methods: {},
};
</script>

<style>
.el-menu-item i,
.el-submenu i {
  color: #fff;
}
</style>