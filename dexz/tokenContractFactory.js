const TokenContractFactory = {
  template: `
    <b-card title="Token Contract Factory">
      Welcome {{ name + " - " + JSON.stringify($route.path) }}
    </b-card>`,
  data: function () {
    return {
      name: "Token Contract Factory",
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("[tokenContractFactory.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      console.log("[tokenContractFactory.tokenContractFactory -> next] vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    console.log("[tokenContractFactory] processEth()");
  }
};
