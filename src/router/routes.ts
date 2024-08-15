import { RouteRecordRaw } from 'vue-router'
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    //redirect: '/home',
    component: () => import('@/layout/layout-index.vue'),
    meta: {
      title: '布局',
      hidden: false
    },
    children: [
      {
        path: '/components',
        name: 'mycomponents',
        redirect: '/components/intro',
        component: () => import('@/layout/mycomponents-index.vue'),
        meta: {
          title: '组件',
          hidden: false
        },
        children: [
          {
            path: '/components/intro',
            name: 'intro',
            component: () => import('@/views/home-start/home-start.vue'),
            meta: {
              title: '简介',
              hidden: false
            }
          },
          {
            path: '/components/echartchain',
            name: 'echartchain',
            component: () => import('@/views/echarts-chain/echarts-chain.vue'),
            meta: {
              title: 'Echarts资金流可视化',
              hidden: false
            }
          },
          {
            path: '/components/dragsort',
            name: 'dragsort',
            component: () => import('@/views/select-dragsort/select-dragsort.vue'),
            meta: {
              title: '穿梭拖拽排序',
              hidden: false
            }
          },
          {
            path: '/components/animlayout',
            name: 'animlayout',
            component: () => import('@/views/anim-layout/anim-layout.vue'),
            meta: {
              title: '复杂交互动画布局',
              hidden: false
            }
          }
        ]
      },
      {
        path: '/',
        name: 'cover',
        //redirect: '/home',
        component: () => import('@/views/the-cover/the-cover.vue'),
        meta: {
          title: '封面',
          hidden: true
        }
      },
      {
        path: '/blogs',
        name: 'myblogs',
        //redirect: '/home',
        component: () => import('@/views/my-blogs/my-blogs.vue'),
        meta: {
          title: '笔记',
          hidden: true
        }
      }
    ]
  }
]
