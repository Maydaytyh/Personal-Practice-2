import Vue from 'vue'
import Router from 'vue-router'
import Common from '@/components/common.vue'
import Admin from '@/components/admin.vue'
import superAdmin from '@/components/superadmin.vue'

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
    }
  ]
})
