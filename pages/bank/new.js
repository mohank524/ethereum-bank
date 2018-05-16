import React, {Component} from 'react';
import { Input, Segment, Divider, Form, Button } from  'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from "../../routes";
import DateTimePicker from 'material-ui/DatePicker';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import web3 from '../../ethereum/web3';


class BankNew extends Component {
    
    state = {
        amount: '',
        address: '',
        date: '',
        errorMessage:''
    };
   
    handleChange= (event, date) => {
       this.setState({ date: date})
      }
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address};
    }
    componentDidMount() {
        const accounts = web3.eth.getAccounts();
        const dataSet  = Promise.resolve(accounts);
        dataSet.then((values) => { 
            this.setState({ address: values});
        }); 
    }

    onSubmit = async event => {
        event.preventDefault();
        const { amount, address, date } = this.state;
        
        try {
            console.log(this.state);
            await bank.methods.newloan(
                web3.utils.toWei(amount, 'ether'),
                date 
            ).send({from:accounts[0]})
            Router.pushRoute(`/`);
        } catch (err) {
        this.setState({errorMessage: "err.message"});
        }
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Layout>
                    <Segment style={{ marginTop: '50px' }}>
                        <h2>Bank Loan System</h2>
                        <Divider section /> 
                    <Form onSubmit={this.onSubmit}>
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
                        <Input value={this.state.address}/>
                        </Form.Field> 
                              
                        <DateTimePicker
                            hintText="Controlled Date Input"
                            value={this.state.date}
                            onChange={this.handleChange}
                        />
                        <Button primary loading={this.state.loading } >Create </Button> 
                    </Form>   
   
                    </Segment>
                </Layout>
            </MuiThemeProvider>
        );
    }
}

export default BankNew;
