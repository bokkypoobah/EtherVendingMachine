// Home: {{message}}<br />
// <router-link to="/page1">Go to Page1</router-link><br />
// <router-link to="/page2">Go to Page2</router-link><br />
// <hr />ConnectionModule: <connection></connection>

const Page1 = {
  template: '<div>Page1: {{message}} <hr />ConnectionModule: <connection></connection> <hr />AccountModule: <account></account></div>',
  data: function () {
    return {
      count: 3
    }
  },
  computed: {
    message() {
      return this.$store.getters.getMessage;
    }
  },
};
const Page2 = {
  template: '<div>Page2: {{message}} <hr />ConnectionModule: <connection></connection> <hr />AccountModule: <account></account></div>',
  computed: {
    message() {
      return this.$store.getters.getMessage;
    }
  }
};
