import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'
import Seller from '../components/seller/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  //mode
  // 类型: string
  // 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
  // 可选值: "hash" | "history" | "abstract"
  // 配置路由模式:
  // hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。
  // history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。
  // abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。
  //mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
