// ----------------------------------------------------------------------------
// Network           Network Id   Chain Id
// Mainnet                    1          1
// Ropsten                    3          3
// Rinkeby                    4          4
// Kovan                     42         42
// Görli                      5          5
// Truffle Develop Network 4447
// Ganache Blockchain      5777
// Testnet   | Explorers                     | Testnet ETH Faucets
// :-------- |:----------------------------- |:-------------------------
// Ropsten   | https://ropsten.etherscan.io/ | https://faucet.metamask.io/<br />https://twitter.com/BokkyPooBah/status/1099498823699714048
// Kovan     | https://kovan.etherscan.io/   | https://faucet.kovan.network/<br />https://github.com/kovan-testnet/faucet<br />https://faucet.kovan.radarrelay.com/
// Rinkeby   | https://rinkeby.etherscan.io/ | https://faucet.metamask.io/<br />https://faucet.rinkeby.io/
// Görli     | https://goerli.etherscan.io/  | https://faucet.goerli.mudit.blog/<br />https://goerli-faucet.slock.it/<br />https://bridge.goerli.com/
// ----------------------------------------------------------------------------
var networks = {
  "-1" : { "id": "-1", "name": "Network Unknown", "explorer": "", "faucets": {} },
  "1" : { "id": "1", "name": "Ethereum Mainnet", "explorer": "https://etherscan.io/", "faucets": {} },
  "2" : { "id": "2", "name": "Morden Testnet (deprecated)", "explorer": "https://morden.etherscan.io/", "faucets": {} },
  "3" : { "id": "3", "name": "Ropsten Testnet", "explorer": "https://ropsten.etherscan.io/", "faucets": { "faucet.metamask.io": "https://faucet.metamask.io/" /*, "BokkyPooBah's VIP": "https://twitter.com/BokkyPooBah/status/1099498823699714048/" */ } },
  "4" : { "id": "4", "name": "Rinkeby Testnet", "explorer": "https://rinkeby.etherscan.io/", "faucets": { "faucet.metamask.io": "https://faucet.metamask.io/", "faucet.rinkeby.io": "https://faucet.rinkeby.io/" } },
  "42" : { "id": "42", "name": "Kovan Testnet", "explorer": "https://kovan.etherscan.io/", "faucets": { "faucet.kovan.network": "https://faucet.kovan.network/", "github.com/kovan-testnet": "https://github.com/kovan-testnet/faucet" } },
  "5" : { "id": "5", "name": "Görli Testnet", "explorer": "https://goerli.etherscan.io/", "faucets": { "faucet.goerli.mudit.blog": "https://faucet.goerli.mudit.blog/", "goerli-faucet.slock.it": "https://goerli-faucet.slock.it/" } },
  "4447" : { "id": "4447", "name": "Truffle Devnet", "explorer": "(none)", "faucets": [] },
  "5777" : { "id": "5777", "name": "Ganache Devnet", "explorer": "(none)", "faucets": [] },
};

function getNetworkDetails(networkId) {
  return networks[networkId] || networks[-1];
}

function getTimeDiff(ts) {
  if (ts!= 0) {
    // this.lastBlockTimeDiff = new Date() / 1000 - this.lastBlockTimestamp;
    var secs = parseInt(new Date() / 1000 - ts);
    // if (secs > 90) {
    //   this.spinnerVariant = "danger";
    // } else if (secs > 60) {
    //   this.spinnerVariant = "warning";
    // } else {
    //   this.spinnerVariant = "success";
    // }

    var mins = parseInt(secs / 60);
    secs = secs % 60;
    var hours = parseInt(mins / 60);
    mins = mins % 60;
    var days = parseInt(hours / 24);
    hours = hours % 24;
    var s = "";
    if (days > 0) {
      s += days + "d ";
    }
    if (hours > 0) {
      s += hours + "h ";
    }
    if (mins > 0) {
      s += mins + "m ";
    }
    if (secs > 0) {
      s += secs + "s";
    }
    return "-" + s;
  } else {
    return "";
  }
}

// ----------------------------------------------------------------------------
// Convenience function
// ----------------------------------------------------------------------------
const promisify = (inner) =>
  new Promise((resolve, reject) =>
    inner((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  );


// ----------------------------------------------------------------------------
// Web3 connection, including coinbase and coinbase balance
// ----------------------------------------------------------------------------

// <b>Connection</b><br />
// isMounted: {{isMounted}}<br />
// isOk: {{isOk}}<br />
// error: {{error}}<br />
// connectionType: {{connectionType}}<br />
// networkId: {{networkId}}<br />
// networkName: {{networkName}}<br />
// explorer: {{explorer}}<br />
// faucets: {{faucets}}<br />
// coinbase: {{coinbase}}<br />
// balance: {{balance}}<br />
// <span v-if="block">block: {{block.hash + ' @ ' + block.number}}</span>

// <b-card v-if="isOk" :title="networkName">
//   Block <b-link :href="explorer + 'block/' + blockNumber" class="card-link" target="_blank">{{ '#' + blockNumberString }}</b-link> {{ blockTimestampString }}
//   <div>
//     <span v-show="Object.keys(faucets).length">Faucets: </span>
//     <span v-for="(url, name) in faucets">
//       <b-link :href="url" class="card-link" target="_blank">{{ name }}</b-link>&nbsp;
//     </span>
//   </div>
// </b-card>


const Connection = {
  template: `
    <div>
      <b-card header-class="noweb3connectionheader" v-if="!isOk" header="Web3 Connection Not Detected">
        <div>
          Please use the <b-link href="https://metamask.io" target="_blank">MetaMask</b-link> addon with Firefox, Chromium, Opera or Chrome, or any other other web3 browser.
        </div>
      </b-card>
      <b-card v-if="isOk" :title="networkName">
        <b-row>
          <b-col cols="4">Block</b-col>
          <b-col class="truncate" cols="8">
            <b-link :href="explorer + 'block/' + blockNumber" class="card-link" target="_blank">{{ blockNumberString }}</b-link>&nbsp;&nbsp;<font size="-3">{{ lastBlockTimeDiff }}</font>
            <b-spinner class="float-right" :variant="spinnerVariant" small type="grow" label="Spinning" />
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="4">Account</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + coinbase" class="card-link" target="_blank">{{ coinbase }}</b-link></b-col>
        </b-row>
        <b-row>
          <b-col cols="4">ETH Balance</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + coinbase" class="card-link" target="_blank">{{ balanceString }}</b-link></b-col>
        </b-row>
        <b-row v-show="Object.keys(faucets).length">
          <b-col cols="4">Faucet(s)</b-col>
          <b-col class="truncate" cols="8">
            <span v-for="(url, name) in faucets">
              <b-link :href="url" class="card-link" target="_blank">{{ name }}</b-link><br />
            </span>
          </b-col>
        </b-row>
      </b-card>
    </div>
  `,
  data: function () {
    return {
      count: 0,
      lastNetworkId: -1,
      lastCoinbase: null,
      lastBalance: null,
      lastBlockHash: null,
      spinnerVariant: "success",
      lastBlockTimeDiff: "huh",
    }
  },
  computed: {
    isMounted () {
      return store.getters['connection/isMounted'];
    },
    isOk () {
      return store.getters['connection/isOk'];
    },
    error () {
      return store.getters['connection/error'];
    },
    connectionType () {
      return store.getters['connection/connectionType'];
    },
    networkId () {
      // return this.$store.state.networkId;
      return store.getters['connection/networkId'];
    },
    networkName () {
      return store.getters['connection/networkName'];
    },
    explorer () {
      return store.getters['connection/explorer'];
    },
    faucets () {
      return store.getters['connection/faucets'] || [];
    },
    coinbase () {
      return store.getters['connection/coinbase'];
    },
    balance () {
      return store.getters['connection/balance'];
    },
    balanceString() {
      return store.getters['connection/balance'] == null ? "" : new BigNumber(store.getters['connection/balance']).shift(-18).toString();
    },
    block () {
      return store.getters['connection/block'];
    },
    blockNumber () {
      return store.getters['connection/block'] == null ? 0 : store.getters['connection/block'].number;
    },
    blockNumberString() {
      return store.getters['connection/block'] == null ? "" : formatNumber(store.getters['connection/block'].number);
    },
    blockTimestampString() {
      if (store.getters['connection/block'] == null) {
        return "";
      } else {
        var date = new Date(store.getters['connection/block'].timestamp * 1000);
        return new Intl.DateTimeFormat('default', {hour: 'numeric', minute: 'numeric', second: 'numeric'}).format(date) + " " +
          new Intl.DateTimeFormat('default', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}).format(date);
      }
    },
    // lastBlockTimeDiff() {
    //   return store.getters['connection/block'] == null ? "" : getTimeDiff(store.getters['connection/block'].timestamp);
    //   // return "";
    // },
  },
  methods: {
    async getWeb3() {
      logIt("Connection", "getWeb3() start[" + this.count + "]");
      if (!store.getters['connection/isOk']) {
        logIt("Connection", "getWeb3() Attempting connection");
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          try {
            // Request account access if needed
            await ethereum.enable();
            store.dispatch('connection/setConnectionType', "MetaMask / Modern dapp browsers");
            // Accounts now exposed
            store.dispatch('connection/setIsOk', true);
          } catch (error) {
            // User denied account access...
            store.dispatch('connection/setError', error.message);
          }
        // Legacy dapp browsers...
        } else if (window.web3) {
          try {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            store.dispatch('connection/setConnectionType', "Legacy dapp browsers");
            store.dispatch('connection/setIsOk', true);
          } catch (error) {
            store.dispatch('connection/setError', error.message);
          }
        // Non-dapp browsers...
        } else {
          try {
            window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            store.dispatch('connection/setConnectionType', "Non-dapp browsers");
            store.dispatch('connection/setIsOk', true);
          } catch (error) {
            store.dispatch('connection/setError', error.message);
          }
        }
      }
      var networkChanged = false;
      if (store.getters['connection/isOk']) {
        try {
          var _networkId = promisify(cb => web3.version.getNetwork(cb));
          var networkId = await _networkId;
          if (networkId != this.lastNetworkId) {
            store.dispatch('connection/setNetworkId', networkId);
            logIt("Connection", "getWeb3() NetworkId updated from " + this.lastNetworkId + " to " + networkId + ": " + getNetworkDetails(networkId).name);
            this.lastNetworkId = networkId;
            networkChanged = true;
          }
        } catch (error) {
          store.dispatch('connection/setIsOk', false);
          store.dispatch('connection/setError', error.message);
        }
      }

      var coinbaseChanged = false;
      var coinbase = null;
      if (store.getters['connection/isOk']) {
        try {
          var _coinbase = promisify(cb => web3.eth.getCoinbase(cb));
          coinbase = await _coinbase;
          if (coinbase != this.lastCoinbase) {
            store.dispatch('connection/setCoinbase', coinbase);
            logIt("Connection", "getWeb3() Coinbase updated from " + this.lastCoinbase + " to " + coinbase);
            this.lastCoinbase = coinbase;
            coinbaseChanged = true;
          }
        } catch (error) {
          store.dispatch('connection/setIsOk', false);
          store.dispatch('connection/setError', error.message);
        }
      }

      var balance = null;
      if (store.getters['connection/isOk']) {
        if (coinbase != null) {
          try {
            var _balance = promisify(cb => web3.eth.getBalance(coinbase, cb));
            balance = new BigNumber(await _balance);
          } catch (error) {
            store.dispatch('connection/setIsOk', false);
            store.dispatch('connection/setError', error.message);
          }
        }
        if (this.lastBalance == null || balance == null || !balance.equals(this.lastBalance)) {
          store.dispatch('connection/setBalance', balance);
          logIt("Connection", "getWeb3() Coinbase balance updated from " + this.lastBalance + " to " + balance + ": " + (balance == null ? "" : balance.shift(-18).toString()));
          this.lastBalance = balance;
        }
      }

      var block = null;
      if (store.getters['connection/isOk']) {
        try {
          var _block = promisify(cb => web3.eth.getBlock("latest", false, cb));
          block = await _block;
        } catch (error) {
          store.dispatch('connection/setIsOk', false);
          store.dispatch('connection/setError', error.message);
        }
      }
      var blockChanged = false;
      if (block == null) {
        if (this.lastBlockHash != null) {
          store.dispatch('connection/setBlock', null);
          logIt("Connection", "getWeb3() Block hash updated from " + this.lastBlockHash + " to " + null);
          this.lastBlockHash = null;
          blockChanged = true;
        }
      } else {
        if (block.hash !== this.lastBlockHash) {
          store.dispatch('connection/setBlock', block);
          logIt("Connection", "getWeb3() Block updated from " + (this.lastBlockHash ? this.lastBlockHash.substring(0, 10) : null) + " to " + (block.hash ? block.hash.substring(0, 10) : null) + " @ " + block.number + " " + new Date(block.timestamp * 1000).toLocaleString() + " " + getTimeDiff(block.timestamp));
          this.lastBlockHash = block.hash;
          blockChanged = true;
        }
      }

      if (store.getters['connection/isOk']) {
        if (this.$route.name == "DeployTokenContract") {
          await store.dispatch('deployTokenContract/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
        } else if (this.$route.name == "GazeCoinBuilder") {
            await store.dispatch('gazeCoinBuilder/execWeb3', { count: this.count, networkChanged, blockChanged, coinbaseChanged });
        }
      }
      logIt("Connection", "getWeb3() end[" + this.count + "]");
    },
    timeoutCallback() {
      var t = this;
      if (this.count++ % 10 == 0 || store.getters['gazeCoinBuilder/refreshRequested'] ) {
        t.getWeb3();
      }
      if (store.getters['connection/block'] != null) {
        this.lastBlockTimeDiff = getTimeDiff(store.getters['connection/block'].timestamp);
        var secs = parseInt(new Date() / 1000 - store.getters['connection/block'].timestamp);
        if (secs > 90) {
          this.spinnerVariant = "danger";
        } else if (secs > 60) {
          this.spinnerVariant = "warning";
        } else {
          this.spinnerVariant = "success";
        }
      } else {
        this.spinnerVariant = "danger";
      }
      setTimeout(function() {
        t.timeoutCallback();
      }, 1000);
    }
  },
  mounted() {
    if (!store.getters['connection/isMounted']) {
      logIt("Connection", "mounted() Called for the first time");
      store.dispatch('connection/setIsMounted');
      this.timeoutCallback();
    } else {
      logIt("Connection", "mounted() Already mounted");
    }
  },
};


const connectionModule = {
  namespaced: true,
  state: {
    isMounted: false,
    isOk: false,
    error: null,
    connectionType: null,
    networkId: null,
    networkName: null,
    explorer: null,
    faucets: null,
    coinbase: null,
    balance: null,
    block: null,
    // refreshRequested: false,
    // networkChanged: 0,
    // coinbaseChanged: 0,
    // balanceChanged: 0,
    // connectionOk: false,
    // connectionChanged: 0,
    // errors: [],
    // block: null,
    // blockChanged: 0,
  },
  // computed: {
  //   ...Vuex.mapGetters({
  //     isMounted: state => state.isMounted
  //   })
  // },
  mutations: {
    setIsMounted (state) {
      state.isMounted = true;
    },
    setIsOk (state, ok) {
      state.isOk = ok;
    },
    setError (state, e) {
      state.error = e;
    },
    setConnectionType (state, ct) {
      state.connectionType = ct;
    },
    setNetworkId (state, id) {
      state.networkId = id;
      var network = getNetworkDetails(id);
      state.networkName = network.name;
      state.explorer = network.explorer;
      state.faucets = network.faucets;
    },
    setCoinbase (state, cb) {
      state.coinbase = cb;
    },
    setBalance (state, b) {
      state.balance = b;
    },
    setBlock (state, b) {
      state.block = b;
    },
    // setRefreshRequested (state, rr) {
    //   state.refreshRequested = rr;
    // },
  },
  actions: {
    setIsMounted (context) {
      context.commit('setIsMounted');
    },
    setIsOk (context, ok) {
      context.commit('setIsOk', ok);
    },
    setError (context, e) {
      context.commit('setError', e);
    },
    setConnectionType (context, ct) {
      context.commit('setConnectionType', ct);
    },
    setNetworkId (context, id) {
      context.commit('setNetworkId', id);
    },
    setCoinbase (context, cb) {
      context.commit('setCoinbase', cb);
    },
    setBalance (context, b) {
      context.commit('setBalance', b);
    },
    setBlock (context, b) {
      context.commit('setBlock', b);
    },
    // setRefreshRequested (context, rr) {
    //   context.commit('setRefreshRequested', rr);
    // },
  },
  getters: {
    isMounted: state => state.isMounted,
    isOk: state => state.isOk,
    error: state => state.error,
    connectionType: state => state.connectionType,
    networkId: state => state.networkId,
    networkName: state => state.networkName,
    explorer: state => state.explorer,
    faucets: state => state.faucets,
    coinbase: state => state.coinbase,
    balance: state => state.balance,
    block: state => state.block,
    // refreshRequested: state => state.refreshRequested,
  },
  // Below should work but does not
  // computed: Vuex.mapState({
  //   isMounted: state => state.isMounted,
  // }),
};

const Account = {
  template: '<div>Account: {{count}}</div>',
  data: function () {
    return {
      count: 2
    }
  },
  methods: {
    refresh() {
    },
    timeoutCallback() {
      var t = this;
      // processEth(this);
      if (this.count % 5 == 0) {
        // t.processEth();
      }
      t.refresh(),
      this.count += 10;
      setTimeout(function() {
        t.timeoutCallback();
      }, 1000);
    }
  },
  mounted() {
    this.timeoutCallback();
  },
};
