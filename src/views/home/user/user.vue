<template>
  <div class="user-wrapper">
    <h1>用户信息</h1>

    <div class="user-table-lists">
      <el-table
        :data="userData"
        style="width: 90%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="userName" label="注册昵称" width="180">
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像信息">
          <template slot-scope="curscope">
            <span @mouseenter="onenter(curscope.row,curscope.$index)" @mouseleave="onleave(curscope.row)">{{
              curscope.row.avatarUrl
            }}</span>
            <div class="hideAvatar" @mouseenter="showImg" 
            @mouseleave="hideImg"
            :style="[avatarStyle(curscope.row)]" 
            v-show="curscope.$index==curShowIdx"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="talkEssayCount"
          label="钓友圈帖子数"
        ></el-table-column>
        <el-table-column
          prop="tipEssayCount"
          label="技巧帖子数"
        ></el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-size="5"
          layout="total, prev, pager, next"
          :total="totalUserCount"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUserInfoByPage, getTotalUser } from "network/user";
import serverUrl from "network/server";
export default {
  name: "userManageCpn",
  data() {
    return {
      userData: [],
      curPage: 1,
      totalUserCount: 99,
      curShowIdx:-1,
      tempShow:false
    };
  },
  created() {
    this.getUserInfoDetail();
    this.getTotalUserCount();
  },
  methods: {
    avatarStyle(userinfo){
        return {
          backgroundImage:`url(${serverUrl}/images/avatar/${userinfo.avatarUrl})`,
          backgroundSize:"120px 120px",
          backgroundPositionX:-1*userinfo.avatarRadX*120+"px",
          backgroundPositionY:-1*userinfo.avatarRadY*120+"px"

        }
    },
    getUserInfoDetail() {
      return getAllUserInfoByPage(this.curPage - 1).then((resdata) => {
        // console.log("获得用户信息", resdata);
        this.userData = resdata;
      });
    },
    getTotalUserCount() {
      return getTotalUser().then((res) => {
        // console.log("注册用户数", res.total);
        this.totalUserCount = res.total;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.talkEssayCount > 5 || row.tipEssayCount > 4) {
        return "warning-row";
      }
      return "success-row";
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`,this.curPage);
      this.getUserInfoDetail();
    },
    onenter(row,idx) {
      //  console.log(row,idx);
      this.curShowIdx=idx;
     
    
    },
    onleave(row) {
    let that=this;
     setTimeout(function(){
       if(!that.tempShow){
          that.curShowIdx=-1;
       }
     },200);
    },
    showImg(){
      this.tempShow=true;
    },
    hideImg(){
      this.tempShow=false;
      this.curShowIdx=-1;
    }
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table div.cell {
  position: relative;
  overflow: visible;
}

.el-table div.cell div.hideAvatar {
  position: absolute;
  left: 26px;
  top: -60px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fff;
  z-index: 2147483647;

}
.el-table,.el-table__body-wrapper{
  overflow:visible;
}
</style>