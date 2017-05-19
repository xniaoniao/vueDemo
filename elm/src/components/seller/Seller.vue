<template>
  <transition name="slide">
    <div class="seller-wrapper" ref="seller">
      <div class="seller">
        <div class="seller-content">
          <div class="sell-info">
            <div class="left">
              <h1>{{seller.name}}</h1>
              <VStar :size="36" :score="seller.score"></VStar>
              <span class="rating-count score">({{seller.ratingCount}})</span>
              <span class="sell-count score">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="detail-info">
            <ul>
              <li>
                <h3>起送价</h3>
                <span>{{seller.minPrice}}</span>
              </li>
              <li>
                <h3>商家配送费</h3>
                <span>{{seller.deliveryPrice}}</span>
              </li>
              <li>
                <h3>配送时间</h3>
                <span>{{seller.deliveryTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <VSplit></VSplit>
        <div class="bulletin">
          <h1>公告与活动</h1>
          <p>{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <VSplit></VSplit>
        <div class="shop-pic">
          <h1>商家实景图</h1>
          <div class="shop-list" ref="picScroll">
            <ul class="shop-img-list" ref="shopImgList">
              <li v-for="item in seller.pics">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
        </div>
        <VSplit></VSplit>
        <div class="shop-infos">
          <h1>商家信息</h1>
          <ul class="info-list">
            <li v-for="(item,index) in seller.infos">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
      <VShopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                 ></VShopcart>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
  @import "../../common/mixin.scss";
  @import "../../common/reset.css";

  $rem: 48.875;

  .seller-wrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 7.48338rem;
    width: 100%;
    height: 100%;
    h1 {
      font-size: 28/$rem+rem;
      color: rgb(7, 17, 27);
      font-size: 28/$rem+rem;
      margin-bottom: 16/$rem+rem;
    }
    .seller-content {
      margin: 36/$rem+rem;
      font-size: 0;
      .sell-info {
        padding-bottom: 36/$rem+rem;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        .left {
          .star {
            display: inline-block;
            margin-right: -20/$rem+rem;
            span {
              margin-right: 4/$rem+rem;
              line-height: 36/$rem+rem;
            }
          }
          span.score {
            margin-right: 24/$rem+rem;
            color: rgb(77, 85, 93);
            line-height: 36/$rem+rem;
            font-size: 20/$rem+rem;
            vertical-align: top;
          }
        }
      }
      .detail-info {
        padding-top: 36/$rem+rem;
        ul {
          display: flex;
          li {
            flex: 1;
            border-right: 1px solid rgba(7, 17, 27, .1);
            text-align: center;
            &:last-child {
              border: none;
            }
            h3 {
              font-size: 20/$rem+rem;
              line-height: 20/$rem+rem;
              color: rgb(147, 153, 159);
              margin-bottom: 8/$rem+rem;
            }
            span {
              font-size: 48/$rem+rem;
              color: rgb(7, 17, 27);
              line-height: 48/$rem+rem;
              font-weight: 200;
            }
          }
        }
      }
    }

    .bulletin {
      margin: 36/$rem+rem 36/$rem+rem 0;
      padding-bottom: 32/$rem+rem;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      h1 {
        margin-bottom: 16/$rem+rem;
      }
      p {
        padding: 0 24/$rem+rem;
        font-size: 24/$rem+rem;
        color: rgb(220, 20, 20);
        line-height: 48/$rem+rem;
        font-weight: 200;
      }
    }

    ul.supports {
      margin: 0 36/$rem+rem;
      li {
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        padding: 32/$rem+rem 24/$rem+rem;
        font-size: 0;
        .icon {
          display: inline-block;
          height: 32/$rem + rem;
          width: 32/$rem + rem;
          margin-right: 12/$rem + rem;
          background-size: 32/$rem + rem 32/$rem + rem;
          vertical-align: top;
          &.decrease {
            @include bg("decrease_4");
          }
          &.discount {
            @include bg("discount_4");
          }
          &.guarantee {
            @include bg("guarantee_4");
          }
          &.invoice {
            @include bg("invoice_4");
          }
          &.special {
            @include bg("special_4");
          }
        }
        .text {
          font-size: 24/$rem+rem;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 32/$rem+rem;
        }
      }
    }

    .shop-pic {
      margin: 36/$rem+rem;
      padding-bottom: 4.5rem;
      overflow: hidden;
      .shop-list {
        height: 100%;
        position: relative;
        ul {
          display: flex;
          position: absolute;
          left: 0;
          width: 100%;
          li {
            margin-right: 12/$rem+rem;
            flex: 1;
            img {
              width: 240/$rem+rem;
              height: 180/$rem+rem;
            }
          }
        }
      }

    }

    .shop-infos {
      margin: 36/$rem+rem 36/$rem+rem 0;
      h1 {
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        padding-bottom: 24/$rem+rem;
      }
      ul {
        li {
          padding: 36/$rem+rem 24/$rem+rem;
          border-bottom: 1px solid rgba(7, 17, 27, .1);
          span {
            color: rgb(7,17,27);
            font-size: 24/$rem+rem;
            line-height:32/$rem+rem;
            font-weight:200;
          }
        }
      }
    }
  }
</style>
<script>
  import VStar from '../../components/star/Star.vue';
  import VSplit from '../../components/split/Split.vue';
  import VShopcart from '../../components/shopcart/shopcart.vue';

  import BScroll from 'better-scroll';
  export default {
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 2);
      this._initScroll();
      this._initShopPic();
    },
    computed: {
      linkBorderIndex() {
        return this.$store.state.linkBorderIndex;
      },
      seller() {
        return this.$store.state.seller;
      }
    },
    watch: {
      seller() {
        this._initScroll();
        this._initShopPic();
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      _initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initShopPic() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let listWidth = (margin + picWidth) * this.seller.pics.length - margin;
          this.$refs.shopImgList.style.width = listWidth + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picScroll, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      VStar,
      VSplit,
      VShopcart
    }
  };
</script>
