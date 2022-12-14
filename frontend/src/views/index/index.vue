<template>
  <div class="home-content">
    <!-- <topBar></topBar> -->
    <router-view  :dataList="videos"></router-view>
  </div>
</template>

<script>
// import topBar from '@/common/components/top/TopBar.vue';
export default {
  name: 'Index',
  data() {
    return {
      videos: [],
    };
  },
  // components: {
  //   topBar,
  // },
  mounted() {
    this.$router.push({ path: 'reVidelList' }).catch(() => {});
  },
};
</script>

<style lang="less" scoped>
.home-content {
  background: #000;
  // height: 100vh;
}
</style>
