import React, {Component} from 'react';
import { Button, Divider, Segment  } from  'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from "../routes";


class BankIndex extends Component{
    
    render() {
        return (
        <Layout>
            <Segment style={{ marginTop: '50px' }}>
                <h2>Bank Loan System</h2>
                <Divider section /> 
                <div>
                    <Link route='/bank/show/'>
                        <a>
                            <Button content='Send Money' primary/>
                        </a>
                    </Link>
                    <Link route='/bank/new/'>   
                        <a>         
                            <Button content='Receive Money' receive style={{ marginLeft: '10px' }} secondry/>
                        </a>    
                    </Link>    
                </div>
            </Segment>
        </Layout>
        );
    }
}

export default BankIndex;
