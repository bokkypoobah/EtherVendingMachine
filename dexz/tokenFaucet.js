const TokenFaucet = {
  template: `
    <b-card title="Token Faucet">
      Welcome {{ name + " - " + JSON.stringify($route.path) }}
    </b-card>`,
  data: function () {
    return {
      name: "Token Faucet",
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("[TokenFaucet.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      console.log("[TokenFaucet.tokenContractFactory -> next] vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    console.log("[TokenFaucet] processEth()");
  }
};
