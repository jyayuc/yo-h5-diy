/**
 * 页面路由名称
 */
export default {
  '*': { name: '*', path: '*', title: '404 Not Found' },

  login: { name: 'login', path: '/login', title: '登录' },

  uphold: { name: 'uphold', path: '/uphold', title: '404 Not Found' },
  index: { name: 'index', path: '/', title: '首页' },
  about: { name: 'about', path: '/about', title: '关于' },
  shopNavigation: { name: 'shopNavigation', path: '/shop/navigation', title: '关于' },
  shopStyle: { name: 'shopStyle', path: '/shop/style', title: '关于' },
  shopManage: { name: 'shopManage', path: '/shop/manage', title: '关于' },
  shopEdit: { name: 'shopEdit', path: '/shop/edit', title: '关于' },
  shopPersonal: { name: 'shopPersonal', path: '/shop/personal', title: '关于' }

}
