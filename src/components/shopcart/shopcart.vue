<template>
  <footer class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left" :class="{'highlight': totalCount > 0}">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food border-1px" v-for="food in selectFoods">
                <span class="name">{{ food.name }}</span>
                <div class="price">￥{{ food.price * food.count }}</div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </footer>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartControl from '../cartcontrol/cartcontrol'

  export default {
    name: "shopcart",
    data() {
      return {
        fold: true
      }
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return []
        }
        // food:{price:20,count:3}
      }
    },
    components: {
      cartControl
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        //console.log(this.selectFoods)
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              // 重新计算better-scroll高度
              this.scroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList() {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}元`)
      }
    }
  }
</script>

<style scoped>
  /*@import "../../common/css/icon.css";*/

  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 48px;
  }

  .shopcart .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, .4);
  }

  .shopcart .content-left {
    flex: 1;
  }

  .shopcart .content-left .logo-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -10px;
    margin: 0 18px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background: #141d27;
  }

  .shopcart .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }

  .shopcart .content-left .logo-wrapper .logo .icon-shopping_cart {
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
  }

  .num {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 16px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
  }

  .shopcart .content-left .price {
    vertical-align: top;
    display: inline-block;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, .1);
    font-size: 16px;
    font-weight: 700;
  }

  .shopcart .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
  }

  .shopcart .content-left.highlight .price {
    color: #fff;
  }

  .shopcart .content-left.highlight .logo-wrapper .logo {
    background: rgb(0, 160, 220);
  }

  .shopcart .content-left.highlight .logo-wrapper .logo .icon-shopping_cart {
    color: #fff;
  }

  .content-right {
    flex: 0 0 105px;
    width: 105px;
  }

  .content-right .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
  }

  .content-right .pay.not-enough {
    background: #2b333b;
  }

  .content-right .pay.enough {
    background: #00b43c;
    color: #fff;
  }

  .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }

  .shopcart-list.fold-enter-active,
  .shopcart-list.fold-leave-active {
    transition: all .5s;
  }

  .shopcart-list.fold-enter,
  .shopcart-list.fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .shopcart-list .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .shopcart-list .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart-list .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart-list .list-content {
    padding: 0 18px;
    max-height: 217px;
    background: #fff;
    overflow: hidden;
  }
  .shopcart-list .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border: 1px solid rgba(7, 17, 27, .1);
  }

  .shopcart-list .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .shopcart-list .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-weight: 700;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .cartcontrol-wrapper {
    position: absolute;
    bottom: 6px;
    right: 0;
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: rgba(7, 17, 27, .6);
    backdrop-filter: blur(10px);
  }
  .list-mask.fade-enter-active, .fade-leave-active {
     transition: all .5s;
   }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
