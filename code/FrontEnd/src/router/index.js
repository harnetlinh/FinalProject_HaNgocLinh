import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Individual from '../components/Individual.vue'
import TTS from '../components/MainPage.vue'
import Setting from '../components/Setting.vue'
import Feedback from '../components/Feedback.vue'
import About from '../components/About.vue'
import HowToUse from '../components/HowToUse.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        alias: '/dashboard',
        redirect: '/dashboard/text-to-speech',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard - Text2Speech'
        },
        children: [
            {
                path: 'individual',
                name: 'Individual',
                component: Individual,
                meta: {
                    title: 'Individual - Text2Speech'
                }
            },
            {
                path: 'text-to-speech',
                name: 'TTS',
                alias: 'text-to-speech',
                component: TTS,
                meta: {
                    title: 'Home - Text2Speech'
                }
            },
            {
                path: 'feedback',
                name: 'Feedback',
                alias: 'feedback',
                component: Feedback,
                meta: {
                    title: 'Feedback - Text2Speech'
                }
            },{
                path: 'about',
                name: 'About',
                alias: 'about',
                component: About,
                meta: {
                    title: 'About - Text2Speech'
                }
            },{
                path: 'howtouse',
                name: 'HowToUse',
                alias: 'howtouse',
                component: HowToUse,
                meta: {
                    title: 'How To Use - Text2Speech'
                }
            },
            {
                path: 'setting',
                name: 'Setting',
                component: Setting,
                meta: {
                    title: 'Setting - EduChat'
                }
            }
        ]
    },
    {
        path: '/dashboard',
        redirect: '/dashboard/text-to-speech',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login - EduChat'
        }
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: '404 - Page Not Found'
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {

    if (to.meta.title) {
      document.title = to.meta.title;
    }

    next();

});

export default router