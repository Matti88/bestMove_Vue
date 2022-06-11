
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import { usersState } from './stores/user';
// const { userStates } = usersState();
// const { isAuthenticated } = userStates;

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '/',
                name: 'DashBoard',
                component: () => import('./components/DashBoard.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/register',
                name: 'RegisterPage',
                component: () => import('./views/RegisterPage.vue'),
                meta: { requiresAuth: false },
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('./views/LoginPage.vue'),
                meta: { requiresAuth: false },
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('./views/ProfilePage.vue'),
                meta: { requiresAuth: true },
            }
            ,
            {
                path: '/ApiKeyInsert',
                name: 'ApiKeyInsert',
                component: () => import('./components/ApiKeyInsert.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/FileAndTable',
                name: 'FileAndTable',
                component: () => import('./components/FileAndTable.vue'),
                meta: { requiresAuth: true },
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


router.beforeEach((to, from, next) => {

    const userStates = usersState();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (userStates.isAuthenticated()) {
            next();
            return;
        }
        next('/login');
    } else {
        console.log("blocked here");
        next();
    }
});

export default router;
