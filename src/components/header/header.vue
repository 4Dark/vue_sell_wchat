<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" height="64" width="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">
            {{seller.name}}
          </span>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

    </div>
    <div class="bulletin-wrapper">
      <!--两个span 连接一起，消除空白间隙-->
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="showDetail"></i>
    </div>
    <div class="background">
      <!--此处不能缺少height 100%，否则图片不会收缩到header中-->
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <!--<transition name="fade">-->
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <!--图如果用span  安卓机器会变-->
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports" :key="item.id">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <!--图如果用span  安卓机器会变-->
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <!--@click   是v-on的缩写-->
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
      <!--</transition>-->
    </div>
  </div>

</template>

<script>
  import star from '../star/star'

  export default {
    components: {
      star
    },
    props: {
      seller: Object
    },
    data() {
      return {
        detailShow: false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    }
  }
</script>

<style scoped lang='stylus' rel="stylesheet/scss" type="text/stylus">
  @import "../../common/stylus/mixin.styl";
  /* 背景换成图片，模糊的效果：image标签，设置外层的容器，设置feut
  置于底部。。-1 宽高撑满
  */
  .header
    position: relative
    /*隐藏背景 filter 多余的 */
    overflow: hidden
    color: #fff;
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px;
      /*avatar 与content  两个span挨着有 之间有空白字符,有空隙*/
      font-size: 0;
      .avatar
        display: inline-block;
        vertical-align: top;
        img
          /* 图像 圆角*/
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            /* 行列元素 指定宽和高是不生效的,靠内容占据空间的  */
            display: inline-block;
            /*设置 品牌和内容的对齐方式*/
            vertical-align: top;
            width: 30px;
            height: 18px;
            /*背景  根据dpr 区分不同的背景图片*/
            bg-image('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          .name
            margin-left: 6px
            font-size: 16px;
            line-height: 18px
            /*加粗*/
            font-weight: bold

          .description
            margin-bottom: 10px;
            line-height: 12px;
            font-size: 12px;
          .support
            .icon
              display: inline-block
              vertical-align: top
              width: 12px
              height: 12px
              margin-top: 1px
              margin-right: 4px
              background-size: 12px 12px
              background-repeat: no-repeat
              /*根据不同的type 返回不通的class ，即不同的图标*/
              &.decrease
                bg-image('decrease_1')
              &.discount
                bg-image('discount_1')
              &.guarantee
                bg-image('guarantee_1')
              &.invoice
                bg-image('invoice_1')
              &.special
                bg-image('special_1')
            .text
              line-height: 12px
              /*在chrome 下最小的像素为12px*/
              font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        line-height: 20px
        border-radius: 14px
        background: rgba(0, 0, 0, 12)
        text-align: center
        .count
          vertical-align: center
          font-size: 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          vertical-align: center
          line-height: 24px
          font-size: 10px

    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      /*隐藏超出的部分*/
      white-space: nowrap
      /*超出隐藏的部分*/
      overflow: hidden
      /* text-overflow属性规定当文本溢出包含元素时发生的事情... */
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top 8px
        width: 22px;
        height: 12px;
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      /*滤镜的效果*/
      filter: blur(10px)
    //  css 浮层， 关闭按钮页面的最后， css sticky footers布局
    .detail
      position: fixed
      /*大于0*/
      z-index: 100
      /* 设置top  left  制成全屏效果*/
      top: 0
      left: 0
      width: 100%
      height: 100%
      /*滚动效果*/
      overflow: auto
      background: rgba(7, 17, 27, 0.8)

      /*      !*动画效果*!
            transition: all 0.5s
            //最终结果
              &.fade-transition
                opacity: 1
                background: rgba(7, 17, 27, 0.8)
              &.fade-enter, &.fade-leave
                opacity: 0
                background: rgba(7, 17, 27, 0)*/

      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          /*必须要。给close 留空间。关闭的位置,*/
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 30px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              /*水平线*/
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              font-size: 14px
          .supports
            width: 80%
            /*水平居中*/
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-buttom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 12px
                background-repeat: no-repeat
                /*根据不同的type 返回不通的class ，即不同的图标*/
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height: 16px
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both;
        font-size: 32px
</style>
