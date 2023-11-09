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
    login(jwt) {
        this.jwt = jwt;
        this.isLogin = !!jwt;
    }


    logout() {
        localStorage.removeItem('jwtToken');
        this.jwt = undefined;
        this.username = undefined;
    }
}

const userStore = new UserStore();

export default userStore;
