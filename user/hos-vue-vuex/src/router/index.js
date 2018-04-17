import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/page/common.vue'
import Admin from '@/page/admin.vue'
import superAdmin from '@/page/superadmin.vue'
import test from '@/test/apitest.vue'
import vuextest from '@/test/vuextest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/common',
      name: 'common',
      component: Common
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      component: superAdmin
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/vuextest',
      name: 'vuextest',
      component: vuextest
    }
  ]
})
