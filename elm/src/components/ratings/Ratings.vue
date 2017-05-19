<template>
  <transition name="slide">
    <div class="ratings" ref="ratings">
      <div class="ratings-wrapper">
        <div class="overview">
          <div class="left-scores">
            <h1 class="scores">{{seller.score}}</h1>
            <p class="text">综合评分</p>
            <p class="up">高于周边商家{{seller.rankRate}}%</p>
          </div>
          <div class="right-scores">
            <div class="server">
              <span class="text">商品评价</span>
              <VStar :size="36" :score="seller.foodScore" class="star"></VStar>
              <span class="scores">{{seller.score}}</span>
            </div>
            <div class="server">
              <span class="text">服务态度</span>
              <VStar :size="36" :score="seller.serviceScore" class="star"></VStar>
              <span class="scores">{{seller.serviceScore}}</span>
            </div>
            <div class="server">
              <span class="text">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <VSplit></VSplit>
        <VRatingSelect :ratings="ratings" @chooseOnlyContent="chooseOnlyContent" :onlyContent="onlyContent"
                       :desc="desc" :selectType="selectType" @selectRating="selectRating"></VRatingSelect>
        <div class="show-ratings">
          <ul class="ratings-wrapper">
            <li v-for="item in ratings" class="user-ratings"  v-show="needShow(item.rateType, item.text)">
              <div class="img">
                <img :src="item.avatar" alt="">
              </div>
              <div class="ratings-content">
                <div class="rating-info">
                  <span class="user">{{item.username}}</span>
                  <VStar :size="24" :score="item.score"></VStar>
                  <span class="deliveryTime" v-show="item.deliveryTime && item.deliveryTime != ''">{{item.deliveryTime}}
                    分钟送达</span>
                  <span class="time">{{item.rateTime | formateDate}}</span>
                </div>
                <div class="text">{{item.text}}</div>
                <div class="recommend" v-show="item.recommend && item.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span v-for="recommend in item.recommend" class="recommend-list">{{recommend}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
</style>
<script>
  import VSplit from '../split/Split.vue';
  import VStar from '../star/Star.vue';
  import VRatingSelect from '../ratingSelect/RatingSelect.vue';
  import BScroll from 'better-scroll';
  import {formateDate} from '../../common/js/formateDate';
  const ALL = 2;
  export default {
    beforeCreate() {
      this.$store.dispatch('getGoodsRatings').then(() => {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      });
    },
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 1);
      this.onlyContent = false;
    },
    computed: {
      linkBorderIndex() {
        return this.$store.state.linkBorderIndex;
      },
      seller() {
        return this.$store.state.seller;
      },
      ratings() {
        return this.$store.state.ratings;
      }
    },
    components: {
      VSplit,
      VStar,
      VRatingSelect
    },
    data() {
      return {
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        selectType: ALL
      };
    },
    methods: {
      chooseOnlyContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      selectRating(type) {
        this.selectType = type;
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
    filters: {
      formateDate(time) {
        let date = new Date(time);
        return formateDate(date, 'YYYY-MM-DD hh:mm');
      }
    }
  };
</script>
<style lang="scss">
  @import "../../common/transition";

  $rem: 48.875;
  .item a.router-link-active {
    color: red;
  }

  .ratings {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 100%;
    top: 7.48338rem;
    .overview {
      display: flex;
      padding: 36/$rem+rem 48/$rem+rem;
      .left-scores {
        flex: 0 0 275/$rem+rem;
        border-right: 1px solid rgba(7, 17, 27, .1);
        text-align: center;
        .scores {
          font-size: 48/$rem+rem;
          color: rgb(255, 153, 0);
          line-height: 56/$rem+rem;
          margin-bottom: 12/$rem+rem;
        }
        .text {
          color: rgb(7, 17, 27);
          font-size: 24/$rem+rem;
          line-height: 24/$rem+rem;
          margin-bottom: 16/$rem+rem;
        }
        .up {
          font-size: 20/$rem+rem;
          color: rgb(147, 153, 159);
          line-height: 20/$rem+rem;
          margin-bottom: 12/$rem+rem;
        }
      }
      .right-scores {
        flex: 1;
        padding-left: 48/$rem+rem;
        .server {
          margin-bottom: 16/$rem+rem;
          position: relative;
          .text {
            font-size: 24/$rem+rem;
            line-height: 36/$rem+rem;
            color: rgb(7, 17, 27);
            margin: 24/$rem+rem 0;
          }
          .star {
            display: inline-block;
            margin-top: 10/$rem+rem;
            span {
              margin-right: 4/$rem+rem;
              line-height: 36/$rem+rem;
            }
          }
          .scores {
            font-size: 24/$rem+rem;
            color: rgb(255, 153, 0);
            line-height: 36/$rem+rem;
            position: absolute;
            right: 0;
            top: 14/$rem+rem;
          }
          .time {
            font-size: 24/$rem+rem;
            line-height: 36/$rem+rem;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
    .show-ratings {
      .ratings-wrapper {
        .user-ratings {
          margin: 36/$rem+rem;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          display: flex;
          .img {
            margin-right: 24/$rem+rem;
            flex: 0 0 56/$rem+rem;
            img {
              width: 56/$rem+rem;
              height: 56/$rem+rem;
              border-radius: 50%;
            }
          }
          .ratings-content {
            flex: 1;
            .rating-info {
              position: relative;
              font-size: 0;
              .user {
                font-size: 20/$rem+rem;
                line-height: 24/$rem+rem;
                color: rgb(7, 17, 27);
              }
              .time {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 20/$rem+rem;
                line-height: 24/$rem+rem;
                color: rgb(147, 153, 157);
                font-weight: 200;
              }
              .star {
                margin-bottom: 16/$rem+rem;
                margin-top: 8/$rem+rem;
              }
              .deliveryTime {
                position: absolute;
                top: 34/$rem+rem;
                left: 200/$rem+rem;
                color: rgb(147, 153, 157);
                font-size: 20/$rem+rem;
              }
            }
            .text {
              font-size: 24/$rem+rem;
              line-height: 36/$rem+rem;
              color: rgb(7, 17, 27);
              margin-bottom: 16/$rem+rem;
            }
            .recommend {
              margin-bottom: 36/$rem+rem;
              .icon-thumb_up {
                font-size: 24/$rem+rem;
                color: rgb(0, 160, 200);
                margin-right: 16/$rem+rem;
              }
              .recommend-list {
                display: inline-block;
                border: 1px solid rgba(7, 17, 27, .1);
                margin-right: 16/$rem+rem;
                line-height: 32/$rem+rem;
                font-size: 18/$rem+rem;
                color: rgb(147, 153, 159);
              }
            }
          }
        }
      }
    }
  }
</style>
