import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import auth from '../controller/controllerAuth';

class viewAuth extends Component {
    render() {

        const { history } = this.props;

        if (this.props.auth === "login") {

            return (
                <div>
                    <div className="auth">
                        <form className="form-group">
                            <h1>Login</h1>

                            <label for="email">E-mail</label>
                            <input type="email" className="form-control" id="email" />

                            <label for="password">Password</label>
                            <input type="password" className="form-control" id="password" />

                            <button type="submit"
                            onClick={() => {
                                auth.login(() => {
                                    history.push('/app');
                                });
                            }
                            }>Login</button>

                        </form>
                    </div>
                    <div className="landingArea">
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            )

        } else {

            return (
                <div>
                    <div>
                        <div className="auth">
                            <form className="form-group">
                                <h1>Register</h1>

                                <label for="email">E-mail</label>
                                <input type="email" className="form-control" id="email" />

                                <label for="password">Password</label>
                                <input type="password" className="form-control" id="password" />

                                <button type="submit">Register</button>

                            </form>
                        </div>
                    </div>
                    <div className="landingArea">
                        <Link to="/login">login</Link>
                    </div>
                </div>
            )

        }

    }
}

export default withRouter(viewAuth);
