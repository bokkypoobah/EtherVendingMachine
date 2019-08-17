// ----------------------------------------------------------------------------
// BokkyPooBah's Ether Vending Machine v0.90 - Vue.js + Bootstrap version
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2019. The MIT Licence.
// ----------------------------------------------------------------------------

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


var lastNetworkId = -2;
var lastCoinbase = null;
var lastBalance = null;
var lastBlockHash = null;
var web3ConnectionOk = false;
// ----------------------------------------------------------------------------
// Get web3 connection
// Notes:
// * Network is OK if networkId != null && coinbase != null && balance != null && block != null
// * Connection changed = changed network || changed coinbase || changed balance
//   * Block changes (hash check) are not reflected in the connection change status
// ----------------------------------------------------------------------------
async function getWeb3() {
  // console.log("[getWeb3] begin");
  var results = {
    networkId: null,
    networkChanged: true,
    networkType: null,
    networkName: null,
    explorer: null,
    faucets: null,
    coinbase: null,
    coinbaseChanged: true,
    balance: null,
    balanceChanged: true,
    connectionOk: false,
    connectionChanged: true,
    errors: [],
    block: null,
    blockChanged: true,
  }

  if (!web3ConnectionOk) {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        results.networkType = "MetaMask / Modern dapp browsers";
        // Accounts now exposed
        web3ConnectionOk = true;
      } catch (error) {
        // User denied account access...
        results.errors.push(error.message);
      }
    // Legacy dapp browsers...
    } else if (window.web3) {
      try {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        results.networkType = "Legacy dapp browsers";
        web3ConnectionOk = true;
      } catch (error) {
        results.errors.push(error.message);
      }
    // Non-dapp browsers...
    } else {
      try {
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        results.networkType = "Non-dapp browsers";
        web3ConnectionOk = true;
      } catch (error) {
        results.errors.push(error.message);
      }
    }
  }

  if (web3ConnectionOk) {
    try {
      var _networkId = promisify(cb => web3.version.getNetwork(cb));
      results.networkId = await _networkId;
    } catch (error) {
      web3ConnectionOk = false;
      results.errors.push(error.message);
    }
  }
  if (results.networkId === lastNetworkId) {
    results.networkChanged = false;
  }
  lastNetworkId = results.networkId;

  var network = networks[results.networkId] || networks[-1];
  results.networkName = network.name;
  results.explorer = network.explorer;
  results.faucets = network.faucets;

  if (web3ConnectionOk) {
    try {
      var _coinbase = promisify(cb => web3.eth.getCoinbase(cb));
      results.coinbase = await _coinbase;
    } catch (error) {
      web3ConnectionOk = false;
      results.errors.push(error.message);
    }
  }
  if (results.coinbase === lastCoinbase) {
    results.coinbaseChanged = false;
  }
  lastCoinbase = results.coinbase;

  if (web3ConnectionOk && results.coinbase != null) {
    try {
      var _balance = promisify(cb => web3.eth.getBalance(results.coinbase, cb));
      results.balance = new BigNumber(await _balance);
    } catch (error) {
      web3ConnectionOk = false;
      results.errors.push(error.message);
    }
  }
  if (lastBalance != null && results.balance.equals(lastBalance)) {
    results.balanceChanged = false;
  }
  lastBalance = results.balance;

  if (web3ConnectionOk) {
    try {
      var _block = promisify(cb => web3.eth.getBlock("latest", false, cb));
      results.block = await _block;
    } catch (error) {
      web3ConnectionOk = false;
      results.errors.push(error.message);
    }
  }
  if (results.block != null && results.block.hash === lastBlockHash) {
    results.blockChanged = false;
  }
  lastBlockHash = results.block == null ? null : results.block.hash;

  results.connectionOk = results.networkId != null && results.coinbase != null && results.balance != null && results.block != null;
  results.connectionChanged = results.networkChanged || results.coinbaseChanged || results.balanceChanged;

  // console.log("[getWeb3] returning " + JSON.stringify(results));
  return results;
}
