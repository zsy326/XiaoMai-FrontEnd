import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
 
  {
    path:"/BackendLogin",
    name:"BackendLogin",
    component:() => import("../views/BackendLogin.vue")
  },
  {
    path:"/SellerRegister",
    name:"SellerRegister",
    component:() => import("../views/SellerRegister.vue")
  },
  {
    path:"/",
    name:"CustomerIndex",
    component:() => import("../views/CustomerIndex.vue"),
    children:[
      {
        path:"/",
        name:"CustomerMain",
        component:() => import("../views/CustomerMain.vue")
      },
      {
        path:"/Category",
        name:"Category",
        component:() => import("../views/Category.vue")
    },
      
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
