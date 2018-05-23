import React, {Component} from 'react';
import { Input, Segment, Divider, Form, Button, Message } from  'semantic-ui-react';
import Bank from '../../ethereum/bank';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from "../../routes";
import web3 from '../../ethereum/web3';
import { Router } from '../../routes'


class BankNew extends Component {
    
    state = {
        amount: '',
        address: '',
        date: '',
        errorMessage:''
    };


    onSubmit = async event => {
        event.preventDefault();

        const { address } = this.state;
        this.setState({loading: true});        
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createBank(
                address)
                .send({from:accounts[0]});
            Router.pushRoute(`/`);
        } catch (err) {
        this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return (
                <Layout>
                    <Segment style={{ marginTop: '50px' }}>
                        <h2>Bank Loan System</h2>
                        <Divider section /> 
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>  
                        <label>
                            Amount
                        </label>  
                            <Input value={this.state.amount}  
                                onChange= {event =>
                            this.setState({ amount: event.target.value}) }
                        />
                        </Form.Field>  
                        <Form.Field>  
                        <label>
                            Address
                        </label>    
                        <Input value={this.state.address}
                        onChange= {event =>
                            this.setState({ address:  event.target.value })}
                        />
                        </Form.Field> 
                        <Message error header="Oops" content={this.state.errorMessage} />           
                        <Button primary loading={this.state.loading } >Create </Button> 
                    </Form>      
                    </Segment>
                </Layout>
        );
    }
}

export default BankNew;
