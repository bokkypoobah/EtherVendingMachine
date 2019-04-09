const Settings = {
  template: `
    <b-card title="Settings">
      Please select a service:
      <ul>
        <li><router-link :to="{ name: 'tokenContractFactory' }">Deploy your own fixed supply token contract</router-link></li>
        <li><router-link :to="{ name: 'tokenFaucet' }">Get some test tokens</router-link></li>
        <li><router-link :to="{ name: 'dexz' }">Exchange tokens</router-link></li>
      </ul>

      Or check out <router-link :to="{ name: 'help' }">Help</router-link>
    </b-card>`,
  data: function () {
    return {
      name: "Settings",
    }
  },
  beforeRouteEnter(to, from, next) {
    logIt("settings.beforeRouteEnter", "to: " + to + ", from: " + from + " , next: " + next);
    // console.log("[home.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      logIt("settings.beforeRouteEnter->next", "vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    logIt("settings.processEth", "Heey");
  }
};
