import web3 from './web3';

import Bank from './build/Bank.json';

const instance = new web3.eth.Contract(
    JSON.parse(Bank.interface),
    '0xfE78f00b69A5FfF9fCcd2dd273d3b3738549D5Ba'
);

export default instance;