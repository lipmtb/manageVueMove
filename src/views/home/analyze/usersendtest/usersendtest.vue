<template>
  <div class="user-send-count">
    <div class="user-send-chart" ref="usersendchart"></div>
  </div>
</template>

<script>
import { getAllSendForMonth } from "network/user";
export default {
  name: "usesendTestPage",
  data() {
    return {
      usersendChart: null,

      usersendOption: {
        title: {
          text: "近6个月用户发布统计",
          show: true,
          textStyle: {
            fontSize: 16,
            color: "#666",
          },
        },
        color: ["#008c8c", "#409EFF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          right: "16%",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["钓友圈", "技巧"],
        },
        xAxis: [
          {
            name: "(月份)",
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
           nameLocation:'center',
           nameGap:15,
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "钓友圈",

            position: "left",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#008c8c",
              },
            },
            axisLabel: {
              formatter: "{value} 条",
            },
          },
          {
            type: "value",
            name: "技巧",

            position: "right",
            offset: 10,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#409EFF",
              },
            },
            axisLabel: {
              formatter: "{value} 条",
            },
          },
        ],
        series: [
          {
            name: "钓友圈",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "技巧",
            type: "bar",
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    //获取显示的用户发布信息数据
    this.getAllSendForMonthFn().then((usersendlists) => {
      // console.log("获取用户信息和发布的帖子数", usersendlists);
      //将数据转换给usersendOption
      this.usersendOption.xAxis[0].data = usersendlists.xArr;
      this.usersendOption.series[0].data = usersendlists.talkCountArr;
      this.usersendOption.series[1].data = usersendlists.tipCountArr;
      //形成echart图表
      this.initChart();
    });
  },
  methods: {
    initChart() {
      this.usersendChart = this.$echarts.init(this.$refs.usersendchart);
      this.usersendChart.setOption(this.usersendOption);
    },
    getAllSendForMonthFn() {
      return getAllSendForMonth().then((datalists) => {
        return datalists;
      });
    },
  },
};
</script>

<style>
.user-send-chart {
  height: 600px;
}
</style>