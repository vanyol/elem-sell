<template>
  <header>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail clearfix">
        <div class="detail-wrapper ">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
  import Star from '../star/star'

  export default {
    name: "Header",
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      Star
    }
  }
</script>

<style scoped>
  /*@import "../../common/css/icon.css";*/

  header {
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    color: #fff;
  }

  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }

  .content-wrapper .avatar {
    display: inline-block;
    vertical-align: top;
  }

  .content-wrapper .avatar img {
    display: inline-block;
    width: 64px;
    height: 64px;
    border-radius: 4px;
  }

  .content-wrapper .content {
    /*height: 64px;*/
    /*border: 1px solid #000;*/
    display: inline-block;
    margin-left: 16px;
    color: rgb(255, 255, 255);
  }

  .content-wrapper .content .title {
    margin: 2px 0 8px 0;
  }

  .content-wrapper .content .title .brand {
    display: inline-block;
    vertical-align: top;
    height: 18px;
    width: 30px;
    background-image: url(../../../resource/img/brand@3x.png);
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }

  .content-wrapper .content .title .name {
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    margin-left: 6px;
  }

  .content-wrapper .content .description {
    font-size: 12px;
    font-weight: 200;
    line-height: 12px;
    margin-bottom: 10px;
  }

  .content-wrapper .content .support .text {
    font-size: 10px;
    line-height: 12px;
    margin-bottom: 4px;
  }

  .content-wrapper .content .support .icon {
    display: inline-block;
    margin-right: 2px;
    vertical-align: top;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background-image: url(img/decrease_1@3x.png);
    background-size: 12px 12px;
    background-repeat: no-repeat;
  }

  .content-wrapper .content .support .icon.decrease {
    background-image: url(img/decrease_1@3x.png);
  }

  .content-wrapper .content .support .icon.discount {
    background-image: url(img/discount_1@3x.png);
  }

  .content-wrapper .content .support .icon.guarantee {
    background-image: url(img/guarantee_1@3x.png);
  }

  .content-wrapper .content .support .icon.invoice {
    background-image: url(img/invoice_1@3x.png);
  }

  .content-wrapper .content .support .icon.special {
    background-image: url(img/special_1@3x.png);
  }

  .content-wrapper .support-content {
    position: absolute;
    right: 12px;
    bottom: 14px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background: rgba(0, 0, 0, .2);
    text-align: center;
  }

  .content-wrapper .support-content .count {
    vertical-align: top;
    font-size: 10px;
  }

  .content-wrapper .support-content .icon-keyboard_arrow_right {
    margin-left: 2px;
    line-height: 24px;
    font-size: 10px;
  }

  .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, .2);
  }

  .bulletin-wrapper .bulletin-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background-image: url(img/bulletin@3x.png);
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }

  .bulletin-wrapper .bulletin-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }

  .bulletin-wrapper .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: all .5s;
    background: rgba(7, 17, 27, .8);
    backdrop-filter: blur(10px);
  }

  .detail.fade-enter-active,
  .detail.fade-leave-active {
    transition: opacity .5s
  }

  .detail.fade-enter,
  .detail.fade-leave-active {
    opacity: 0
  }

  .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }

  .detail-main {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .name {
    line-height: 16px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }

  .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }

  .detail-main .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px;
  }

  .detail-main .title .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }

  .detail-main .title .text {
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
  }

  .detail-main .supports {
    width: 80%;
    margin: 0 auto;
  }

  .detail-main .supports .support-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }

  .detail-main .supports:last-child {
    margin-bottom: 0;
  }

  .detail-main .supports .support-item .icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
  }

  .detail-main .supports .support-item .icon.decrease {
    background-image: url(img/discount_1@3x.png);
  }

  .detail-main .supports .support-item .icon.discount {
    background-image: url(img/discount_1@3x.png);
  }

  .detail-main .supports .support-item .icon.guarantee {
    background-image: url(img/guarantee_1@3x.png);
  }

  .detail-main .supports .support-item .icon.invoice {
    background-image: url(img/invoice_1@3x.png);
  }

  .detail-main .supports .support-item .icon.special {
    background-image: url(img/special_1@3x.png);
  }

  .detail-main .supports .support-item .text {
    font-size: 12px;
    line-height: 16px;
  }

  .detail-main .bulletin {
    width: 80%;
    margin: 0 auto;
  }

  .detail-main .content {
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0;
    clear: both;
    font-size: 32px;
  }
</style>
