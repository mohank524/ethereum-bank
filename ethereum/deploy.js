const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Bank');


const provider = new HDWalletProvider(
    "primary lumber speed melody walk twin arm earn shrimp chimney stage butter",
    "https://rinkeby.infura.io/vTwdTiIlPwAbLIRKTMYU"
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Atempting to deploy accounts{2}{2}", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({"data": compiledFactory.bytecode})
        .send({from: accounts[0], gas:2000000});

    console.log("Contract deployed to ", result.options.address);
};

deploy();
