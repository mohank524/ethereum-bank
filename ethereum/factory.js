import web3 from './web3';

import BankFactory from './build/BankFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(BankFactory.interface),
    '0x4ED2ADEE77aE5b7e0D39980709610856De173b99'
);

export default instance;