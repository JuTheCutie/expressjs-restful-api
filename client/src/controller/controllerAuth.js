class Auth {

    constructor() {
        this.isLoggedIn = false;
    }

    login(cb) {
        this.isLoggedIn = true;
        cb();
    }

    logout(cb) {
        this.isLoggedIn = false;
        cb();
    }

    getIsLoggedIn() {
        return this.isLoggedIn;
    }

}

export default new Auth();