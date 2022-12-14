<template>
  <div class="tab-bar" >
  <tab tab-title="Video" nav-path="/index/recommend/reVidelList"></tab>
    <tab nav-path="/issue">
      <img class="dy-btn" alt="" src="../../../assets/images/dy-btn.png">
    </tab>
  <tab tab-title="Profile" nav-path="/me"></tab>
  </div>
</template>

<script>
import Tab from './TabItem.vue';

export default {
  name: 'Tabbar',
  components: {
    Tab,
  },
};
</script>

<style lang="less" scoped>
  .tab-bar {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: #000000;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #cccccc;
    font-size: 16px;
    display: flex;
    justify-content: center;
    z-index: 9;
    .item {
      flex: 1;
      text-align: center;
    }
    .dy-btn {
      display: inline-block;
      width: 50px;
      height: 30px;
      margin: 10px;
    }
  }
</style>
