const Help = {
  template: `
    <b-card title="Help">
      Some help text {{ name }}
    </b-card>
    `,
  data: function () {
    return {
      name: "Help",
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("[help.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
    next(vm => {
      // access to component's instance using `vm` .
      // this is done because this navigation guard is called before the component is created.
      // clear your previously populated search results.
      // re-populate search results
      console.log("[help.beforeRouteEnter -> next] vm: ");
      console.table(vm);
      // vm.initializeSearch();
      next();
    })
  },
  processEth() {
    console.log("[help] processEth()");
  }
};
