Vue.use(Vuex);

Vue.component('connection', Connection);
Vue.component('account', Account);

const router = new VueRouter({
  routes,
});

const storeVersion = 1;
const store = new Vuex.Store({
  strict: true,
  state: {
    username: 'Jack',
    phrases: ['Welcome back', 'Have a nice day'],
  },
  getters: {
    getMessage(state) {
      return state.route.name === 'top' ?
        `${state.phrases[0]}, ${state.username}` :
        `${state.phrases[1]}, ${state.username}`;
    },
  },
  mutations: {
    initialiseStore(state) {
      // Check if the store exists
    	if (localStorage.getItem('store')) {
    		let store = JSON.parse(localStorage.getItem('store'));

    		// Check the version stored against current. If different, don't
    		// load the cached version
    		if(store.version == storeVersion) {
          // logIt("store.initialiseStore BEFORE", JSON.stringify(state, null, 4));
    			this.replaceState(
    				Object.assign(state, store.state)
    			);
          // logIt("store.initialiseStore AFTER", JSON.stringify(state, null, 4));
    		} else {
    			state.version = storeVersion;
    		}
    	}
    }
  },
  modules: {
    connection: connectionModule,
    deployTokenContract: deployTokenContractModule,
    gazeCoinBuilder: gazeCoinBuilderModule,
    viewTokens: viewTokensModule,
  }
});

// Subscribe to store updates
store.subscribe((mutation, state) => {
  let store = {
		version: storeVersion,
		state: state,
	};
  // logIt("store.updated", JSON.stringify(store, null, 4));
	localStorage.setItem('store', JSON.stringify(store));
});

// sync store and router by using `vuex-router-sync`
sync(store, router);

const app = new Vue({
  router,
  store,
  beforeCreate() {
    logIt("index.js", "app:beforeCreate()");
		this.$store.commit('initialiseStore');
	}
  // components: {
  //   "network": Network,
  //   "account": Account,
  // }
}).$mount('#app');
