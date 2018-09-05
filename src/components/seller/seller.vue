<template>
  <section class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{'active': favorite}"></i>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{ seller.bulletin }}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{ seller.supports[index].description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">{{ info }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import star from '../star/star'
  import split from '../split/split'
  import BScroll from 'better-scroll'
  import { saveToLocal, loadFromLocal } from '../../common/js/store'
  export default{
    name: "seller",
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star,
      split
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
      // 页面整体滚动
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      })

      // 商家图片横向滚动
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    }
  }
</script>


<style scoped>
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .seller .overview {
    position: relative;
    padding: 18px;
  }
  .seller .overview .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: #07111b;
    font-size: 14px;
  }
  .seller .overview .desc {
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    font-size: 0;
  }
  .seller .overview .desc .star {
    display: inline-block;
    vertical-align: top;
    margin-right: 8px;
  }
  .seller .overview .desc .text {
    display: inline-block;
    vertical-align: top;
    margin-right: 12px;
    line-height: 18px;
    font-size: 10px;
    color: #4d555d;
  }
  .seller .overview .remark {
    display: flex;
    padding-top: 18px;
  }
  .seller .overview .remark .block {
    flex: 1;
    text-align: center;
    border-right: 1px solid rgba(7,17,27,0.1);
  }
  .seller .overview .remark .block:last-child {
    border: none;
  }
  .seller .overview .remark .block h2 {
    margin-bottom: 4px;
    line-height: 10px;
    font-size: 10px;
    color: #93999f;
  }
  .seller .overview .remark .block .content {
    line-height: 24px;
    font-size: 10px;
    color: #07111b;
  }
  .seller .overview .remark .block .content .stress {
    font-size: 24px;
  }
  .seller .overview .favorite {
    position: absolute;
    right: 11px;
    top: 18px;
    width: 50px;
    text-align: center;
  }
  .seller .overview .favorite .icon-favorite {
    display: block;
    margin-bottom: 4px;
    line-height: 24px;
    font-size: 24px;
    color: #d4d6d9;
  }
  .seller .overview .favorite .icon-favorite.active {
    color: #f01414;
  }
  .seller .overview .favorite .text {
    line-height: 10px;
    font-size: 10px;
    color: #4d555d;
  }
  .seller .bulletin {
    padding: 18px 18px 0 18px;
  }
  .seller .bulletin .title {
    margin-bottom: 8px;
    line-height: 14px;
    color: #07111b;
    font-size: 14px;
  }
  .seller .bulletin .content-wrapper {
    padding: 0 12px 16px 12px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .bulletin .content-wrapper .content {
    line-height: 24px;
    font-size: 12px;
    color: #f01414;
  }
  .seller .bulletin .supports .support-item {
    padding: 16px 12px;
    font-size: 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .bulletin .supports .support-item:last-child {
    border: none;
  }
  .seller .bulletin .supports .support-item .icon {
    display: inline-block;
    vertical-align: top;
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }
  .seller .bulletin .supports .support-item .icon.decrease {
    background-image: url(img/decrease_4@3x.png);
  }
  .seller .bulletin .supports .support-item .icon.discount {
    background-image: url(img/discount_4@3x.png);
  }
  .seller .bulletin .supports .support-item .icon.guarantee {
    background-image: url(img/guarantee_4@3x.png);
  }
  .seller .bulletin .supports .support-item .icon.invoice {
    background-image: url(img/invoice_4@3x.png);
  }
  .seller .bulletin .supports .support-item .icon.special {
    background-image: url(img/special_4@3x.png);
  }
  .seller .bulletin .supports .support-item .text {
    line-height: 16px;
    font-size: 12px;
    color: #07111b;
  }
  .seller .pics {
    padding: 18px 0 18px 18px;
  }
  .seller .pics .title {
    margin-bottom: 12px;
    line-height: 14px;
    color: #07111b;
    font-size: 14px;
  }
  .seller .pics .pic-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }
  .seller .pics .pic-wrapper .pic-list {
    font-size: 0;
  }
  .seller .pics .pic-wrapper .pic-list .pic-item {
    display: inline-block;
    margin-right: 6px;
    width: 120px;
    height: 90px;
  }
  .seller .pics .pic-wrapper .pic-list .pic-item:last-child {
    margin: 0;
  }
  .seller .info {
    padding: 18px 18px 0 18px;
    color: #07111b;
  }
  .seller .info .title {
    padding-bottom: 8px;
    line-height: 14px;
    font-size: 14px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .seller .info .info-item {
    padding: 16px 12px;
    line-height: 16px;
    border: 1px solid rgba(7,17,27,0.1);
    font-size: 12px;
  }
  .seller .info .info-item:last-child {
    border: none;
  }
</style>
