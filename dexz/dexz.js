const Dexz = {
  template: `
    <b-card title="Dexz">
      Welcome {{ name + " - " + $route.name }}
    </b-card>`,
  data: function () {
    return {
      name: "Dexz",
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("[dexz.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      console.log("[dexz.tokenContractFactory -> next] vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    console.log("[dexz] processEth()");
  }
};
