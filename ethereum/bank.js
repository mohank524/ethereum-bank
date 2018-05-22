import web3 from './web3';
import Bank from './build/Bank.json';

export default address => {
    return new web3.eth.Contract(
        JSON.parse(Bank.interface), address);
};