<template>
  <div class="star" :class="starType">
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>
<style lang="scss">
  @import "../../common/mixin.scss";
  $rem: 40;
  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star_48 {
      .star-item {
        width: 40/$rem+rem;
        height: 40/$rem+rem;
        margin-right: 44/$rem+rem;
        background-size: 40/$rem+rem 40/$rem+rem;
        display: inline-block;
        background-repeat: no-repeat;
      }
      &:last-child {
        margin-right: 0;
      }
      .on {

        @include bg('star48_on');
      }
      .half {
        @include bg('star48_half');
      }
      .off {
        @include bg('star48_off');
      }
    }
    &.star_36 {
      &:last-child {
        margin-right: 0;
      }
      .star-item {
        display: inline-block;
        background-repeat: no-repeat;
        width: 30/$rem+rem;
        height: 30/$rem+rem;
        margin-right: 32/$rem+rem;
        background-size: 30/$rem+rem 30/$rem+rem;
      }
      &.on {
        @include bg('star36_on');
      }
      &.half {
        @include bg('star36_half');
      }
      &.off {
        @include bg('star36_off');
      }
    }
    &.star_24 {
      &:last-child {
        margin-right: 0;
      }
      .star-item {
        display: inline-block;
        background-repeat: no-repeat;
        width: 20/$rem+rem;
        height: 20/$rem+rem;
        margin-right: 12/$rem+rem;
        background-size: 20/$rem+rem 20/$rem+rem;
      }
      &.on {
        @include bg('star24_on');
      }
      &.half {
        @include bg('star24_half');
      }
      &.off {
        @include bg('star24_off');
      }
    }
  }
</style>
<script>
  const CLSON = 'on';
  const CLSHALF = 'half';
  const CLSOFF = 'off';
  const LENGTH = 5;

export default {
   props: {
       size: {
           type: Number
       },
      score: {
           type: Number
      }
   },
  computed: {
       starType() {
           return 'star_' + this.size;
       },
      itemClasses() {
          let result = [];
          let score = Math.floor(this.score * 2) / 2;
          let hasDecimal = score % 2 !== 0;
          let interger = Math.floor(score);
          for (let i = 0; i < interger; i++) {
              result.push(CLSON);
          }
          if (hasDecimal) {
              result.push(CLSHALF);
          }
          while (result.length < LENGTH) {
              result.push(CLSOFF);
          }
          return result;
      }
  }
};
</script>
