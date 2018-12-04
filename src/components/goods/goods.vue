<template>
  <div class="goods">
    <!--food-wrapper一定要用中划线，而不能用驼峰命名？？新的版本不需要了-->
    <div class="menu-wrapper" ref="meunWrapper">
      <ul>
        <!-- 当 遍历goods的时候，会有一个$index的值，如果这个index 和currentIndex 相等，就会被设置current的样式-->
        <li v-for="(item,index) in goods" :key=index class="menu-item" :class="{'current':currentIndex===index}"
            @click="selectMenu(index,$event)">
          <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <!--当这个class 只是为了让js选择的话，加上-hook-->
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" :key="food.id" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">

              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月销{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart>test</shopcart>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'

  const ERR_OK = 0
  export default {
    components: {
      shopcart
    },
    props: {
      seller: Object
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          // 不能滚动的原因，因为计算高度，初始化BScroll ，在vue更新dom 时候，是异步更新，虽然改变数据。但是高度计算出错
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    // 计算属性
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    data() {
      return {
        goods: [],
        // 每个区间的高度
        listHeight: [],
        scrollY: 0
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          //  浏览器原生的点击事件
          return
        }
        this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
        // let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
        // let el = foodList[index]
        // this.foodsScroll.scrollToElement(el, 300)
        // console.log(index)
      },
      _initScroll() {
        // 此处用驼峰命名获取值
        this.meunScroll = new BScroll(this.$refs.meunWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          // 滚动，实时检测到位置
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight() {
        let foodlist = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style scoped lang='stylus' rel="stylesheet/scss" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      /* 等分？ 内容不足等缩放形式？ 占位空间？*/
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        /*多行垂直居中*/
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          max-resolution: -1px
          z-index: 10
          background: #fff
          font-width: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-top: 1px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          /*根据不同的type 返回不通的class ，即不同的图标*/
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-left: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size: 10px
              color: rgb(147, 153, 159)
</style>
