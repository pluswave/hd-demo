
const bip32 = require('bip32');
const bip39 = require('bip39');
const Web3 = require('web3');
const ECPair = require('bitcoinjs-lib').ECPair;

const web3 = new Web3();

function getWeb3EthAccountFromMnemonic(mnemonic, options) {

    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = bip32.fromSeed(masterSeed);

    const metaMaskPath = `m/44'/60'/0'/0/0`;
    var  node;
    if( options && options.path ) {
        node = masterNode.derivePath(options.path);
    }
    else {
        node = masterNode.derivePath(metaMaskPath);
    }

    var account = web3.eth.accounts.privateKeyToAccount('0x' + node.privateKey.toString('hex'));

    return account;
}

function getBitCoinECPair(mnemonic, options)
{
    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = bip32.fromSeed(masterSeed);

    const btcPath = `m/44'/0'/0'/0/0`;
    var  node;
    if( options && options.path ) {
        node = masterNode.derivePath(options.path);
    }
    else {
        node = masterNode.derivePath(btcPath); 
    }

    return ECPair.fromPrivateKey(node.privateKey);
}



module.exports = {
    getWeb3EthAccountFromMnemonic: getWeb3EthAccountFromMnemonic,
    getBitCoinECPair: getBitCoinECPair,
    isValidMnemonic: bip39.validateMnemonic
}
