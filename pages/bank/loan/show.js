import React, {Component} from 'react';
import { Message,Card, Grid } from  'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from "../../../routes";
import web3 from '../../../ethereum/web3';
import BigNumber from "bignumber.js";
import Bank from '../../../ethereum/bank';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'


class BankShow extends Component{

    static async getInitialProps(props) {
        const bank = Bank(props.query.address);
        const summary = await bank.methods.getLoanData().call();
        return {
            _addressOfProperty: summary[0],
            _purchasePrice:summary[1],
            _term:summary[2],
            _interest:summary[3],
            _loanAmount:summary[4],
            _annualTax:summary[5],
            _annualInsurance:summary[6],
            _status:summary[7],
            _monthlyPi:summary[8],
            _monthlyTax:summary[9],
            _monthlyInsurance:summary[10],
        };
    }
    renderCard() {

        const {
            _addressOfProperty,
            _status,
            _term,
            _interest,
            _loanAmount,
            _annualTax,
            _annualInsurance,
            _monthlyPi,
            _monthlyTax,
            _monthlyInsurance,
            _purchasePrice
        } = this.props;

        const item = [
            {
                header: _addressOfProperty,
                meta: 'Address of manager',
                description: 'The manager created this loan and can create request to with draw money',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _purchasePrice,
                meta: 'Balance Purchase Price ',
                description: 'Purchase Price you have',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _status,
                meta: 'Address of _status',
                description: 'Status of the loan',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _term,
                meta: 'Minimum _term ',
                description: 'Term for the Loan',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _interest,
                meta: 'Number of _interest',
                description: 'Loan interest rate',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _loanAmount,
                meta: 'Number of _loanAmount',
                description: 'Loan Amount ',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _annualTax,
                meta: 'Balance _annualTax ',
                description: 'Annual Tax you have to pay',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _annualInsurance,
                meta: 'Balance _annualInsurance ',
                description: 'Annual Insurance you have to pay',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _monthlyPi,
                meta: 'Balance _monthlyPi ',
                description: 'Monthly Pi you have',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _monthlyTax,
                meta: 'Balance _monthlyTax ',
                description: 'Monthly Tax you have tp Pay',
                style:{ overflowWrap: 'break-word' }
            },
            {
                header: _monthlyInsurance,
                meta: 'Balance _purchasePrice ',
                description: 'Purchase Price you have',
                style:{ overflowWrap: 'break-word' }
            }
        ];
        return < Card.Group items={item} />;
    }
    
    render() {
        return (
                <Layout>
                <Message
                    header=' View'
                    content='You can have a look into your  information'
                />
        <Grid>
                <Grid.Row>
                    <Grid.Column width={14}>
                        {this.renderCard() }
                    </Grid.Column>
                    <Grid.Column width={6}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    {/* <Link route = {`/campaigns/${this.props.address}/requests`} > */}
                        {/* <a>
                            <Button primary > View Requests </Button>
                        </a> */}
                    {/* </Link> */}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                </Layout>

        );
    }
}

export default BankShow;
