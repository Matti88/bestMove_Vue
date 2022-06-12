
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
                name: 'HomePage',
                component: () => import('./views/HomePage.vue')
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('./views/LoginPage.vue')

            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('./views/RegisterPage.vue')

            },

            {
                path: '/dashboard',
                name: 'DashBoard',
                component: () => import('./components/DashBoard.vue'),
                meta: { requiresAuth: true },
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

    console.log("rerouting");
    console.log(to.matched.some(record => record.meta.requiresAuth));

    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(userStates.isAuthenticated());
        if (userStates.isAuthenticated()) {

            console.log("rerouting with access");

            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

export default router;
