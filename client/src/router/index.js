import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Songs'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong/ViewSong'
import EditSong from '@/components/EditSong'
import ListTest from '@/components/ListTest'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/song/',
      name: 'songs',
      redirect: '/songs'
    },
    {
      path: '/song/:songId/edit',
      name: 'song-edit',
      component: EditSong
    },
    {
      path: '*',
      redirect: 'songs'
    },
    {
      path: '/test',
      name: 'list-test',
      component: ListTest
    }
  ]
})
