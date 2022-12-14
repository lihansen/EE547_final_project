<template>
  <div class="recommend">
    <router-view :dataList="videos"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data() {
    return {
      videos: [
        {
          id: '1',
          // eslint-disable-next-line global-require
          url: 'https://project547.s3.us-west-1.amazonaws.com/christmas.mp4',
          author: 'Yanhui',
          title: 'Christmas',
          tag: '#holiday ',
        },
        {
          id: '2',
          // eslint-disable-next-line global-require
          url: 'https://project547.s3.us-west-1.amazonaws.com/runs.mp4',
          author: 'Yanhui',
          title: 'runs',
          tag: '#sports ',
        },
        {
          id: '3',
          url: 'https://project547.s3.amazonaws.com/test.mp4',
          author: 'Yanhui',
          title: 'test',
          tag: '#animal',
        },
      ],
    };
  },
  mounted() {
    this.$router.push({ path: 'reVidelList' }).catch(() => {});
  },
};
</script>

<style lang="less" scoped>
</style>
