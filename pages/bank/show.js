import React, {Component} from 'react';
import { Message } from  'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link } from "../../routes";
import web3 from '../../ethereum/web3';
import BigNumber from "bignumber.js";

class BankShow extends Component{
    
    state = {
        accounts: '',
        balance: ''
    };
    
    componentDidMount() {
        const accounts = web3.eth.getAccounts();
        const dataSet  = Promise.resolve(accounts);
        dataSet.then((values) => { 
            this.setState({ accounts: values});
            const balance = web3.eth.getBalance(values[0]);
            const data  = Promise.resolve(balance);
            data.then((values) => { this.setState({ balance: values}) });
        }); 
    }
    
    render() {
        return (
                <Layout>
                <Message
                    header='Bank Loan View'
                    content='You can have a look into your bank information'
                />
                    <h5>Account address : {this.state.accounts}</h5>
                    <h5>Account balance :  {this.state.balance}</h5>
                </Layout>

        );
    }
}

export default BankShow;
