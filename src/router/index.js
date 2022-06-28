import {createRouter, createWebHistory} from "vue-router";
import login from "../views/Login.vue"
import register from "../views/Register.vue"
import manageUser from "@/views/ManageUser";
import manageActivity from "@/views/ManageActivity";
import checkVolunteer from "@/views/CheckVolunteer";
import organizerManageActivity from "@/views/OrganizerManageActivity";
import activityList from "@/views/ActivityList";
import joinRecord from "@/views/JoinRecord";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/manageUser',
            name: 'manageUser',
            component: manageUser
        },
        {
            path: '/manageActivity',
            name: '/manageActivity',
            component: manageActivity
        }, {
            path: '/checkVolunteer',
            name: '/checkVolunteer',
            component: checkVolunteer
        }, {
            path: '/organizerManageActivity',
            name: '/organizerManageActivity',
            component: organizerManageActivity
        }, {
            path: '/activityList',
            name: '/activityList',
            component: activityList
        }, {
            path: "/joinRecord",
            name: '/joinRecord',
            component: joinRecord
        }
    ]
})

export default router