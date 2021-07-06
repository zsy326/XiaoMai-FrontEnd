import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
 
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
        path:"/CustomerInfoCenter",
        name:"CustomerInfoCenter",
        component:() => import("../views/CustomerFeatures/CustomerInfoCenter.vue")
      },
      {
        path:"/Orders",
        name:"Orders",
        component:() => import("../views/CustomerFeatures/Orders.vue")
      },
      {
        path:"/VIP",
        name:"VIP",
        component:() => import("../views/CustomerFeatures/VIP.vue")
      },
      {
        path:"/ResetPassword",
        name:"ResetPassword",
        component:() => import("../views/CustomerFeatures/ResetPassword.vue")
      },
      {
        path:"/SearchList",
        name:"SearchList",
        component:() => import("../views/CustomerFeatures/Search.vue")
      },


    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
