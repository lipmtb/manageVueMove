<template>
  <div class="tip-class-analyze">
    <h2>技巧分类统计</h2>
    <div class="tip-class-count" ref="tipclasspipe"></div>
  </div>
</template>

<script>
import {getAllTipClass} from "network/tip";
export default {
  data() {
    return {
      tipClassChart: null,
      tipClassData: {
        legend: {//图例位置
          top: "10",
        },
        tooltip: {//鼠标hover提示
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}条帖子，占比：({d}%)",
        },
        series: [
          {
            name: "帖子数统计",
            type: "pie",
            radius: [20, 200], //内圆外圆半径
            center: ["60%", "50%"],//位置
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
              borderColor:'#fff',
              borderWidth:1
            },
            label: {  //图上标注
              show:true,
         
            },  //图上标注的连线
            labelLine: {
                show:true,
              lineStyle: {
                color: "rgba(0, 255, 0, 0.9)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
              emphasis: { //mouseover时图标注项的样式
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                    color:'#008c8c'
                }
            },
            data: [
              {
                value: 50,
                name: "钓杆",
              },
              {
                value: 20,
                name: "饵料",
              },
              {
                value: 30,
                name: "渔网",
              },
              {
                value: 20,
                name: "帐篷",
              },
              {
                value: 10,
                name: "冬钓",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.initTipClass();
    this.getTipClassData().then((tipdata)=>{
        let pipData=[];
        for(let tipitem of tipdata){
            pipData.push({
                name:tipitem.className,
                value:tipitem.essayCount
            })
        }
        this.tipClassData.series[0].data=pipData;
        this.tipClassChart.setOption(this.tipClassData);
    });
  },
  methods: {
    initTipClass() {
      this.tipClassChart = this.$echarts.init(this.$refs.tipclasspipe);
      
    },
    //获取tipClass数据
    getTipClassData(){
        return getAllTipClass().then((tipData)=>{
            // console.log("获取到技巧类型数据",tipData);
            return tipData;
        })
    }
  },
};
</script>

<style>
.tip-class-count {
  height: 600px;
}
</style>