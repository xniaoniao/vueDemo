<template>
  <div class="ratings">
    ratings
  </div>
</template>
<style lang="scss" scoped>
  .item a.router-link-active {
    color: red;
  }
</style>
<script>
  export default {
    mounted() {
      this.$store.commit('changeLinkBorderIndex', 1);
    },
    computed: {
      linkBorderIndex() {
        return this.$store.state.linkBorderIndex;
      }
    }
  };
</script>
