<template>
  <div class="star" :class="starType">
    <!--track-by="$index"   视频上添加这个不报  循环的错误-->
    <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: Number,
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        // 4.5   /2  不是整除的意思， 4.6*2=9.2  9   9/2=4.5
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        //  补齐5个星星
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }

</script>

<style scoped lang='stylus' rel="stylesheet/stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl";
  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 100% 100%
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 100% 100%
        &:last-child
          margin-right: 0
        &.On
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 100% 100%
        &:last-child
          margin-right: 0
        &.On
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
