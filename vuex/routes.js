const routes = [{
    path: '/deployTokenContract',
    component: DeployTokenContract,
    name: 'DeployTokenContract'
  }, {
    path: '/viewTokens',
    component: ViewTokens,
    name: 'ViewTokens'
  }, {
    // all
    // owned
    // 0x123456
    // new
    // {tokenId}

    path: '/gazeCoinBuilder/:param1',
    component: GazeCoinBuilder,
    name: 'GazeCoinBuilder',
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
