<template>
    <div class="top-bar">
      <div class="left" @click="toLive">
        <span class="iconfont icon-zhibo"></span>
      </div>
      <div class="center">
        <TopItem title="follow" nav-path="/index/follows/reVidelList"></TopItem>
        <TopItem title="recommands" nav-path="/index/recommend/reVidelList"></TopItem>
      </div>
      <div class="right" @click="toSearch">
        <span class="iconfont icon-icon_search"></span>
      </div>
    </div>
</template>

<script>
import TopItem from './TopItem.vue';

export default {
  name: 'Topbar',
  components: {
    TopItem,
  },
  data() {
    return {
      topIndex: 1,
    };
  },
  methods: {
    toLive() {
      console.log('toLive');
    },
    toSearch() {
      console.log('toSearch');
    },
  },
};
</script>

<style lang="less" scoped>
  .top-bar {
    // background: #000000;
    z-index: 999;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #686868;
    display: flex;
    box-sizing: border-box;
    position: fixed;
    .left {
      width: 20%;
      padding-left: 10px;
      .icon-zhibo {
        font-size: 25px;
      }
    }
    .center {
      flex: 1;
      display: flex;
      justify-content: center;
      .item {
        flex: 1;
        text-align: center;
        span {
          padding: 2px 0px;
          text-align: center;
          position: relative;
        }
        .active {
          color: #ffffff;
          &:after {
            content: "";
            height: 1px;
            width: 30px;
            left: 3px;
            bottom: -2px;
            position: absolute;
            background: #ffffff;
          }
        }
      }
    }
    .right {
      width: 20%;
      padding-right: 10px;
      text-align: right;
      .icon-icon_search {
        font-size: 25px;
      }
    }
  }
</style>
