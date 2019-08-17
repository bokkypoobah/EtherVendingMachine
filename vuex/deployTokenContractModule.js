var descriptions = {
  "none": "Don't show any details",
  "functionCall": "This is the function call executed",
  "javascript": "For executing using the `geth` JavaScript console",
  "formatted": "For displaying the chunks of raw data",
  "raw": "This raw data can be copied into MyCrypto or MyEtherWallet for deployment",
}
var SYMBOLMAXLENGTH = 64;
var NAMEMAXLENGTH = 128;
var DECIMALSMAX = 18;
var TOTALSUPPLYMAX = new BigNumber("1").shift(14); // 100 trillion

var DEFAULTSYMBOL = "BBC";
var DEFAULTNAME = "Bob's Burgers 🍔 & Chips 🍟 Loyalty Points";
var DEFAULTDECIMALS = "18";
var DEFAULTTOTALSUPPLY = "123.456";
var DEFAULTMINIMUMFEE = "0.1";
var FACTORYDISPLAYMAXCHILDREN = 5;
var FACTORYDEPLOYGASREQUIREMENT = 1200000;

var FACTORYADDRESS = "0xA550114ee3688601006b8b9f25e64732eF774934";
var FACTORYABI = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"tokens","type":"uint256"}],"name":"recoverTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_minimumFee","type":"uint256"}],"name":"setMinimumFee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"minimumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberOfChildren","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"children","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"newAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"}],"name":"deployTokenContract","outputs":[{"name":"token","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAddress","type":"address"}],"name":"deprecateFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isChild","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_newAddress","type":"address"}],"name":"FactoryDeprecated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldFee","type":"uint256"},{"indexed":false,"name":"newFee","type":"uint256"}],"name":"MinimumFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"token","type":"address"},{"indexed":false,"name":"symbol","type":"string"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"decimals","type":"uint8"},{"indexed":false,"name":"totalSupply","type":"uint256"}],"name":"TokenDeployed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"}];
var factoryAbi = [{"constant":false,"inputs":[{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"}],"name":"deployTokenContract","outputs":[{"name":"token","type":"address"}],"payable":true,"stateMutability":"payable","type":"function"}];
var tokenAbi = [{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"tokens","type":"uint256"}],"name":"recoverTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"symbol","type":"string"},{"name":"name","type":"string"},{"name":"decimals","type":"uint8"},{"name":"fixedSupply","type":"uint256"}],"name":"init","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];

// ----------------------------------------------------------------------------
// Checking functions
// ----------------------------------------------------------------------------
function isSymbolOk(symbol) {
  try {
    return symbol.length > 0 && symbol.length <= SYMBOLMAXLENGTH;
  } catch (e) {
  }
  return false;
}
function isNameOk(name) {
  try {
    return name.length > 0 && name.length <= NAMEMAXLENGTH;
  } catch (e) {
  }
  return false;
}
function isDecimalsOk(decimals) {
  if (decimals.length > 0) {
    try {
      return decimals >= 0 && decimals <= DECIMALSMAX;
    } catch (e) {
    }
    return false;
  }
}
function isTotalSupplyOk(totalSupply) {
  if (totalSupply.length > 0) {
    try {
      var _totalSupply = new BigNumber(totalSupply);
      return _totalSupply.greaterThan(0) && _totalSupply.lessThanOrEqualTo(TOTALSUPPLYMAX);
    } catch (e) {
    }
    return false;
  }
}
function isDeploymentFeeOk(deploymentFee, factoryMinimumFee) {
  if (deploymentFee.length > 0) {
    try {
      var _deploymentFee = new BigNumber(deploymentFee);
      return _deploymentFee.greaterThanOrEqualTo(factoryMinimumFee.shift(-18));
    } catch (e) {
    }
    return false;
  }
}

const DeployTokenContract = {
  template: `
    <div>
      <div>
        <b-row>
          <b-col cols="12" md="8">
            <b-card title="Deploy Fixed Supply Token Contract" sub-title="BokkyPooBah's Fixed Supply Token 👊 Factory v1.10">
              <b-form @submit="onSubmit" v-if="show">
                <b-form-group id="symbolInputGroup" label-for="symbolInput" label="Symbol" label-cols="4" description="An uppercase word a few letters long">
                  <b-form-input id="symbolInput" type="text" :value.trim="symbol" @input="updateSymbol" required placeholder="example '${DEFAULTSYMBOL}'"></b-form-input>
                </b-form-group>
                <b-form-group id="nameInputGroup" label-for="nameInput" label="Name" label-cols="4" description="A set of mixed case words">
                  <b-form-input id="nameInput" type="text" :value.trim="name" @input="updateName" required placeholder="example '${DEFAULTNAME}'"></b-form-input>
                </b-form-group>
                <b-form-group id="decimalsInputGroup" label-for="decimalsInput" label="Decimals" label-cols="4" description="Number of decimal places, between 0 and 18, inclusive">
                  <b-form-input id="decimalsInput" type="number" step="1" :value.trim="decimals" @input="updateDecimals" required placeholder="example '${DEFAULTDECIMALS}'"></b-form-input>
                </b-form-group>
                <b-form-group id="totalSupplyInputGroup" label-for="totalSupplyInput" label="Total Supply" label-cols="4" description="A positive number less than or equals to 100,000,000,000,000">
                  <b-form-input id="totalSupplyInput" type="number" step="any" :value.trim="totalSupply" @input="updateTotalSupply" required placeholder="example '${DEFAULTTOTALSUPPLY}'"></b-form-input>
                </b-form-group>
                <b-form-group id="deploymentFeeInputGroup" label-for="deploymentFeeInput" label="Deployment Fee" label-cols="4" description="Minimum deployment fee 0.1 ethers">
                  <b-form-input id="deploymentFeeInput" type="number" step="0.000000001" :value.trim="deploymentFee" @input="updateDeploymentFee" required placeholder="example '${DEFAULTMINIMUMFEE}'"></b-form-input>
                </b-form-group>
                <b-form-group label="Show Details: " label-cols="4">
                  <b-form-radio-group id="showDetails" v-model="showDetails" name="transactionDataTypeComponent">
                    <b-form-radio value="none" v-b-popover.hover.top="'Dont show any details'">None</b-form-radio>
                    <b-form-radio value="functionCall" v-b-popover.hover.top="'For executing using the geth JavaScript console'">Function Call</b-form-radio>
                    <b-form-radio value="javascript" v-b-popover.hover.top="'For executing using the geth JavaScript console'">JavaScript</b-form-radio>
                    <b-form-radio value="formatted" v-b-popover.hover.top="'For displaying the chunks of raw data'">Formatted</b-form-radio>
                    <b-form-radio value="raw" v-b-popover.hover.top="'This raw data can be copied into MyCrypto or MyEtherWallet for deployment'">Raw</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group id="transactionDataInputGroup" label-cols="4" label-for="transactionDataInput" v-if="showDetails != 'none'" label="Transaction details" :description="getDescription">
                  <b-form-textarea id="transactionDataInput" v-model.trim="getTransactionData" plaintext :wrap="showDetails === 'raw' ? 'soft' : 'off'" rows="10" max-rows="20" ></b-form-textarea>
                </b-form-group>
                <b-form-group>
                  <b-button type="submit" id="deploy" :disabled="actionDeploy === true" variant="primary">{{ actionDeploy === true ? "Deploying Token Contract ... " : "Deploy Token Contract" }}</b-button>
                </b-form-group>
                <b-form-group>
                  <b-button v-show="deploymentTx" :href="explorer + 'tx/' + deploymentTx" variant="success" target="_blank">View transaction {{ deploymentTx }}</b-button>
                </b-form-group>
                <b-form-group>
                  <b-button v-show="deploymentTxError" variant="danger">{{ deploymentTxError }}</b-button>
                </b-form-group>
              </b-form>
            </b-card>
          </b-col>
          <b-col cols="12" md="4">
            <connection></connection>
            <br />
            <b-card v-if="show" title="Fixed Supply Token Factory">
              <b-row>
                <b-col cols="4">Factory Address</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + factoryAddress" class="card-link" target="_blank">{{ factoryAddress }}</b-link></b-col>
              </b-row>
              <b-row>
                <b-col cols="4">Minimum fee</b-col><b-col class="truncate" cols="8"><b-link :href="explorer + 'address/' + factoryAddress + '#readContract'" class="card-link" target="_blank">{{ factoryMinimumFeeString }}</b-link> ETH</b-col>
              </b-row>
              <div>Latest deployed token contracts (max {{ factoryDisplayMaxChildren + ' of ' + factoryNumberOfChildren }})</div>
              <b-row no-gutters v-for="(child) in factoryChildren">
                <b-col cols="1">{{ child.number }}</b-col>
                <b-col class="truncate">
                  <b-link :href="explorer + 'token/' + child.address" class="card-link" target="_blank">{{ child.symbol + ':' + child.name + ':' + child.decimals + ':' + child.totalSupplyString + ':' + child.address.substring(0, 10) }}</b-link>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  `,
  data: function () {
    return {
      count: 3,
      show: true,
      transactionData: "0x123456",
      showDetails: "none",
    }
  },
  computed: {
    symbol() {
      return store.getters['deployTokenContract/symbol'];
    },
    name() {
      return store.getters['deployTokenContract/name'];
    },
    decimals() {
      return store.getters['deployTokenContract/decimals'];
    },
    totalSupply() {
      return store.getters['deployTokenContract/totalSupply'];
    },
    deploymentFee() {
      return store.getters['deployTokenContract/deploymentFee'];
    },
    factoryAddress() {
      return store.getters['deployTokenContract/factoryAddress'];
    },
    factoryMinimumFee() {
      return store.getters['deployTokenContract/factoryMinimumFee'];
    },
    factoryMinimumFeeString() {
      return new BigNumber(store.getters['deployTokenContract/factoryMinimumFee']).shift(-18).toString();
    },
    factoryNumberOfChildren() {
      return store.getters['deployTokenContract/factoryNumberOfChildren'];
    },
    factoryDisplayMaxChildren() {
      return store.getters['deployTokenContract/factoryDisplayMaxChildren'];
    },
    factoryChildren() {
      return store.getters['deployTokenContract/factoryChildren'];
    },
    actionDeploy() {
      return store.getters['deployTokenContract/actionDeploy'];
    },
    deploymentTx() {
      return store.getters['deployTokenContract/deploymentTx'];
    },
    deploymentTxError() {
      return store.getters['deployTokenContract/deploymentTxError'];
    },
    explorer () {
      return store.getters['connection/explorer'];
    },
    getDescription() {
      return descriptions[this.showDetails];
    },
    getTransactionData() {
      var result;
      if (isSymbolOk(this.symbol) && isNameOk(this.name) && isDecimalsOk(this.decimals) && isTotalSupplyOk(this.totalSupply) && isDeploymentFeeOk(this.deploymentFee, this.factoryMinimumFee)) {
        if (this.showDetails == "functionCall") {
          result = "deployTokenContract('" + this.symbol + "', '" + this.name + "', " + this.decimals + ", " + new BigNumber(this.totalSupply).shift(this.decimals) + ")";
        } else if (this.showDetails == "javascript") {
          result = "var myAccount = \"{your account}\";\n" +
            "var factoryAddress = \"" + factoryAddress + "\";\n" +
            "var factoryAbi = " + JSON.stringify(factoryAbi) + ";\n" +
            "var factory = web3.eth.contract(factoryAbi).at(factoryAddress);\n" +
            "var tx = factory.deployTokenContract(\"" +this.symbol + "\", \"" + this.name + "\", " + this.decimals + ", " +
              new BigNumber(this.totalSupply).shift(this.decimals) + ", { from: myAccount, gas: \"" + FACTORYDEPLOYGASREQUIREMENT + "\", value: web3.toWei(\"" + this.deploymentFee + "\", \"ether\") });\n" +
            "web3.eth.getTransaction(tx);";
        } else {
          var factory = web3.eth.contract(factoryAbi).at(factoryAddress);
          try {
            var nullAccount = "0x0";
            result = factory.deployTokenContract.getData(this.symbol, this.name, this.decimals, this.totalSupply, {from: nullAccount});
            if (this.showDetails == "formatted") {
              var offset = 10;
              var tempResult = result.substring(0, 10) + "\n" + result.substring(10).match(/.{1,64}/g).join("\n");
              result = tempResult;
            }
          } catch (e) {
            result = e;
          }
        }
      } else {
          result = "Please fill in / correct the following input fields:";
          if (!isSymbolOk(this.symbol)) {
            result += " symbol"
          }
          if (!isNameOk(this.name)) {
            result += " name"
          }
          if (!isTotalSupplyOk(this.totalSupply)) {
            result += " totalSupply"
          }
          if (!isDeploymentFeeOk(this.deploymentFee, this.factoryMinimumFee)) {
            result += " deploymentFee"
          }
      }
      return result;
    },
    explorer () {
      return store.getters['connection/explorer'];
    },
  },
  methods: {
    updateSymbol (e) {
      this.$store.commit('deployTokenContract/updateSymbol', e);
    },
    updateName (e) {
      this.$store.commit('deployTokenContract/updateName', e);
    },
    updateDecimals (e) {
      this.$store.commit('deployTokenContract/updateDecimals', e);
    },
    updateTotalSupply (e) {
      this.$store.commit('deployTokenContract/updateTotalSupply', e);
    },
    updateDeploymentFee (e) {
      this.$store.commit('deployTokenContract/updateDeploymentFee', e);
    },
    onSubmit(event) {
      event.preventDefault();
      // this.deploymentTx = null;
      // this.deploymentTxError = "";
      this.$store.commit('deployTokenContract/updateActionDeploy', true);
      // this.actionDeploy = true;
    },
  },
};


const deployTokenContractModule = {
  namespaced: true,
  state: {
    symbol: DEFAULTSYMBOL,
    name: DEFAULTNAME,
    decimals: DEFAULTDECIMALS,
    totalSupply: DEFAULTTOTALSUPPLY,
    deploymentFee: DEFAULTMINIMUMFEE,
    factoryAddress: FACTORYADDRESS,
    factoryMinimumFee: "0",
    factoryNumberOfChildren: 0,
    factoryDisplayMaxChildren: FACTORYDISPLAYMAXCHILDREN,
    factoryChildren: {},
    actionDeploy: false,
    deploymentTx: null,
    deploymentTxError: "",
  },
  getters: {
    symbol: state => state.symbol,
    name: state => state.name,
    decimals: state => state.decimals,
    totalSupply: state => state.totalSupply,
    deploymentFee: state => state.deploymentFee,
    factoryAddress: state => state.factoryAddress,
    factoryMinimumFee: state => state.factoryMinimumFee,
    factoryNumberOfChildren: state => state.factoryNumberOfChildren,
    factoryDisplayMaxChildren: state => state.factoryDisplayMaxChildren,
    factoryChildren: state => state.factoryChildren,
    actionDeploy: state => state.actionDeploy,
    deploymentTx: state => state.deploymentTx,
    deploymentTxError: state => state.deploymentTxError,
  },
  mutations: {
    updateSymbol (state, symbol) {
      state.symbol = symbol;
      logIt("deployTokenContractModule", "updateSymbol('" + symbol + "')")
    },
    updateName (state, name) {
      state.name = name;
      logIt("deployTokenContractModule", "updateName('" + name + "')");
    },
    updateDecimals (state, decimals) {
      state.decimals = decimals;
      logIt("deployTokenContractModule", "updateDecimals('" + decimals + "')");
    },
    updateTotalSupply (state, totalSupply) {
      state.totalSupply = totalSupply;
      logIt("deployTokenContractModule", "updateTotalSupply('" + totalSupply + "')");
    },
    updateDeploymentFee (state, deploymentFee) {
      state.deploymentFee = deploymentFee;
      logIt("deployTokenContractModule", "updateDeploymentFee('" + deploymentFee + "')");
    },
    updateFactoryMinimumFee (state, factoryMinimumFee) {
      state.factoryMinimumFee = factoryMinimumFee;
      logIt("deployTokenContractModule", "updateFactoryMinimumFee('" + factoryMinimumFee + "')");
    },
    updateFactoryNumberOfChildren (state, factoryNumberOfChildren) {
      state.factoryNumberOfChildren = factoryNumberOfChildren;
      logIt("deployTokenContractModule", "updateFactoryNumberOfChildren('" + factoryNumberOfChildren + "')");
    },
    updateFactoryChildren (state, factoryChildren) {
      Vue.set(state, 'factoryChildren', factoryChildren);
      logIt("deployTokenContractModule", "updateFactoryChildren('" + factoryChildren.length + "' items)");
    },
    updateActionDeploy (state, actionDeploy) {
      state.actionDeploy = actionDeploy;
      logIt("deployTokenContractModule", "updateActionDeploy('" + actionDeploy + "')");
    },
    updateDeploymentTx (state, deploymentTx) {
      state.deploymentTx = deploymentTx;
      logIt("deployTokenContractModule", "updateDeploymentTx('" + deploymentTx + "')");
    },
    updateDeploymentTxError (state, deploymentTxError) {
      state.deploymentTxError = deploymentTxError;
      logIt("deployTokenContractModule", "updateDeploymentTxError('" + deploymentTxError + "')");
    },
  },
  actions: {
    async execWeb3 ({state, commit}, {count, networkChanged, blockChanged}) {
      logIt("deployTokenContractModule", "execWeb3() start[" + count + ", " + networkChanged + ", " + blockChanged + "]");
      var factory = web3.eth.contract(FACTORYABI).at(FACTORYADDRESS);
      if (networkChanged || blockChanged) {
        var _minimumFee = promisify(cb => factory.minimumFee(cb));
        var minimumFee = await _minimumFee;
        if (!minimumFee.equals(state.factoryMinimumFee)) {
          commit('updateFactoryMinimumFee', minimumFee);
        }
      }

      var childrenChanged = false;
      if (networkChanged || blockChanged) {
        var _numberOfChildren = promisify(cb => factory.numberOfChildren(cb));
        var factoryNumberOfChildren = new BigNumber(await _numberOfChildren);
        if (!new BigNumber(factoryNumberOfChildren).equals(state.factoryNumberOfChildren)) {
          commit('updateFactoryNumberOfChildren', factoryNumberOfChildren);
          childrenChanged = true;
        }
      }

      if (childrenChanged || networkChanged) {
        var child = factoryNumberOfChildren - 1;
        var factoryChildren = [];
        var seen = {};
        while (child >= 0 && child >= (factoryNumberOfChildren - state.factoryDisplayMaxChildren)) {
          var _childAddress = promisify(cb => factory.children(child, cb));
          var childAddress = await _childAddress;
          var token = web3.eth.contract(tokenAbi).at(childAddress);
          var _symbol = promisify(cb => token.symbol(cb));
          var _name = promisify(cb => token.name(cb));
          var _decimals = promisify(cb => token.decimals(cb));
          var _totalSupply = promisify(cb => token.totalSupply(cb));
          var symbol = await _symbol;
          var name = await _name;
          var decimals = await _decimals;
          var totalSupply = await _totalSupply;
          var totalSupplyString = new BigNumber(totalSupply).shift(-decimals);
          if (!seen[childAddress]) {
            logIt("deployTokenContractModule", "execWeb3() Adding [" + childAddress.substring(0, 10) + ", " + symbol + "]");
            factoryChildren.push({ number: child + 1, address: childAddress, symbol: symbol, name: name, decimals: decimals, totalSupply: totalSupply, totalSupplyString: totalSupplyString });
            seen[childAddress] = true;
          } else {
            logIt("deployTokenContractModule", "execWeb3() Already seen [" + childAddress + "]");
          }
          child--;
        }
        commit('updateFactoryChildren', factoryChildren);
      }

      if (state.actionDeploy) {
        logIt("deployTokenContractModule", "execWeb3() Deploying ...");
        var balance = store.getters['connection/balance'];
        logIt("deployTokenContractModule", "execWeb3() balance: " + balance + " " + balance.shift(-18));
        var deploymentFeeInWei = new BigNumber(state.deploymentFee).shift(18);
        logIt("deployTokenContractModule", "execWeb3() deploymentFee: " + deploymentFeeInWei + " " + state.deploymentFee);
        logIt("deployTokenContractModule", "execWeb3() factoryMinimumFee: " + state.factoryMinimumFee + " " + state.factoryMinimumFee.shift(-18).toString());
        if ((balance.greaterThanOrEqualTo(deploymentFeeInWei)) && (deploymentFeeInWei.greaterThanOrEqualTo(state.factoryMinimumFee))) {
          logIt("deployTokenContractModule", "execWeb3() factory.deployTokenContract('" + state.symbol + "', '" + state.name + "', " + state.decimals + ", " + new BigNumber(state.totalSupply).shift(state.decimals).toString() + ", {from: " + store.getters['connection/coinbase'] + ", gas: " + FACTORYDEPLOYGASREQUIREMENT + ", value: " + new BigNumber(state.deploymentFee).shift(18).toString() + "})");
          factory.deployTokenContract(state.symbol, state.name, state.decimals, new BigNumber(state.totalSupply).shift(state.decimals).toString(), { from: store.getters['connection/coinbase'], gas: FACTORYDEPLOYGASREQUIREMENT, value: new BigNumber(state.deploymentFee).shift(18).toString() }, function(error, tx) {
            if (!error) {
              logIt("deployTokenContractModule", "execWeb3() deploy tx: " + tx);
              commit('updateDeploymentTx', tx);
            } else {
              logIt("deployTokenContractModule", "execWeb3() deploy error: ");
              console.table(error);
              commit('updateDeploymentTxError', error.message);
            }
          });
        } else {
          if (balance.lessThan(deploymentFeeInWei)) {
            commit('updateDeploymentTxError', "Insufficient funds in your account (" + new BigNumber(balance).shift(-18) + " ETH) to pay the deployment fee (" + state.deploymentFee + " ETH)");
          } else {
            commit('updateDeploymentTxError', "Deployment fee (" + state.deploymentFee + " ETH) must be greater than or equals to the minimum deployment fee (" + new BigNumber(state.factoryMinimumFee).shift(-18) + " ETH)");
          }
        }
        commit('updateActionDeploy', false);
      }

      logIt("deployTokenContractModule", "execWeb3() end[" + count + "]");
    },
  },
};
