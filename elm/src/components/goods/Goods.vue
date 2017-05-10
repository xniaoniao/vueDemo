<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{current: currentIndex == index}"
            @click="selectMenu(index, $event)">
            <span class="text">
              <span v-if="item.type>0" class="icon" :class="classMap[seller.supports[index].type]"></span>
              {{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="current-price">￥{{food.price}}</span>
                  <span v-show="food.oldPrice">{{food.ordPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <VCartControl :food="food" @cartAdd="_drop($event, food)"></VCartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <VShopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
               :select-foods="selectFoods" ref="shopCart"></VShopCart>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import VShopCart from '../shopcart/shopcart.vue';
  import VCartControl from '../cartcontrol/CartControl.vue';

  export default {
    beforeCreate() {
      this.$store.dispatch('getGoodsData').then(() => {
        this.initScroll();
        this.calculateHeight();
      });
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 0);
      this.$on('cartAdd', this.target);
    },
    computed: {
      linkBorderIndex() {
        return this.$store.state.linkBorderIndex;
      },
      seller() {
        return this.$store.state.seller;
      },
      goods() {
        return this.$store.state.goods;
      },
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let currentHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];
          if (!nextHeight || (this.scrollY >= currentHeight && this.scrollY < nextHeight)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        if (this.goods.length > 0) {
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count) {
                foods.push(food);
              }
            });
          });
        }
        return foods;
      }
    },
    data() {
      return {
        listHeight: [],
        scrollY: 0
      };
    },
    methods: {
      initScroll() {
        this.$nextTick(() => {
          this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
            click: true
          });
          this.foodWrapper = new BScroll(this.$refs.foodsWrapper, {
            probeType: 3,
            click: true
          });
          this.foodWrapper.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
          });
        });
      },
      calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (var i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodWrapper.scrollToElement(el, 300);
      },
      _drop(data, food) {
        this.$nextTick(() => {
          this.$refs.shopCart.drop(data, food.icon);
        });
      }
    },
    components: {
      VShopCart,
      VCartControl
    }
  };
</script>
<style lang="scss">
  @import "../../common/mixin.scss";
  @import "../../common/reset.css";

  $rem: 40;
  .goods {
    display: flex;
    position: absolute;
    top: 348/$rem+rem;
    bottom: 92/$rem+rem;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 160/$rem+rem;
      width: 160/$rem+rem;
      background: #f3f5f7;
      .current {
        position: relative;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text {
          border: none;
        }
      }
      .icon {
        display: inline-block;
        height: 24/$rem + rem;
        width: 24/$rem + rem;
        margin-right: 4/$rem + rem;
        background-size: 24/$rem + rem 24/$rem + rem;
        vertical-align: top;
        &.decrease {
          @include bg("decrease_3");
        }
        &.discount {
          @include bg("discount_3");
        }
        &.guarantee {
          @include bg("guarantee_3");
        }
        &.invoice {
          @include bg("invoice_3");
        }
        &.special {
          @include bg("special_3");
        }
      }
      .menu-item {
        display: table;
        height: 108/$rem+rem;
        width: 160/$rem+rem;
        line-height: 28/$rem+rem;
        .text {
          font-size: 24/$rem+rem;
          display: table-cell;
          vertical-align: middle;
          width: 112/$rem+rem;
          padding: 0 24/$rem+rem;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 28/$rem+rem;
        height: 52/$rem+rem;
        line-height: 53/$rem+rem;
        font-size: 24/$rem+rem;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        display: flex;
        margin-top: 36/$rem+rem;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        padding-bottom: 36/$rem+rem;
        position: relative;
        &:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57/$rem+rem;
          margin-right: 20/$rem+rem;
          padding-left: 36/$rem+rem;
        }
        .content {
          flex: 1;
          .name {
            margin: 4/$rem+rem 0 16/$rem+rem 0;
            color: rgb(7, 17, 27);
            line-height: 28/$rem+rem;
            font-size: 28/$rem+rem;
          }
          .desc {
            font-size: 20/$rem+rem;
            color: rgb(147, 153, 159);
            margin: 16/$rem+rem 0;
          }
          .extra {
            color: rgb(147, 153, 159);
            font-size: 0;
            span {
              font-size: 20/$rem+rem;
              margin-right: 24/$rem+rem;
            }
          }
          .price {
            span.current-price {
              font-size: 28/$rem+rem;
              color: red;
              font-weight: 700;
              line-height: 48/$rem+rem;
            }
          }
          .cart-control-wrapper {
            position: absolute;
            bottom: 24/$rem+rem;
            right: 36/$rem+rem;
          }
        }
      }

    }
  }
</style>
