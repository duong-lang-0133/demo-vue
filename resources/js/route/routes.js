import Vue from 'vue'
import VueRouter from 'vue-router'

// mengaktifkan vue router
Vue.use(VueRouter);

import dashboard from '../pages/dashboard.vue'
// news
import index_new from '../pages/new/index.vue'
import create_new from '../pages/new/create.vue'
import edit_new from '../pages/new/edit.vue'
// posts
import index_post from '../pages/post/index.vue'
import create_post from '../pages/post/create.vue'
import edit_post from '../pages/post/edit.vue'

const routes = [

    {
        name: 'news',
        path: '/news',
        meta: 'New',
        component: index_new,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta //sebelum masuk ubah title + meta di route
            next() // lanjutkan
        },
    },
    {
        name: 'create_new',
        path: '/news/create',
        meta: 'Create New',
        component: create_new,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        },
    },
    {
        name: 'edit_new',
        path: '/news/:id',
        meta: 'Edit New',
        component: edit_new,
        props: true,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        },
    },
    {
        name: 'post',
        path: '/posts',
        meta: 'Post',
        component: index_post,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        },
    },
    {
        name: 'create_post',
        path: '/posts/create',
        meta: 'Create Post',
        component: create_post,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        },
    },
    {
        name: 'edit_post',
        path: '/posts/:id',
        meta: 'Edit Post',
        component: edit_post,
        props: true,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        },
    },
    {
        name: 'dashboard',
        path: '*',
        meta: 'Dashboard',
        component: dashboard,
        beforeEnter: (to, from, next) => {
            document.title = "Voler - " + to.meta
            next()
        }
    },
]

const router = new VueRouter({
    LinkaAtiveClass: 'active',
    mode: 'history',
    routes
})


export default router
