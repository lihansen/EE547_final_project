<template>
<!-- right info -->
  <div class="right-bar">
    <div class="rightbar-item">
      <div class="avatar-border">
        <!-- author -->
        <img
          src="../../../assets/images/avatar-1.jpg"
          style="width: 40px;height: 40px; border-radius: 50%"
          alt
        />
        <!-- btn -->
        <span
          class="iconfont icon-jia2"
          style="color:#FE2C5A;position: absolute;left: 15px;bottom: -12px;font-size: 20px"
        ></span>
      </div>
    </div>
    <!-- like -->
    <div class="item-icon">
      <span class="iconfont icon-dianzan" :class="{'active':is}"></span>
      <p>1</p>
    </div>
    <!-- comment -->
    <div class="item-icon" @click.stop="showCom($event)">
      <span class="iconfont icon-xiaoxi"></span>
      <!-- <p>comments</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightBar',
  props: ['isshow'],
  data() {
    return {
      is: this.isshow,
    };
  },
  methods: {
    showCom(e) {
      e.preventDefault();
      this.$emit('changeCom', this.showComment);
    },
  },
};
</script>

<style lang="less" scoped>
.right-bar {
  display: flex;
  width: 70px;
  flex-direction: column;
  .rightbar-item {
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    padding-bottom: 10px;
  }

  .avatar-border {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-icon {
    height: 60px;
    text-align: center;
    padding-bottom: 10px;
    .active{
      color:red;
    }
  }

  .iconfont {
    color: #ffffff;
    font-size: 30px;
  }

  p {
    color: #ffffff;
    font-size: 14px;
    padding: 0px;
    margin: 5px 0 0 0;
  }

  .right-music {
    height: 54px;
    line-height: 54px;
    width: 54px;
    background: #2e2e2e;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: round 6s linear infinite;
  }

  @keyframes round {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
