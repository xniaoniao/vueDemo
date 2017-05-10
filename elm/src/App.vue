<template>
  <div id="app">
    <VHeader></VHeader>

    <VTab></VTab>

    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import VHeader from './components/header/Header.vue';
import VTab from './components/tab/Tab.vue';
export default {
  name: 'app',
  components: {
      VHeader,
      VTab
  },
  beforeCreate() {
    this.$store.dispatch('getSellerData');
  }
};
</script>
<style lang="scss">
</style>
