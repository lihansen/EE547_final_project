import Vue from 'vue';
import VueApollo from 'vue-apollo';
import less from 'less';
// 滑动特效插件
import VueSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// 视频插件
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';// 实现了rem自适应布局
import './assets/styles/normalize.css';// 解决不同浏览器之间的差异

import './assets/fonts/iconfont.css';// icon

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  cache,
  link: '<http://localhost:3000/graphql>',
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.use(VueApollo);
Vue.use(less);
Vue.use(VueSwiper);
Vue.use(VueVideoPlayer);
Vue.config.productionTip = false;

/* <div>
<p v-for="videoItem in dataList.videos.FindAllVideos" :key="videoItem._id">
  {{videoItem._id}}
</p>
</div> */

new Vue({
  router,
  store,
  provide: apolloProvider.provide(),
  render: (h) => h(App),
}).$mount('#app');
