<template>
  <transition name="right">
    <div class="upload-video-wrap">
      <tip ref="tip"></tip>
      <div class="loading-wrap" v-show="publishing">
        <loading></loading>
      </div>
      <confirm :text="'Post this video to your account?'"
      @confirm="confirm" @cancel="cancel" ref="confirm"></confirm>
      <my-header title="Upload Video" :hasBack="true" :goBack="goBack"></my-header>
      <div class="content">
        <div class="video-wrap">
          <video class="video" src="" ref="video"
          @click="playHandler" x5-playsinline="" playsinline=""
            webkit-playsinline preload="auto"></video>
          <p class="video-guide" v-show="!videoUrl">select video to upload</p>
          <input class="video-input" v-show="!videoUrl"
          type="file" id="file" accept="video/*" @change="change">
        </div>
        <div class="content-item">
          <input placeholder="input the vide url (optional)"
          class="input" type="text" v-model="videoUrl"
            @blur="inputBlur">
        </div>
        <div class="content-item" v-show="!isLocalVideoFile">
          <input placeholder="input the avatar cropper"
          class="input" type="text" v-model="coverUrl" @blur="inputBlur">
        </div>
        <div class="content-item">
          <textarea class="input"
          placeholder="input the discription of the video" rows="10" cols="30"
            v-model="videoDesc" @blur="inputBlur" />
        </div>
        <div class="content-item">
          <textarea class="input"
          placeholder="input the tags of the video" rows="10" cols="30" v-model="videoTags"
            @blur="inputBlur" />
        </div>
        <div class="content-item">
          <div class="btn" @click="preview">preview</div>
          <div class="btn" @click="upload">post</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
</script>
<style scoped lang='stylus'>
@import '~@/common/stylus/variable'
.right-enter-active, .right-leave-active
  transition all .5s
.right-enter, .right-leave-to
  opacity 0
  transform translateX(100%)
.loading-wrap
  position absolute
  z-index 10000
  left 0
  right 0
  top 0
  bottom 0
  display flex
  justify-content center
  align-items center
  background rgba(0, 0, 0, .7)
.upload-video-wrap
  position absolute
  z-index 9999
  left 0
  right 0
  top 0
  bottom 0
  background $color-background
  .content
    display flex
    flex-direction column
    .video-wrap
      position relative
      display flex
      background #000
      align-items center
      justify-content center
      height 50vh
      .video-guide
        position absolute
      .video-input
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        opacity 0
      .video
        width 100%
        height 100%
    .content-item
      position relative
      display flex
      padding 10px 20px
      line-height 44px
      height 44px
      justify-content flex-start
      .btn
        padding 5px
        text-align center
        line-height 25px
        font-size $font-size-median-m
        width 70px
        height 25px
        color #000
      .input
        width 100%
        background $color-background
        color $color-text
        border none
        font-size $font-size-medium
      &:first-of-type
        height 50%
        padding 0 0 20px 0
        flex-direction column
        align-items center
        border-bottom 1px solid $color-divide
      &:last-of-type
        justify-content space-around
</style>
