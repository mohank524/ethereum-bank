import React, {Component} from 'react';
import { Message } from  'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link } from "../../routes";
import web3 from '../../ethereum/web3';
import BigNumber from "bignumber.js";
import Bank from '../../ethereum/bank';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'


class BankShow extends Component{
    
    state = {
        accounts: '',
        balance: '',
        details:'',
        loanId:''
    };

    static async getInitialProps(props) {
        const bank = Bank(props.query.address);
        const accounts = web3.eth.getAccounts();        
        const summary = await bank.methods.getBalance(accounts[0]).call();
        return {summary};
    }
 
    render() {
        return (
                <Layout>
                <Message
                    header=' View'
                    content='You can have a look into your  information'
                />
                    <Table celled compact definition>
                    <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Balance</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    <Table.Row>
                        {/* <Table.Cell>{this.state.balance}</Table.Cell> */}
                        <Table.Cell>No</Table.Cell>
                        <Table.Cell><Button size='small'>Approve</Button></Table.Cell>
                    </Table.Row>
                    </Table.Body>
                    
                </Table>
                </Layout>
        );
    }
}

export default BankShow;
