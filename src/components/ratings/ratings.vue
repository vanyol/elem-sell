 <template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType" :only-content="onlyContent"
                     :ratings="ratings" ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-if="rating.deliveryTime">{{ rating.deliveryTime }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length">
                <i class="icon-thumb_up"></i>
                <span v-for="item in rating.recommend" class="item">{{ item }}</span>
              </div>
              <div class="time">
                {{ rating.rateTime | formatDate }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '../../common/js/Data'
  import star from '../star/star'
  import split from '../split/split'
  import ratingSelect from '../ratingselect/ratingselect'
  import BScroll from 'better-scroll'
  import Bus from '../../common/js/BusEvent'

  const ALL = 2
  const ERR_OK = 0

  export default{
    name: "ratings",
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created() {
      console.log(1)
      this.$Axios.get('/api/ratings').then((response) => {
        console.log(response)
        response = response.data
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            })
          })
        }
      })
      Bus.$on('ratingtype.select', selectType => {
        this.selectType = selectType
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      })
      Bus.$on('content.toggle', onlyContent => {
        this.onlyContent = onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      })
    },
    components: {
      star,
      ratingSelect,
      split
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    }
  }
</script>

<style scoped>
  .ratings {
    position: fixed;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .ratings .overview {
    display: flex;
    padding: 18px 0;
  }
  .ratings .overview .overview-left {
    flex: 0 0 137px;
    padding: 6px 0;
    width: 137px;
    border-right: 1px solid rgba(7,17,27,0.1);
    text-align: center;
  }
  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-left {
      flex: 0 0 120px;
      width: 120px;
    }
  }
  .ratings .overview .overview-left .score {
    margin-bottom: 6px;
    line-height: 28px;
    font-size: 24px;
    color: #ff9900;
  }
  .ratings .overview .overview-left .title {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 12px;
    color: #07111b;
  }
  .ratings .overview .overview-left .rank {
    line-height: 10px;
    font-size: 10px;
    color: #93999f;
  }
  .ratings .overview .overview-right {
    flex: 1;
    padding: 6px 0 6px 24px;
  }
  @media only screen and (max-width: 320px) {
    .ratings .overview .overview-right {
      padding-left: 6px;
    }
  }
  .ratings .overview .overview-right .score-wrapper {
    margin-bottom: 8px;
    font-size: 0;
  }
  .ratings .overview .overview-right .score-wrapper .title {
    display: inline-block;
    line-height: 18px;
    vertical-align: top;
    font-size: 12px;
    color: #07111b;
  }
  .ratings .overview .overview-right .score-wrapper .star {
    display: inline-block;
    vertical-align: top;
    margin: 0 12px;
  }
  .ratings .overview .overview-right .score-wrapper .score {
    display: inline-block;
    line-height: 18px;
    vertical-align: top;
    font-size: 12px;
    color: #ff9900;
  }
  .ratings .overview .overview-right .delivery-wrapper {
    font-size: 0;
  }
  .ratings .overview .overview-right .delivery-wrapper .title {
    font-size: 12px;
    color: #07111b;
  }
  .ratings .overview .overview-right .delivery-wrapper .delivery {
    margin-left: 12px;
    font-size: 12px;
    color: #93999f;
  }
  .ratings .rating-wrapper {
    padding: 0 18px;
  }
  .ratings .rating-wrapper .rating-item {
    display: flex;
    padding: 18px 0;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .ratings .rating-wrapper .rating-item .avatar {
    flex: 0 0 28px;
    width: 28px;
    margin-right: 12px;
  }
  .ratings .rating-wrapper .rating-item .avatar img {
    border-radius: 50%;
  }
  .ratings .rating-wrapper .rating-item .content {
    flex: 1;
    position: relative;
  }
  .ratings .rating-wrapper .rating-item .content .name {
    margin-bottom: 4px;
    line-height: 12px;
    font-size: 10px;
    color: #07111b;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper {
    margin-bottom: 6px;
    font-size: 0;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .star {
    display: inline-block;
    vertical-align: top;
    margin-right: 6px;
  }
  .ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
    display: inline-block;
    vertical-align: top;
    line-height: 12px;
    font-size: 10px;
    color: #93999f;
  }
  .ratings .rating-wrapper .rating-item .content .text {
    margin-bottom: 8px;
    line-height: 18px;
    color: #07111b;
    font-size: 12px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend {
    line-height: 16px;
    font-size: 0;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up,
  .ratings .rating-wrapper .rating-item .content .recommend .item {
    display: inline-block;
    margin: 0 8px 4px 0;
    font-size: 9px;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
    color: #00a0dc;
  }
  .ratings .rating-wrapper .rating-item .content .recommend .item {
    padding: 0 6px;
    border: 1px solid rgba(7,17,27,0.1);
    border-radius: 1px;
    color: #93999f;
    background: #fff;
    font-size: 9px;
  }
  .ratings .rating-wrapper .rating-item .content .time {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 12px;
    font-size: 10px;
    color: #93999f;
  }

</style>
