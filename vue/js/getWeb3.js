// ----------------------------------------------------------------------------
// BokkyPooBah's Ether Vending Machine v0.90 - Vue.js + Bootstrap version
//
// Enjoy. (c) BokkyPooBah / Bok Consulting Pty Ltd 2019. The MIT Licence.
// ----------------------------------------------------------------------------

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
  console.log("[getWeb3] lastBalance: " + lastBalance);
  console.log("[getWeb3] balance: " + results.balance);
  if (lastBalance != null && results.balance.equals(lastBalance)) {
    results.balanceChanged = false;
  }
  lastBalance = results.balance;
  console.log("[getWeb3] balanceChanged: " + results.balanceChanged);
  console.log("[getWeb3] lastBalance: " + lastBalance);
  console.log("[getWeb3] balance: " + results.balance);

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
