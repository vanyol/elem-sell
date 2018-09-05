<template>
  <section class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span><span v-show="food.oldPrice" class="old">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    <food :food="selectedFood" ref="food"></food>
  </section>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopCart from '../shopcart/shopcart'
  import cartControl from '../cartcontrol/cartcontrol'
  import food from '../food/food'

  export default {
    name: "goods",
    components: {
      shopCart,
      cartControl,
      food
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      },
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
        this.$Axios.get('api/goods').then(res => {
          let goods = res.data
          if (goods.errno == 0) {
            this.goods = goods.data
            this.$nextTick(() => {
              this._initScroll()
              this._calculateHeight()
            })
          }
        })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3 // 监测实时滚动的位置
        })

        this.foodScroll.on('scroll', (pos) => {
          // 拿到实时的y坐标
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        // 获取食物的li Dom节点列表
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
        //console.log(foodList)
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu(index, event) {
        // better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点击
        if (!event._constructed) {
          return;
        }
        // 获取食物的li Dom节点列表
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        // 调用better-scroll 方法滚动到响应位置
        this.foodScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
  }
</script>

<style scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 173px;
    bottom: 46px;
    width: 100%;
    color: rgb(77, 85, 93);
    overflow: hidden;
  }

  .menu-wrapper {
    width: 80px;
    flex: 0 0 80px;
    background: #f3f5f7;
    font-size: 12px;
    font-weight: 200;
    line-height: 14px;
  }

  .menu-wrapper .menu-item {
    display: table;
    height: 54px;
    width: 56px;
    line-height: 14px;
    padding: 0 12px;
  }

  .menu-wrapper .menu-item.current {
    position: relative;
    margin-top: -1px;
    z-index: 10;
    background: #fff;
    font-weight: 700;
  }

  .text {
    position: relative;
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
  }

  .text:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, .1);
  }

  .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .menu-wrapper .menu-item .icon.decrease {
    background-image: url(img/decrease_3@2x.png);
  }

  .menu-wrapper .menu-item .icon.discount {
    background-image: url(img/discount_3@3x.png);
  }

  .menu-wrapper .menu-item .icon.guarantee {
    background-image: url(img/guarantee_3@3x.png);
  }

  .menu-wrapper .menu-item .icon.invoice {
    background-image: url(img/invoice_3@3x.png);
  }

  .menu-wrapper .menu-item .icon.special {
    background-image: url(img/special_3@3x.png);
  }

  .foods-wrapper {
    flex: 1;
  }

  .foods-wrapper .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .food-item {
    display: flex;
    position: relative;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
  }

  .food-item:last-child {
    border: none;
  }

  .food-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .food-item .content {
    flex: 1;
  }

  .food-item .name {
    margin: 2px 0 8px;
    line-height: 14px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }

  .food-item .desc,
  .food-item .extra {
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item .desc {
    line-height: 12px;
    margin-bottom: 8px;
  }

  .food-item .extra {
    line-height: 10px;
  }

  .food-item .count {
    margin-right: 12px;
  }

  .food-item .price {
    font-weight: 700;
    line-height: 24px;
  }

  .food-item .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .food-item .old {
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .food-item .cartcontrol-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
</style>
