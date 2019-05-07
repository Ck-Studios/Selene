import Vue from 'vue'
import Router from 'vue-router'
import Attendance from '@/components/attendance/Attendance'
import Dashboard from '@/components/dashboard/Dashboard'
import Sprint from '@/components/task/Sprint'
import Daily from '@/components/task/Daily'
import Login from '@/components/accounts/Login'
import SprintView from '@/components/task/SprintView'
import StopWatch from '@/components/stopwatch/StopWatch'
import ProfileCard from '@/components/profile/ProfileCard'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Dashboard
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: Attendance,
    },
    {
      path: '/sprint',
      name: 'sprint',
      component: Sprint,
    },
    {
      path: '/daily',
      name: 'daily',
      component: Daily,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/view-sprint',
      name: 'sprint-view',
      component: SprintView,
    },
  ]
});
