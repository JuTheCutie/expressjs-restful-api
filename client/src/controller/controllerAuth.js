const api = require('../api');

class Auth {

    constructor() {
        this.isLoggedIn = false;
    }

    login(email,password,cb) {
        fetch(`${apiDomain.domain}/auth/login`, {
            method: 'POST',
            headers: api.headers,
            body: { email: email, password: password }
        })
        .then(response => response.json())
        .then(data => {
            this.isLoggedIn = true;
            cb(null, data);
        })
        .catch(error => {
            this.isLoggedIn = false;
            cb(error, null);
        });
    }

    logout(cb) {
        this.isLoggedIn = false;
        cb();
    }

    getIsLoggedIn() {
        fetch(`${apiDomain.domain}/auth/isloggedin`, {
            method: 'GET',
            headers: api.headers
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 403) {
                this.isLoggedIn = false;
                return this.isLoggedIn;
            } else {
                this.isLoggedIn = true;
                return this.isLoggedIn;  
            }
        })
        .catch(error => {
            console.log(error);
            this.isLoggedIn = false;
            return this.isLoggedIn;
        });
    }

}

export default new Auth();