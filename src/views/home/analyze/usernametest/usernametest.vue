<template>
  <div class="user-name-analysis">
    <h2>用户昵称统计</h2>
    <div class="username-test" ref="usernamechart"></div>
  </div>
</template>

<script>
import { getAllUserInfoByPage } from "network/user";
import serverUrl from "network/server";
export default {
  name: "usernametestpage",
  data() {
    return {
      userChart: null,
      usernameOptions: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/> {b}的总发帖数：{c}",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 30,
          bottom: 20,
          data: [],
        },
        series: [
          {
            name: "用户",//formatted :a
            type: "pie",
            radius: "36%",//大小
            center: ["50%", "50%"],//位置
            data: [],//formatted :b c
            labelLine: {
              show: true,
              smooth: 0.2,
              length: 10,
              length2: 40,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowColor: "rgba(255, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getUserName().then((userdata) => {
      let seriesData = this.createSeriesData(userdata);
      this.usernameOptions.legend.data = this.createLengendData(userdata);
      this.usernameOptions.series[0].data = seriesData;

      this.initEcharts();
    });
  },
  methods: {
    getUserName() {
      return getAllUserInfoByPage(0, 100).then((resuser) => {
        // console.log("获取所有用户信息", resuser);
        return resuser;
      });
    },
    initEcharts() {
      this.userChart = this.$echarts.init(this.$refs.usernamechart);
      this.userChart.setOption(this.usernameOptions);
    },
    //基本数据series data
    createSeriesData(userlistsdata) {
      let seriesArr = [];

      for (let userinfo of userlistsdata) {
        if (userinfo.avatarUrl) {
          let avatarUrlImg = serverUrl + "/images/avatar/" + userinfo.avatarUrl;
          seriesArr.push({
            name: userinfo.userName,
            value: userinfo.talkEssayCount + userinfo.tipEssayCount,
            label: {
              formatter: ["{title|{b}}{abg|}", "{hr|}", "{avatar|}"].join(
                "\n"
              ),
              backgroundColor: "#eee",
              borderColor: "#777",
              borderWidth: 0.5,
              borderRadius: 4,
              rich: {
                title: {
                  color: "#666",
                  align: "center",
                },
                abg: {
                  backgroundColor: "#eee",
                  width: "100%",
                  align: "right",
                  height: 25,
                  borderRadius: [4, 4, 0, 0],
                  borderWidth: 0.5,
                  borderColor: "#777",
                },
                avatar: {
                  height: 80,
                  align: "center",
                  backgroundColor: {
                    image: avatarUrlImg,
                  },
                },
                hr: {
                  borderColor: "#777",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
              },
            },
          });
        } else {
          seriesArr.push({
            name: userinfo.userName,
            value: 1,
          });
        }
      }
      return seriesArr;
    },
    //图例数据lengend data
    createLengendData(userlistsdata) {
      let legendData = [];
      for (let userinfo of userlistsdata) {
        legendData.push(userinfo.userName);
      }
      return legendData;
    },
  },
};
</script>

<style>
.username-test {
  height: 600px;
}
</style>