import React, {Component} from 'react';
import { Input, Segment, Divider, Form, Button, Message } from  'semantic-ui-react';
import Bank from '../../../ethereum/bank';
import Layout from '../../../components/Layout';
import { Link } from "../../../routes";
import web3 from '../../../ethereum/web3';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router } from '../../../routes'


class BankNew extends Component {
    
    state = {
        amount: '',
        address: '',
        loading: false,
        errorMessage:'',
        _purchasePrice:'',
        _term:'',
        _interest:'',
        _loanAmount:'',
        _annualTax:'',
        _annualInsurance:'', 
        _monthlyPi:'',
        _monthlyTax:'',
        _monthlyInsurance:'',
        _addressOfProperty:'',
        _mortgageHolder:'',
        _insurer:'',
        _irs:''
    };
   
    static async getInitialProps(props) {
        const {address}  = props.query;
        return { address};
    }

    onSubmit = async event => {
        event.preventDefault();

        const bank = Bank(this.props.address);        
        const { address, _purchasePrice, _term, _interest, _loanAmount, _annualTax, _annualInsurance, _monthlyPi, _monthlyTax, _monthlyInsurance, _addressOfProperty, _mortgageHolder, _insurer, _irs } = this.state;
        this.setState({loading: true, errorMessage: ''})
        try {
            const accounts = await web3.eth.getAccounts();                    
            await bank.methods.submitLoan(
                _addressOfProperty,
                _purchasePrice,
                _term,
                _interest,
                _loanAmount,
                _annualTax,
                _annualInsurance, 
                _monthlyPi,
                _monthlyTax,
                _monthlyInsurance,
                _mortgageHolder,
                _insurer,
                _irs).send({from:accounts[0], gas:1000000});
            Router.pushRoute(`/bank/${this.props.address}/loan/show`);
        } catch (err) {
        this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Layout>
                    <Segment style={{ marginTop: '50px' }}>
                        <h2>Bank Loan System</h2>
                        <Divider section /> 
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                            <Form.Field>  
                            <label>
                            PurchasePrice
                            </label>  
                                <Input value={this.state._purchasePrice}  
                                    onChange= {event =>
                                    this.setState({ _purchasePrice: event.target.value}) }
                            />
                            </Form.Field> 
                            <Form.Field>                               
                            <label>
                            Term
                            </label>  
                                <Input value={this.state._term}  
                                    onChange= {event =>
                                    this.setState({ _term: event.target.value}) }
                            />
                            </Form.Field> 
                            <Form.Field>  
                            
                            <label>
                            Interest
                            </label>  
                                <Input value={this.state._interest}  
                                    onChange= {event =>
                                    this.setState({ _interest: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>  
                            
                            <label>
                            LoanAmount
                            </label>  
                                <Input value={this.state._loanAmount}  
                                    onChange= {event =>
                                    this.setState({ _loanAmount: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>  
                            
                            <label>
                            AnnualTax
                            </label>  
                                <Input value={this.state._annualTax}  
                                    onChange= {event =>
                                    this.setState({ _annualTax: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>  
                            
                            <label>
                            AnnualInsurance
                            </label>  
                                <Input value={this.state._annualInsurance}  
                                    onChange= {event =>
                                    this.setState({ _annualInsurance: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>  
                            
                            <label>
                            MonthlyPi
                            </label>  
                                <Input value={this.state._monthlyPi}  
                                    onChange= {event =>
                                    this.setState({ _monthlyPi: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>  
                            
                            <label>
                            MonthlyTax
                            </label>  
                                <Input value={this.state._monthlyTax}  
                                    onChange= {event =>
                                    this.setState({ _monthlyTax: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>
                            <label>
                            MonthlyInsurance
                            </label>  
                                <Input value={this.state._monthlyInsurance}  
                                    onChange= {event =>
                                    this.setState({ _monthlyInsurance: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>
                            <label>
                                AddressOfProperty
                            </label>  
                                <Input value={this.state._addressOfProperty}  
                                    onChange= {event =>
                                    this.setState({ _addressOfProperty: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>
                            <label>
                            MortgageHolder
                            </label>  
                                <Input value={this.state._mortgageHolder}  
                                    onChange= {event =>
                                    this.setState({ _mortgageHolder: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>
                            <label>                        
                            Insurer
                            </label>  
                                <Input value={this.state._insurer}  
                                    onChange= {event =>
                                    this.setState({ _insurer: event.target.value}) }
                            />
                            </Form.Field>  
                            <Form.Field>
                            <label>                        
                            Irs
                            </label>  
                                <Input value={this.state._irs}  
                                    onChange= {event =>
                                    this.setState({ _irs: event.target.value}) }
                            />
                            </Form.Field>  
                            <Message error header="Oops" content={this.state.errorMessage} />                            
                            <Button primary loading={this.state.loading } > Create </Button> 
                    </Form>      
                    </Segment>
                </Layout>
            </MuiThemeProvider>
        );
    }
}

export default BankNew;
