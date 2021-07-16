import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
import echarts from "echarts";
Vue.prototype.$echarts=echarts;
import 'element-ui/lib/theme-chalk/index.css'
import "assets/css/base.css"
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$mymessage=Message;
Vue.prototype.$messagebox=MessageBox;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
