<template>
  <div class="videos">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
    ></video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';

export default {
  name: 'Videos',
  props: ['video', 'index'],
  data() {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: true,
        preload: 'auto',
        fluid: false,
        sources: [
          {
            src: this.video.url,
            type: 'video/mp4',
          },
        ],
        width: document.documentElement.clientWidth,
        notSupportedMessage: 'This video cannot play, try again later.',
        controlBar: false,
      },
      playing: true,
      playBtn: '',
    };
  },

  components: {
    videoPlayer,
  },
  created() {
    this.autoPlayAction();
  },
  methods: {
    playOrStop() {
      if (this.playing) {
        this.$refs.videoPlayer.player.pause();
        this.playing = false;
      } else {
        this.$refs.videoPlayer.player.play();
        this.playing = true;
      }
    },

    autoPlayAction() {
      if (this.index === 0) {
        this.playerOptions.autoplay = true;
      }
    },

    play() {
      this.$refs.videoPlayer.player.play();
      this.playing = true;
    },

    stop() {
      this.$refs.videoPlayer.player.pause();
      this.playing = false;
    },
  },

};
</script>

<style lang="less" scoped>
  .videos {
    position: relative;
    /deep/ .vjs-big-play-button {
      position: absolute;
      width: 80px;
      height: 80px;
      border: none;
      background-color: transparent;
      left: 40%;
      top: 40%;
      content: none;

      .vjs-icon-placeholder {
        font-size: 100px;
        color: rgba(255, 255, 255, 0.7);
      }
    }
    /deep/ .video-js {
      height: calc(100vh - 50px);
    }
  }
</style>
