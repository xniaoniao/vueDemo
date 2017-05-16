<template>
  <div class="food-detail" ref="food">
    <div class="detail-content">
      <div class="food-img">
        <img :src="food.icon" alt="">
        <div class="back" @click="close">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="food-title">
        <span class="name">{{food.name}}</span>
        <div class="sell">
          <span class="sell">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="current-price">￥{{food.price}}</span><span class="old"
                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <VCartControl
          ref="cartControl"
          :food="food"
          :showBuy="true"
          @cartAdd="cartAdd"></VCartControl>
      </div>
      <VSplit v-show="food.info"></VSplit>
      <div class="food-introduce" v-show="food.info">
        <h1>商品介绍</h1>
        <span class="text">{{food.info}}</span>
      </div>
      <VSplit></VSplit>
      <VRatingSelect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent"
                     :desc="desc" @selectRating="selectRating" @chooseOnlyContent="chooseOnlyContent"></VRatingSelect>
      <div class="show-ratings-wrapper">
        <ul class="show-ratings" v-if="food.ratings && food.ratings.length !== 0">
          <li v-for="item in food.ratings" v-show="needShow(item.rateType, item.text)">
            <div class="user">
              <span>{{item.username}}</span>
              <img :src="item.avatar" alt="">
            </div>
            <div class="time">{{item.rateTime | formateDate}}</div>
            <div class="content">
              <span :class="{'icon-thumb_up': item.rateType === 0, 'icon-thumb_down': item.rateType == 1}"></span>
              <span class="text">{{item.text}}</span>
            </div>
          </li>
        </ul>
        <div v-else class="no-rating">暂无评价...</div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import VCartControl from '../cartcontrol/CartControl.vue';
  import VSplit from '../split/Split.vue';
  import {formateDate} from '../../common/js/formateDate';
  import VRatingSelect from '../ratingSelect/RatingSelect.vue';
  const ALL = 2;
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showDetail: false,
        selectType: ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    mounted() {
      this.showDetail = true;
      this.selectType = ALL;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    methods: {
      close() {
        this.$emit('close', this);
      },
      cartAdd(event) {
        this.$emit('cartAdd', event);
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      chooseOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    components: {
      VCartControl,
      VSplit,
      VRatingSelect
    },
    filters: {
      formateDate(time) {
        let date = new Date(time);
        return formateDate(date, 'YYYY-MM-DD hh:mm');
      }
    }
  };
</script>
<style lang="scss">
  @import "../../common/reset.css";
  @import "../../common/mixin.scss";

  $rem: 48.875;

  .food-detail {
    position: fixed;
    background: #fff;
    width: 100%;
    left: 0;
    bottom: 96/$rem+rem;
    height: 100%;
    .detail-content {
      font-size: 0;
      .food-img {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          top: 3.25rem;
          left: 20/$rem+rem;
          i {
            font-size: 28/$rem+rem;
          }
        }
      }
      .food-title {
        padding: 36/$rem+rem;
        position: relative;
        box-sizing: border-box;
        span.name {
          font-size: 28/$rem+rem;
          line-height: 28/$rem+rem;
          font-weight: 700;
        }
        .sell {
          margin-top: 16/$rem+rem;
          span {
            font-size: 20/$rem+rem;
            line-height: 20/$rem+rem;
            color: rgb(147, 153, 159);
            margin-right: 24/$rem+rem;
          }
        }
        .price {
          margin-top: 26/$rem+rem;
          span.current-price {
            color: rgb(240, 20, 20);
            font-size: 28/$rem+rem;
            font-weight: 700;
            line-height: 48/$rem+rem;
            margin-right: 30/$rem+rem;
          }
          span.old {
            color: rgb(147, 153, 159);
            font-size: 20/$rem+rem;
            line-height: 48/$rem+rem;
          }
        }
        .cart-control {
          position: absolute;
          right: 36/$rem+rem;
          bottom: 36/$rem+rem;
          z-index: 2;
        }
        .buy {
          width: 148/$rem+rem;
          height: 48/$rem+rem;
          border-radius: 24/$rem+rem;
          background: rgb(0, 160, 220);
          position: absolute;
          right: 36/$rem+rem;
          bottom: 46/$rem+rem;
          z-index: 5;
          font-size: 20/$rem+rem;
          color: #fff;
          line-height: 24/$rem+rem;
          text-align: center;
          padding: 12/$rem+rem;
        }
        .drop-enter {
          transition: all .2s;
        }
      }
      .food-introduce {
        padding: 36/$rem+rem;
        h1 {
          font-size: 28/$rem+rem;
          line-height: 28/$rem+rem;
          font-weight: 200;
          margin-bottom: 12/$rem+rem;
        }
        .text {
          font-size: 24/$rem+rem;
          color: rgb(77, 85, 93);
          line-height: 48/$rem+rem;
          font-weight: 200;
        }
      }
      .show-ratings-wrapper {
        ul {
          li {
            position: relative;
            margin: 0 36/$rem+rem;
            padding: 32/$rem+rem 0;
            border-bottom: 1px solid rgba(7, 17, 27, .1);
            .user {
              position: absolute;
              top: 26/$rem+rem;
              right: 0;
              span {
                @include font();
                margin-right: 12/$rem+rem;
              }
              img {
                width: 24/$rem;
                height: 24/$rem+rem;
                border-radius: 50%;
              }
            }
            .time {
              @include font();
              margin-bottom: 12/$rem+rem;
              font-size: 20/$rem+rem;
            }
            .content {
              span.icon-thumb_up, span.icon-thumb_down {
                font-size: 24/$rem+rem;
                line-height: 32/$rem+rem;
                margin-right: 8/$rem+rem;
              }
              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              span.text {
                font-size: 24/$rem+rem;
                line-height: 34/$rem+rem;
                line-height: 32/$rem+rem;
              }
            }
          }
        }
        .no-rating {
          font-size: 24/$rem+rem;
          color: rgb(147, 153, 159);
          margin: 0 32/$rem+rem;
          padding: 36/$rem+rem;
        }
      }
    }
  }
</style>
