<template>
   <div class="shop-cart">
     <div class="content" @click="toggleList">
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
     <transition name="fold">
       <div class="shop-list" v-show="showList" ref="showList">
         <div class="title">
           <h1>购物车</h1>
           <span class="empty" @click="empty">清空</span>
         </div>
         <div class="list-content">
           <ul>
             <li v-for="item in selectFoods" class="food-item">
               <span class="list-name">{{item.name}}</span>
               <span class="price">￥{{item.price * item.count}}</span>
               <div class="control-wrapper">
                 <VCartControl :food="item"></VCartControl>
               </div>
             </li>
           </ul>
         </div>
       </div>
     </transition>
     <div class="mask" v-show="showList" ref="mask" @click="toggleList">
       <transition name="show">
       </transition>
     </div>
   </div>
</template>
<script>
  var num = 0;
  import VCartControl from '../cartcontrol/CartControl.vue';
  import BScroll from 'better-scroll';
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
        balls: [],
        fold: true
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
      },
      showList() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          if (this._constructor) {
            return;
          }
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.showList, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
          this.$refs.mask.style.width = document.body.offsetWidth + 'px';
          this.$refs.mask.style.height = document.body.offsetHeight + 'px';
          this.$refs.mask.style.top = -document.body.offsetHeight + 'px';
        }
        return show;
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
            this.$set(ball, 'show', false);
          }, 200);
        });
      },
      removeBall(el) {
        const {name} = el.dataset;
        const index = this.balls.findIndex((ball) => ball.name === name);
        if (index >= 0) {
          this.balls.splice(index, 1);
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach((food) => {
            food.count = 0;
        });
      }
    },
    components: {
      VCartControl
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
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
        overflow: hidden;
        background: #fff;
        position: absolute;
        transition: all 1s;
      }

      .ball-enter-active {
        transition: all 0.1s;
      }

      .ball-leave-active {
        transition: all .6s,
        top 0.6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        opacity: 1;
      }

      .ball-enter, .ball-leave-to {
        opacity: 0;
      }

      .ball-leave-to {
        left: 0 !important;
        top: 0 !important;
      }
    }
    .shop-list {
      z-index: -1;
      position: absolute;
      left: 0;
      bottom: 2.4rem;
      width: 100%;
      .title {
        background: #f3f5f7;
        height: 80/$rem+rem;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        padding: 0 36/$rem+rem;
        h1 {
          font-size: 28/$rem+rem;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 80/$rem+rem;
          display: inline-block;
          float: left;
        }
        span.empty {
          color: rgb(0, 160, 220);
          font-size: 24/$rem+rem;
          line-height: 80/$rem+rem;
          float: right;
        }
      }
      .list-content {
        padding: 0 36/$rem+rem;
        max-height: 534/$rem+rem;
        overflow: hidden;
        background: #fff;
        .food-item {
          position: relative;
          height: 96/$rem+rem;
          padding: 24/$rem+rem 0;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          span.list-name {
            font-size: 28/$rem+rem;
            color: rgb(7, 17, 27);
            line-height: 48/$rem+rem;
          }
          span.price {
            margin-right: 180/$rem+rem;
            font-size: 28/$rem+rem;
            line-height: 48/$rem+rem;
            font-weight: 700;
            color: rgb(240, 20, 20);
            float: right;
          }
          .control-wrapper {
            position: absolute;
            right: 0;
            bottom: 12/$rem+rem;
          }
        }
      }
    }
    
    .fold-enter-active, .fold-leave-active {
      transition: all 5s;
      transform: translate3d(0, 100%, 0);
    }
     .fold-enter .fold-leave-active {
       transform: translate3d(0, 0, 0);
       transition: all 2s;
       opacity: 0
    }
  }
  .mask {
    background: rgba(7, 17, 27, .6);
    filter: blur(10px);
    position: absolute;
    z-index: -5;
    opacity: .6;
  }
  .show-enter-active, .show-leave-active {
    opacity: .6;
    transition: all .5s
  }
  .show-enter, .show-leave-active {
    opacity: 0
  }
</style>
