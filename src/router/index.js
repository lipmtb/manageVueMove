import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: '/login'
  },
  //登录页
  {
    path: '/login',
    name: 'login',
    component: () => import("views/login/login")
  },
  //首页
  {
    path: '/home',
    meta:{
      info:'主页'
    },
    component: () => import("views/home/home"),
    children:[{
      path:'',
      redirect:'essay/tip'
    },{
      name: 'essay',
      path:'/home/essay',
      meta:{
        info:'帖子发布'
      },
      component:()=>import("views/home/essay/essay"),
      children:[{
        path:'/home/essay/talk',
        name:"essaytalk",
        meta:{
          info:'钓友圈'
        },
        component:()=>import("views/home/essay/talk")
      },{
        path:'/home/essay/tip',
        name:"essaytip",
        meta:{
          info:'技巧'
        },
        component:()=>import("views/home/essay/tip")
      }]
    },{
      path:'/home/usermanage',
      name:'usermanage',
      meta:{
        info:'用户管理'
      },
      component:()=>import("views/home/user/user")
    },{
      path:'/home/analysis',
      name:'allanalysis',
      meta:{
        info:'数据统计'
      },
      component:()=>import("views/home/analyze/analysis"),
      children:[{
        path:"/home/analysis/tipclass",
        component:()=>import("views/home/analyze/tipclass/tipclass"),
        meta:{
          info:'技巧分类统计'
        }
      },{
        path:"/home/analysis/username",
        component:()=>import("views/home/analyze/usernametest/usernametest"),
        meta:{
          info:'用户昵称统计'
        }
      },{
        path:"/home/analysis/usersend",
        component:()=>import("views/home/analyze/usersendtest/usersendtest"),
        meta:{
          info:'用户发布统计'
        }
      }]
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由拦截
router.beforeEach((to, from, next) => {
  //  console.log(to, from);
  if (to.matched[0].path == '/home') {
    if (!sessionStorage.getItem("anglerName")) {
        next("/login");
    }
    next();
    return;
  }

  next();
})
export default router