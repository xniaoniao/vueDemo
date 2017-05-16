<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" v-if="food.count || !showBuy" @click="addCart"></div>
    <div class="buy" v-else @click="addCart">加入购物车</div>
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      },
      showBuy: {
        type: Boolean,
        default: false
      }
    },
    created() {
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cartAdd', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count === 0) {
          Vue.set(this.food, 'count', 0);
        } else {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang="scss">
  $rem: 40;
  .cart-control {
    font-size: 0;
    .move-enter-active, .move-leave-active {
      transition: opacity .5s linear;
      transform: translate3D(0, 0, 0);
      .inner {
        font-size: 48/$rem+rem;
        line-height: 48/$rem+rem;
        color: rgb(0, 106, 220);
        display: inline-block;
        transition: opacity .5s linear;
        transform: rotate(0);
      }
    }
    .move-enter, .move-leave-active {
      opacity: 0;
      transform: translate3D(48/$rem+rem, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
    .cart-decrease {
      display: inline-block;
      padding: 12/$rem + rem;
      .inner {
        font-size: 48/$rem+rem;
        line-height: 48/$rem+rem;
        color: rgb(0, 106, 220);
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 24/$rem+rem;
      padding-top: 12/$rem+rem;
      line-height: 48/$rem+rem;
      color: rgb(147, 153, 159);
      text-align: center;
      font-size: 20/$rem+rem;
    }
    .cart-add {
      display: inline-block;
      padding: 12/$rem + rem;
      font-size: 48/$rem+rem;
      line-height: 48/$rem+rem;
      color: rgb(0, 106, 220);
    }
  }
</style>
