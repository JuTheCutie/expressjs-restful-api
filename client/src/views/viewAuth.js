import React, { Component } from 'react'

class viewAuth extends Component {
    render() {

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

                            <button type="submit">Login</button>

                        </form>
                    </div>
                    <div className="landingAria">
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
                        dssasas
                    </div>
                </div>
            )

        }

    }
}

export default viewAuth
