import { observable, action, makeObservable } from 'mobx';
class UserStore {
    jwt = undefined;
    username = undefined;
    isLogin = false;
    constructor() {
        this.jwt = localStorage.getItem('jwtToken')
        this.username = localStorage.getItem('username')
        this.isLogin = !!this.jwt;
        makeObservable(this, {
            jwt: observable,
            username: observable,
            isLogin: observable,
            login: action,
            logout: action,
        });
    }
    login(jwt, username) {
        this.jwt = jwt;
        this.username = username;
        this.isLogin = !!jwt;
    }


    logout() {
        localStorage.removeItem('jwtToken');
        this.jwt = undefined;
        this.username = undefined;
        localStorage.removeItem('jwtToken');
    }
}

const userStore = new UserStore();

export default userStore;
