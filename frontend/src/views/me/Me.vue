<template>
  <!-- My profile -->
  <div class="me">
    <div class="me-top" :style="bgPic">
      <div class="menu-box">
        <i class="iconfont icon-update"></i>
      </div>
       <div class="menu-box">
        <div class="menu-icon"></div>
      </div>
    </div>
    <div class="me-wrap">
      <div class="me-content">
        <div class="info">
          <img class="info_img" src="../../assets/images/avatar-1.jpg" alt />
          <button class="btn">Edit</button>
        </div>
        <div class="des">
          <span class="dy_name">Test</span>
          <!-- <span class="span_dy"><i class="iconfont icon-erweima"></i></span> -->
        </div>
        <div class="user-tag">
          <p>A student in USC, learning ee547 this semester</p>
          <span>#animal</span>
          <span>#food</span>
          <span>#travel</span>
        </div>
      </div>
      <div class="me-tab">
        <div class="me-navbar">
          <div class="item"
          @click="changeTab(0)" :class="indexTab === 0? 'active' :'' ">My Videos</div>
          <div class="item"
          @click="changeTab(1)" :class="indexTab === 1? 'active' :'' ">Private</div>
          <div class="item"
          @click="changeTab(2)" :class="indexTab === 2 ? 'active' :'' ">Likes</div>
          <div class="item"
          @click="changeTab(3)" :class="indexTab === 3 ? 'active' :'' ">ALbum</div>
        </div>

        <div class="tab-wrap">
          <div class="tab-con" v-show="indexTab === 0">
            <div class="tab-img">
              <img src="../../assets/images/christmas.jpg" />
              <!-- <img src="../../assets/images/run.jpg" /> -->
              <img src="../../assets/images/rabbit.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Me',
  data() {
    return {
      bgPic: {
        // eslint-disable-next-line global-require
        backgroundImage: `url(${require('../../assets/images/me_bg.png')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      },
      indexTab: 0,
    };
  },
  methods: {
    changeTab(index) {
      this.indexTab = index;
    },
  },
};
</script>

<style lang="less" scoped>
.me {
  position: relative;
  .me-top {
    height: 160px;
    display: flex;
    justify-content: flex-end;
    padding: 20px;

    .menu-box {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 4px;
      .iconfont{
        font-size: 25px;
        color: #ffffff;
      }
      .menu-icon {
        background: #ffffff;
        border-top: 2px solid #ffffff;
        background-clip: content-box;
        border-bottom: 2px solid #ffffff;
        width: 16px;
        height: 2px;
        padding: 5px 0;
      }
    }
  }
  .me-wrap {
    position: absolute;
    top: 140px;
    width: 100%;
    background-color: #101821;
    color: #ffffff;
    .me-content {
      padding: 0 10px;

      .info {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .info_img {
          height: 100px;
          width: 100px;
          border-radius: 50%;
          margin-right: 20px;
          position: relative;
          bottom: 25px;
        }
        button {
          height: 35px;
          width: 120px;
          margin: 15px 4px;
          background-color: #393842;
          border: none;
          color: #ffffff;
          border-radius: 5px;
        }

        button:nth-child(2) {
        }
      }

      .des {
        padding: 10px 0 0 0;
        flex-direction: column;
        display: flex;
        border-bottom: 1px solid #686868;
        .dy_name {
          font-size: 20px;
          font-weight: bold;
        }
        .span_dy{
          padding: 10px 0 10px 0;
          display: block;
          color: #686868;
          .iconfont{
            font-size: 10px;
            color: #686868;
          }
        }
      }
      .user-tag p{
        font-size: 20px;
        padding: 10px 0;
      }
      .user-tag span {
        font-size: 15px;
        color: rgb(24, 233, 233);
        margin-right: 5px;
        background: rgb(88, 110, 110);
        padding: 5px 8px;
        border-radius: 7px;
      }

      .user-tag2 {
        padding: 20px 0;
        color: #686868;

        span {
          font-size: 14px;
          margin-right: 15px;
        }

        a {
          margin-right: 5px;
        }
      }
      .me-ab {
        display: flex;
        .me_ab_i{
          width: 35px;
          height: 35px;
          background: #25252F;
          border-radius: 2px;
          margin: 2px 0;
          .iconfont{
            font-size: 30px;
          }
        }
        .me_ab_span{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 2px 5px;
          .span_title{
            font-size: 15px;
          }
          .span_tab{
            color: #686868;
            margin: 5px 0;
          }
        }
      }
    }
    .me-tab {
      height: 300px;
      .me-navbar {
        display: flex;
        padding: 0 0px;
        justify-content: center;
        align-items: center;
        .item {
          padding: 10px 10px;
          color: #686868;
          font-size: 16px;
        }
        .active {
          border-bottom: 2px solid #0563a1;
          color: #ffffff;
        }
      }
      .tab-wrap {
        .tab-con img {
          height: 30%;
          width: 30%;
          padding: 15px 10px;
          border-radius: 7px;
        }

          .tab-img {

            height: 30%;
            width: 50%;

          }
      }

    }
  }
}
</style>
