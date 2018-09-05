<template>
  <div id="app">
    <top-header :seller="seller"></top-header>
    <div class="tab">
      <div class="tab-item ">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './components/header/Header'

  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    created(){
      this.$Axios.get('/api/seller').then(
      (res) => {
        if(res.data.errno==0){
          this.seller = res.data.data
        }
      })
    },
    components: {
      topHeader: Header,
    }
  }
</script>


<style scoped>
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
  }

  .tab .tab-item a {
    display: block;
    color: rgb(77, 85, 93);
  }

  .tab a.active {
    color: rgb(240, 20, 20);
  }

</style>
