import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/outline'
  },
  {
    path: "/home",
    name: "Home",
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
      path: '/goodsList',
      component: resolve => require(['../components/GoodsList.vue'], resolve),
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
  // {
  //   path: "/release",
  //   name: "Release",
  //   component:() => import("../components/Release.vue")
  // },
]

const router = new VueRouter({
  routes
})
export default router
