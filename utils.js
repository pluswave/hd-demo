
const hdkey = require('hdkey'); // bip32
const bip39 = require('bip39');
const Web3 = require('web3');

const web3 = new Web3();

function getWeb3EthAccountFromMnemonic(mnemonic, options) {

    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = hdkey.fromMasterSeed(masterSeed);

    const metaMaskPath = `m/44'/60'/0'/0/0`;
    var  node;
    if( options && options.path ) {
        node = masterNode.derive(options.path);
    }
    else {
        node = masterNode.derive(metaMaskPath); 
    }

    var account = web3.eth.accounts.privateKeyToAccount('0x' + node.privateKey.toString('hex'));

    return account;
}


module.exports = {
    getWeb3EthAccountFromMnemonic: getWeb3EthAccountFromMnemonic,
    isValidMnemonic: bip39.validateMnemonic
}
