
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageUsers.vue'), name: "SmackChat"},
      { path: '/chat/:otherUserId', component: () => import('pages/PageChat.vue'), name: "Chat"},
      { path: '/auth', component: () => import('pages/PageAuth.vue'), name:"Login"}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
