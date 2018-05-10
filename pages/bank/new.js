import React, {Component} from 'react';
import { Input, Segment, Divider, Form, Button } from  'semantic-ui-react';
import factory from '../../ethereum/factory';
import Layout from '../../components/Layout';
import { Link } from "../../routes";
import DatePicker from 'material-ui/DatePicker';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class BankNew extends Component{
    
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <Layout>
                    <Segment style={{ marginTop: '50px' }}>
                        <h2>Bank Loan Systems</h2>
                        <Divider section /> 
                    <Form>
                        <Form.Field>    
                            <Input focus placeholder='Amount' />
                        </Form.Field>  
                        <Form.Field>                 
                        <DatePicker
                            hintText="Approved Date Input"
                        />
                        </Form.Field>    
                    </Form>   
                    <Link route='/bank/new/' >   
                                <a>         
                                    <Button content='Request Money' style={{ marginTop: '15px' }} receive secondry/>
                                </a>    
                            </Link>     
                    </Segment>
                </Layout>
            </MuiThemeProvider>
        );
    }
}

export default BankNew;