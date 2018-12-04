<template>
  <div>
    <!--<img src="./assets/logo.png">-->
    <!--<router-view/>-->
    <!--v-bind 缩写 :seller-->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>

      </div>
    </div>
    <div class="content">

    </div>
    <!--路由外链，当改变路由，会刷新该处当内容-->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header'

  const ERR_OK = 0
  export default {
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        console.log(response.body.errno)
        if (response.body.errno === ERR_OK) {
          this.seller = response.body.data
          console.log(this.seller.avatar)
        }
      })
    }
  }
</script>

<style lang='stylus' rel="stylesheet/scss" type="text/stylus">
  @import 'common/stylus/index.styl';

  .tab
    /*弹性布局*/
    display: flex
    width: 100%
    height: 40px
    /*行高*/
    line-height: 40px
    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        /*否则只有点击字体才能变化*/
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
    .tab-item > .active
      color: rgb(240, 20, 20)
</style>
