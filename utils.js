
const hdkey = require('hdkey'); // bip32
const bip39 = require('bip39');
const Web3 = require('web3');
const ECPair = require('bitcoinjs-lib').ECPair;
const NETWORKS = require('bitcoinjs-lib').networks;
var BigInteger = require('bigi');
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

function getBitCoinECPair(mnemonic, options)
{
    var masterSeed = bip39.mnemonicToSeed(mnemonic);

    var  masterNode = hdkey.fromMasterSeed(masterSeed);

    const btcPath = `m/44'/0'/0'/0/0`;
    var  node;
    if( options && options.path ) {
        node = masterNode.derive(options.path);
    }
    else {
        node = masterNode.derive(btcPath); 
    }

    // return ECPair.fromPrivateKey(node.privateKey);

    return new ECPair(BigInteger.fromBuffer(node.privateKey), null, {
        network: NETWORKS.bitcoin
    })
}



module.exports = {
    getWeb3EthAccountFromMnemonic: getWeb3EthAccountFromMnemonic,
    getBitCoinECPair: getBitCoinECPair,
    isValidMnemonic: bip39.validateMnemonic
}
