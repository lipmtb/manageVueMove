<template>
  <div class="menu-item">
    <el-submenu :index="itemData.path"  v-if="itemData.childmenu">
      <template slot="title">
        <i :class="itemData.icon"></i>
        <span>{{itemData.title}}</span>
      </template>
        <menu-item v-for="childitem in itemData.childmenu" :item-data="childitem" :key="childitem.path"></menu-item>
    </el-submenu>

 
    <el-menu-item :index="itemData.path"  v-else>
      <i :class="itemData.icon"></i>
      <span slot="title">{{itemData.title}}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props:{
      itemData:Object
  },
  created(){
    // console.log("created",this.itemData);
  },
  methods:{
    
  }
};
</script>

<style>
</style>