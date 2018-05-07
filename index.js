
const utils = require('./utils');
const bip39 = require('bip39');

const wordList = bip39.generateMnemonic(
    128,  // 128 + 32x (4>=x>=0), 每32bit得到3个单词, 默认 128bit
    undefined, // 随机缓存算法，默认使用 randombytes 库
    bip39.wordlists.EN // 字典列表，包含2048个单词或者字，默认英文
);

console.log(wordList);
console.log( utils.getWeb3EthAccountFromMnemonic(wordList).address);
console.log (utils.isValidMnemonic(wordList));

console.log( utils.getWeb3EthAccountFromMnemonic(
    wordList, 
    {path: "m/44'/60'/0'/0"}).address // 默认path: m/44'/60'/0'/0/0
);

const wordListCN = bip39.generateMnemonic(undefined, undefined, bip39.wordlists.chinese_simplified);
console.log(wordListCN);
console.log( utils.getWeb3EthAccountFromMnemonic(wordListCN).address);
console.log (utils.isValidMnemonic(wordListCN, bip39.wordlists.chinese_simplified));
