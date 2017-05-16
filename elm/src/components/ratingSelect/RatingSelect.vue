<template>
  <div class="food-ratings">
    <div class="title">
      <h1>商品评价</h1>
      <ul class="title-list">
        <li class="all" :class="{active: activeType === 2}" @click="selectRatingType(2, $event)">
          <span class="all-ratings">{{desc.all}}</span>
          <span>{{all}}</span>
        </li>
        <li class="positive" :class="{active: activeType === 0}" @click="selectRatingType(0, $event)">
          <span class="recommend-ratings">{{desc.positive}}</span>
          <span>{{positive}}</span>
        </li>
        <li class="ragetive" :class="{active: activeType === 1}" @click="selectRatingType(1, $event)">
          <span class="bad-ratings">{{desc.negative}}</span>
          <span>{{negative}}</span>
        </li>
      </ul>
    </div>
    <div class="switch" @click="selectOnlyContent($event)">
      <span class="icon-check_circle" ref="icon" :class="{'on': onlyContent}"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '满意',
            positive: '不满意',
            negative: '吐槽'
          };
        }
      }
    },
    data() {
      return {
        activeType: this.selectType
      };
    },
    computed: {
      all() {
        return this.ratings.length;
      },
      positive() {
        let count = 0;
        if (this.ratings) {
          this.ratings.forEach((rating) => {
            if (rating.rateType === POSITIVE) {
              count += 1;
            }
          });
          return count;
        }
      },
      negative() {
        let count = 0;
        if (this.ratings) {
          this.ratings.forEach((rating) => {
            if (rating.rateType === NEGATIVE) {
              count += 1;
            }
          });
          return count;
        }
      }
    },
    methods: {
      selectRatingType(type, event) {
        if (!event._constructed) {
          return;
        }
        this.activeType = type;
        this.$emit('selectRating', type);
      },
      selectOnlyContent(event) {
        if (!event._constructed) {
          return;
        }
        this.$emit('chooseOnlyContent', this.onlyContent);
      }
    }
  };
</script>
<style lang="scss">
  @import "../../common/reset.css";

  $rem: 40;
  .food-ratings {
    .title {
      margin: 36/$rem+rem 36/$rem+rem 0;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      padding-bottom: 36/$rem+rem;
      h1 {
        font-size: 28/$rem+rem;
        line-height: 28/$rem+rem;
        font-weight: 200;
        margin-bottom: 36/$rem+rem;
      }
      .title-list {
        li {
          margin-right: 16/$rem+rem;
          padding: 16/$rem+rem;
          width: 130/$rem+rem;
          font-size: 24/$rem+rem;
          border-radius: 2/$rem+rem;
          display: inline-block;
          text-align: center;
          box-sizing: border-box;
          line-height: 32/$rem+rem;
        }
        .all {
          color: rgb(77, 85, 93);
          background: rgba(0, 160, 220, .2);
          span {
            font-size: 10/$rem+rem;
          }
        }
        .positive {
          background: rgba(0, 160, 220, .2);
          color: rgb(77, 85, 93);
          span {
            font-size: 10/$rem+rem;
          }
        }
        .ragetive {
          background: rgba(77, 85, 93, .2);;
          color: rgb(77, 85, 93);
          span {
            font-size: 10/$rem+rem;
          }
        }
        li.active {
          background: rgb(0, 160, 220);
          color: #fff;
        }
      }
    }
    .switch {
      padding: 24/$rem+rem 36/$rem+rem;
      border-bottom: 1px solid rgba(7, 17, 27, .1);
      span.icon-check_circle {
        font-size: 48/$rem+rem;
        color: rgb(147, 153, 159);
        line-height: 48/$rem+rem;
      }
      span.on {
        color: #00c850;
      }
      span.text {
        margin-right: 8/$rem+rem;
        font-size: 24/$rem+rem;
        color: rgb(147, 153, 159);
        vertical-align: top;
        line-height: 48/$rem+rem;
      }
    }
  }

</style>
