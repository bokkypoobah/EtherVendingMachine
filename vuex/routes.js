const routes = [{
    path: '/deployTokenContract',
    component: DeployTokenContract,
    name: 'DeployTokenContract'
  }, {
    path: '/viewTokens',
    component: ViewTokens,
    name: 'ViewTokens'
  }, {
    path: '/gazeCoinBuilder',
    component: GazeCoinBuilder,
    name: 'GazeCoinBuilder'
  }, {
    path: '/page1',
    component: Page1,
    name: 'page1'
  }, {
    path: '/page2',
    component: Page2,
    name: 'page2'
  }, {
    path: '*',
    component: Home,
    name: 'home'
  }
];
