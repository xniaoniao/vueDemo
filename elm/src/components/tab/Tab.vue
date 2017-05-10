<template>
  <div class="tab">
    <div v-bind:class="{link: linkBorderIndex==1}" class="item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div v-bind:class="{link: linkBorderIndex==2}" class="item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div v-bind:class="{link: linkBorderIndex==3}" class="item">
      <router-link to="/seller">商家</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../common/mixin.scss";
$rem:40;
  .tab {
    display: flex;
    height: 80/$rem+rem;
    border-bottom: 1px solid rgba(7,17,27,.1);
    .item {
      flex: 1;
      text-align: center;
      @include border(rgba(7,17,27,.1));
      a {
        color: rgb(77,85,93);
        font-size: 28/$rem + rem;
        line-height: 80/$rem+rem;
      }
      a.router-link-active {
        color: red;
      }
    }
  }
</style>
<script>
  export default {
      computed: {
        linkBorderIndex() {
          return this.$store.state.linkBorderIndex;
        }
      }
  };
</script>
