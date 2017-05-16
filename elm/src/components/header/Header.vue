<template>
  <div id="header">
    <div id="content-wrapper">
      <div id="avatar">
        <img :src="seller.avatar" alt=""/>
      </div>
      <div id="content">
        <div id="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div id="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support" @click="showDetail">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div id="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div id="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="detail-title">{{seller.name}}</div>
            <Star :size="48" :score="seller.score"></Star>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="support">
              <li  v-for="(item, index) in seller.supports" class="supports-item">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin" v-if="seller.bulletin">
              <span>{{seller.bulletin}}</span>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from '../star/Star.vue';
export default {
  computed: {
      seller() {
          return this.$store.state.seller;
      }
  },
  data() {
      return {
          detailShow: false
      };
  },
  created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
      showDetail() {
          this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
    }
  },
  components: {
      Star
  }
 };
</script>
<style lang="scss" scoped>
@import "../../common/mixin.scss";
@import "../../common/reset.css";
  $rem: 48.875;
  #header{
    .support {
      .icon {
        display: inline-block;
        height: 24/$rem + rem;
        width: 24/$rem + rem;
        margin-right: 8/$rem + rem;
        background-size: 24/$rem + rem 24/$rem + rem;
        vertical-align: top;
        &.decrease {
          @include bg("decrease_1");
        }
        &.discount {
          @include bg("discount_1");
        }
        &.guarantee {
          @include bg("guarantee_1");
        }
        &.invoice {
          @include bg("invoice_1");
        }
        &.special {
          @include bg("special_1");
        }
      }
    }
    height: 268/$rem + rem;
    color: white;
    position: relative;
    background: rgba(7, 17,27,0.5);
    overflow: hidden;
    @include border(red);
    #content-wrapper {
        font-size: 0;
        /*vertical-align: top;*/
        padding-left: 48/$rem + rem;
        padding-top: 48/$rem + rem;
        position: relative;
         #avatar{
          display: inline-block;
          vertical-align: top;
          img {
            width: 128/$rem + rem;
            height: 128/$rem + rem;
            border-radius: 4/$rem + rem;

          }
        }
      #content {
        display: inline-block;
        font-size: 24/$rem + rem;
        margin-left: 32/$rem + rem;
        #title {
          margin: 4/$rem + rem 0 16/$rem+rem 0;
          .brand{
            width: 60/$rem + rem;
            height: 36/$rem + rem;
            display: inline-block;
            @include bg("brand");
            background-size: 60/$rem + rem 36/$rem + rem;
            vertical-align: top;
          }
          .name {
            margin-left: 12/$rem + ren;
            font-size: 32/$rem + rem;
            font-weight: bold;
            line-height: 36/$rem + rem;
          }
        }
        #description {
          line-height: 24/$rem + rem;
          font-size: 24/$rem + rem;
          margin-bottom: 20/$rem + rem;
          margin-top: 16/$rem + rem;
        }
      }
      #support-count {
        position: absolute;
        right: 24/$rem + rem;
        bottom: 0/$rem + rem;
        padding: 0 16/$rem + rem;
        height: 48/$rem + rem;
        line-height: 48/$rem + rem;
        border-radius: 28/$rem + rem;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
        .count {
          font-size: 24/$rem + rem;
        }
        .icon-keyboard_arrow_right {
          font-size: 24/$rem + rem;
        }
      }
    }
    #bulletin-wrapper {
      height: 56/$rem + rem;
      line-height: 56/$rem + rem;
      padding: 0 44/$rem + rem 0 24/$rem + rem;
      margin-top: 36/$rem+rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background:rgba(7,17,27,.2);
      position:relative;
      /*font-size: 0;*/
      .bulletin-title {
        width: 44/$rem+rem;
        display: inline-block;
        height: 24/$rem+rem;
       @include bg("bulletin");
        background-size: 44/$rem+rem 24/$rem+rem;
        vertical-align: top;
        margin-top:14/$rem+rem;
      }
      .bulletin-text {
        font-size: 20/$rem+rem;
        margin: 0 8/$rem + rem;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right {
        font-size: 20/$rem+rem;
        position: absolute;
        right: 18/$rem+rem;
        top: 18/$rem+rem;
      }
}
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10/$rem+rem);
    }
    .fade-enter-active {
      transition: all .3s ease;
    }
    .fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-active{
      transition: all .5s ease;
      opacity: 0;
      background: rgba(7,17,27, 0);
    }
    .detail {
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      left: 0;
      top: 0;
      background: rgba(7,17,27,0.8);
      backdrop-filter: blur(10/$rem+rem);
      .detail-wrapper {
        min-height: 100%;
        width:100%;
      }
      .detail-main {
        margin-top: 128/$rem+rem;
        padding-bottom: 128/$rem+rem;
        .detail-title {
          line-height: 32/$rem+rem;
          font-size: 32/$rem+rem;
          font-weight: 700;
          text-align: center;
        }
        .star {
          text-align: center;
          margin-top: 32/$rem + rem;
          height: 48/$rem + rem;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 60/$rem + rem auto 44/$rem+rem auto;
          .line {
            flex: 1;
            position: relative;
            top: -6/$rem + rem;
            border-bottom: 1px solid rgba(255,255,255,.2);
          }
          .text {
            padding: 0 24/$rem+rem;
            font-size: 14/$rem+rem;
            font-weight: 700;
          }
        }
        .support {
          width: 80%;
          margin: 48/$rem+rem auto 0;
          li {
            margin-bottom: 24/$rem+rem;
            padding: 0 24/$rem+rem;
            font-size: 0;
            &:last-child {
              margin: 0;
            }
            .icon {
              height: 32/$rem+rem;
              width: 32/$rem+rem;
              margin-right: 12/$rem+rem;
              background-size: 32/$rem+rem 32/$rem+rem;
            }
            .text {
              font-size: 24/$rem+rem;
              line-height: 24/$rem+rem;
              font-weight: 200;
              color:rgb(255,255,255)
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          span {
            font-size: 24/$rem+rem;
            font-weight: 200;
            line-height: 48/$rem+rem;
          }
        }
      }
      .detail-close {
        position: relative;
        width: 64/$rem+rem;
        height: 64/$rem+rem;
        margin: -128/$rem+rem auto 0 auto;
        font-size: 64/$rem+rem;
        .icon-close {
          font-size: 64/$rem+rem;
        }
      }
    }
  }

</style>
