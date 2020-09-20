import React, { Component } from 'react';

import { Redirect, withRouter } from 'react-router-dom';

import auth from '../controller/controllerAuth';

class viewMain extends Component {
    render() {
        
        const { history } = this.props;

        if (auth.getIsLoggedIn()) {
            return (
                <div>
                    Protected Main Page
                    <button onClick={() => {
                        auth.logout(() => {
                            history.push('/');
                        });
                    }}>
                    Logout
                    </button>
                </div>
            )
        } else {
            return <Redirect to="/" />
        }

    }
}

export default withRouter(viewMain);
