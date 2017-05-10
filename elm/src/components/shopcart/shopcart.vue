<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper" ref="cart">
          <transition-group name="ball" @after-leave="removeBall">
            <span v-for="item in balls"
                  v-show="item.show"
                  :data-name="item.name"
                  :ref="item.name"
                  :key="item.name"
                  class="ball">
              <img :src="item.image" alt="item.name" v-if="item.image">
            </span>
          </transition-group>
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="selectFoods.length != 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalCount > 0}">{{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  var num = 0;
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: []
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      drop(source, image) {
        const ball = {show: true, name: `ball${num++}`, image};
        this.balls.push(ball);
        this.$nextTick(() => {
          const el = this.$refs[ball.name][0];
          const sourceRect = source.getBoundingClientRect();
          const cartRect = this.$refs.cart.getBoundingClientRect();
          el.style.left = (sourceRect.left - cartRect.left) + 'px';
          el.style.top = (sourceRect.top - cartRect.top) + 'px';
          setTimeout(() => {
            this.$set(ball, 'show', true);
          }, 200);
        });
      },
      removeBall(el) {
        const {name} = el.dataset;
        const index = this.balls.findIndex((ball) => ball.name === name);
        if (index >= 0) {
          this.balls.splice(index, 1);
        }
      }
    }
  };
</script>
<style lang="scss">
  $rem: 40;
  .shop-cart {
    position: fixed;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 96/$rem+rem;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -20/$rem+rem;
          padding: 12/$rem+rem;
          margin: 0 24/$rem+rem;
          width: 112/$rem+rem;
          height: 112/$rem+rem;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          vertical-align: top;
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 48/$rem+rem;
            height: 32/$rem+rem;
            text-align: center;
            border-radius: 32/$rem+rem;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 8/$rem+rem 16/$rem+rem rgba(0, 0, 0, .4);
            line-height: 32/$rem+rem;
            font-size: 18/$rem+rem;
          }
          .logo {
            width: 100%;
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            text-align: center;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              font-size: 48/$rem+rem;
              line-height: 88/$rem+rem;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 44/$rem+rem;
          margin-top: 24/$rem+rem;
          font-weight: 700;
          box-sizing: border-box;
          padding-right: 24/$rem+rem;
          border-right: 1px solid rgba(255, 255, 255, .1);
          font-size: 32/$rem+rem;
          color: rgba(255, 255, 255, .4);
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          line-height: 44/$rem+rem;
          vertical-align: top;
          margin: 24/$rem+rem 0 0 24/$rem+rem;
          color: rgba(255, 255, 255, .4);
          font-size: 20/$rem+rem;
        }
      }
      .content-right {
        flex: 0 0 210/$rem+rem;
        width: 210/$rem+rem;
        .pay {
          line-height: 96/$rem+rem;
          height: 96/$rem+rem;
          text-align: center;
          font-size: 24/$rem+rem;
          color: rgba(255, 255, 255, .4);
          font-weight: 700;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: white;
          }
        }
      }
      .ball {
        display: block;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow: 0 0 5px 0 rgba(0,0,0,0.5);
        overflow: hidden;
        background: #fff;
        position: absolute;
        transition: all 1s;
      }

      .ball-enter-active {
        transition: all 0.1s;
      }

      .ball-leave-active {
        transition:all .6s,
        top 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        opacity: 1;
      }

      .ball-enter, .ball-leave-to {
        opacity: 0;
      }

      .ball-leave-to {
        left: 0!important;
        top: 0!important;
      }
    }
  }
</style>
