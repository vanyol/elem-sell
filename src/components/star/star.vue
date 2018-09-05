<template>
  <div class="star" :class="classType">
    <span v-for="state in states" :class="state" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    name: "star",
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number,
        default: 48
      }
    },
    computed: {
      classType() {
        return "star-" + this.size
      },
      states() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style scoped>
  .star {
    font-size: 0;
  }

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  .star.star-48 .star-item {
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
  }

  .star:last-child {
    margin-right: 0;
  }

  .star.star-48 .star-item.on {
    background-image: url(img/star48_on@3x.png);
  }

  .star.star-48 .star-item.half {
    background-image: url(img/star48_half@3x.png);
  }

  .star.star-48 .star-item.off {
    background-image: url(img/star48_off@3x.png);
  }

  .star.star-36 .star-item {
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
  }

  .star.star-36 .star-item.on {
    background-image: url(img/star36_on@3x.png);
  }

  .star.star-36 .star-item.half {
    background-image: url(img/star36_half@3x.png);
  }

  .star.star-36 .star-item.off {
    background-image: url(img/star36_off@3x.png);
  }

  .star.star-24 .star-item {
    width: 10px;
    height: 10px;
    margin-right: 3px;
    background-size: 10px 10px;
  }

  .star.star-24 .star-item.on {
    background-image: url(img/star24_on@3x.png);
  }

  .star.star-24 .star-item.half {
    background-image: url(img/star24_half@3x.png);
  }

  .star.star-24 .star-item.off {
    background-image: url(img/star24_off@3x.png);
  }

</style>
