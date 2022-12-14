<template>
  <div class="home">
    <router-view></router-view>
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '@/common/components/tab/Tabbar.vue';

export default {
  components: {
    tabBar,
  },
};
</script>
