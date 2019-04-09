const Auction = {
  template: `
    <div>
      <b-alert :show="this.$parent.web3 == null || this.$parent.web3.networkName !== 'Ropsten Testnet'" variant="warning">
        Please switch to the Ropsten Testnet as the exchange is only deployed there
      </b-alert>

      <b-card title="Auction" v-if="this.$parent.web3 != null && this.$parent.web3.networkName === 'Ropsten Testnet'" >
       <b-form-select v-model="$parent.dexz.selectedPair" :options="this.$parent.dexz.pairsForSelection">
       <template slot="first">
         <option :value="null" disabled>-- Please select an pair --</option>
       </template>
       </b-form-select>
       <br />
       <b-card sub-title="Buy Orders">
         <span v-for="(order, key) in this.$parent.dexz.buyOrders">
           <b-link :href="url" class="card-link" target="_blank">{{ key.substring(0, 10) + ' ' + order.price.shift(-18) + ' by ' + order.maker}}</b-link>&nbsp;
         </span>
       </b-card>
       <br />
       <b-card sub-title="Sell Orders">
       </b-card>
      </b-card>
    </div>`,
  data: function () {
    return {
      name: "Auction",
    }
  },

  // function getOrder(bytes32 _orderKey) public view returns (bytes32 _prev, bytes32 _next, uint _orderType, address maker, address baseToken, address quoteToken, uint price, uint expiry, uint baseTokens, uint baseTokensFilled) {


  // <span v-show="Object.keys(network.faucets).length">Faucets: </span>
  // <span v-for="(url, name) in network.faucets">
  //   <b-link :href="url" class="card-link" target="_blank">{{ name }}</b-link>&nbsp;
  // </span>

  // <b-row no-gutters v-for="(child) in factoryChildren">
  //   <b-col cols="1">{{ child.number }}</b-col>
  //   <b-col class="truncate">
  //     <b-link :href="network.explorer + 'token/' + child.address" class="card-link" target="_blank">{{ child.symbol + ':' + child.name + ':' + child.decimals + ':' + child.totalSupplyString + ':' + child.address.substring(0, 10) }}</b-link>
  //   </b-col>
  // </b-row>

  // <b-form-select v-model="this.$parent.dexz.selected" :options="this.$parent.dexz.pairsForSelection" />


  // beforeRouteEnter(to, from, next) {
  //   console.log("[dexz.beforeRouteEnter] - to: " + to + ", from: " + from + " , next: " + next);
  //   next(vm => {
  //     // access to component's instance using `vm` .
  //     // this is done because this navigation guard is called before the component is created.
  //     // clear your previously populated search results.
  //     // re-populate search results
  //     console.log("[dexz.tokenContractFactory -> next] vm: ");
  //     console.table(vm);
  //     // vm.initializeSearch();
  //     next();
  //   })
  // },
  // processEth() {
  //   console.log("[dexz] processEth()");
  // }
};
