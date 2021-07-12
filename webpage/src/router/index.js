import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
 // 后台登录
  {
    path:"/BackendLogin",
    name:"BackendLogin",
    component:() => import("../views/BackendRegLogin/BackendLogin.vue")
  },
  {
    path:"/SellerRegister",
    name:"SellerRegister",
    component:() => import("../views/BackendRegLogin/SellerRegister.vue")
  },
   // 商家路由
   {
    path: "/Sellerhome/:id",
    name: "SellerHome",
    component:() => import("../components/Home.vue"),
    children: [
    {
      path: '/outline',
      component: resolve => require(['../components/Outline.vue'], resolve),
    },
    {
      path: '/slotList',
      component: resolve => require(['../components/SlotList.vue'], resolve),
    },
    {
      path: '/notification',
      component: resolve => require(['../components/Notification.vue'], resolve),
    },
    {
      path: '/editInfo',
      component: resolve => require(['../components/EditInfo.vue'], resolve),
    },
    {
      path: '/releaseSlot',
      component: resolve => require(['../components/ReleaseSlot.vue'], resolve),
    },
    {
      path: '/releaseGoods',
      component: resolve => require(['../components/ReleaseGoods.vue'], resolve),
    },
    {
      path: '/orderList',
      component: resolve => require(['../components/OrderList.vue'], resolve),
    },
  ]
  },

  // 顾客路由
  {
    path:"/",
    name:"CustomerIndex",
    component:() => import("../views/CustomerFeatures/CustomerIndex.vue"),
    children:[
      {
        path:"/",
        name:"CustomerMain",
        component:() => import("../views/CustomerFeatures/CustomerMain.vue")
      },
      {
        path:"/Category",
        name:"Category",
        component:() => import("../views/CustomerFeatures/Category.vue")
      },
      {
        path:"/CustomerInfoCenter/:id",
        name:"CustomerInfoCenter",
        component:() => import("../views/CustomerFeatures/CustomerInfoCenter.vue")
      },
      {
        path:"/Orders/:id",
        name:"Orders",
        component:() => import("../views/CustomerFeatures/Orders.vue")
      },
      {
        path:"/VIP/:id",
        name:"VIP",
        component:() => import("../views/CustomerFeatures/VIP.vue")
      },
      {
        path:"/ResetPassword/:id",
        name:"ResetPassword",
        component:() => import("../views/CustomerFeatures/ResetPassword.vue")
      },
      {
        path:"/SearchList/:input",
        name:"SearchList",
        component:() => import("../views/CustomerFeatures/Search.vue")
      },
      {
        path:"/NoticeBoard",
        name:"NoticeBoard",
        component:() => import("../views/CustomerFeatures/NoticeBoard")
      },


    ]
  },
 
]

const router = new VueRouter({
  routes
})

export default router
