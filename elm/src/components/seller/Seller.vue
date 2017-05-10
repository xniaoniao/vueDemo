<template>
  <div class="seller">
    seller
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
export default {
  mounted() {
    this.$store.commit('changeLinkBorderIndex', 2);
  },
  computed: {
    linkBorderIndex() {
      return this.$store.state.linkBorderIndex;
    }
  }
};
</script>
