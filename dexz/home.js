const Home = {
  template: `
    <b-card title="Welcome to the Ether Vending Machine">
      Please select a service:
      <ul>
        <li><router-link :to="{ name: 'auction' }">Auction</router-link></li>
        <!-- <li><router-link :to="{ name: 'auctionFactory' }">Deploy your own auction</router-link></li>
        <li><router-link :to="{ name: 'tokenContractFactory' }">Deploy your own fixed supply token contract</router-link></li>
        <li><router-link :to="{ name: 'tokenFaucet' }">Get some test tokens</router-link></li>
        <li><router-link :to="{ name: 'dexz' }">Exchange tokens</router-link></li> -->
      </ul>

      Or check out <router-link :to="{ name: 'help' }">Help</router-link>
    </b-card>`,
  data: function () {
    return {
      name: "Home Page",
    }
  },
  beforeRouteEnter(to, from, next) {
    logIt("home.beforeRouteEnter", "to: " + to + ", from: " + from + " , next: " + next);
    // console.log("[home.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      logIt("home.beforeRouteEnter->next", "vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    logIt("home.processEth", "Heey");
  }
};
