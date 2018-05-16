import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { Link } from "../routes";


export default () => {
     return (
        <Header as='h3' block style={{ marginTop: '10px' }}>
        <Button>
        <Link route='/'>
            <a>
                Home
            </a>
        </Link>
        </Button>
      </Header>
     )
}