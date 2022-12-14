import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index/recommend/',
  },
  {
    path: '/index',
    redirect: '/index/recommend/',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "Index" */ '../views/index/index.vue'),
        children: [
          {
            path: 'recommend',
            name: 'recommend',
            component: () => import(/* webpackChunkName: "Recommend" */ '../views/recommend/Recommend.vue'),
            children: [
              {
                path: 'reVidelList',
                name: 'reVidelList',
                component: () => import(/* webpackChunkName: "reVidelList" */ '../common/components/index/VideoList.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/me',
        name: 'me',
        component: () => import(/* webpackChunkName: "me" */ '../views/me/Me.vue'),
      },
    ],
  },
  {
    path: '/issue',
    name: 'issue',
    component: () => import(/* webpackChunkName: "issue" */ '../views/issue/Issue.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
