import React, {Component} from 'react';
import { Button, Divider, Card  } from  'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from "../routes";


class BankIndex extends Component{

    static async getInitialProps() {
        const bank = await factory.methods.getDeployedBank().call();
        return {bank};
    }

    renderbanks() {
        const item = this.props.bank.map(address => {
            return {
                header: address,
                description:(
                    <Link route={`/bank/${address}/loan/new`}>
                    <a>Request for Loan</a>
                    </Link>
                ),
                fluid: true
            };
        });
        return <Card.Group items={item} />;
    }

    render() {
        return (
        <Layout>
            <div>
            <h3>Open Bank </h3>
            <Link route='/bank/new'>
                <a>
                    <Button floated="right"
                        content="Create Bank Account"
                        icon="add"
                        primary
                    />
                </a>
            </Link>
            { this.renderbanks()  }
            </div>            
        </Layout>
        );
    }
}


export default BankIndex;
