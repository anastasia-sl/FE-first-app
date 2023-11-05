import { observable, action, makeObservable } from 'mobx';
class UserStore {
    jwt = undefined;
    username = undefined;
    isLogin = false;
    feedbackIsSent = false;
    constructor() {
        this.jwt = localStorage.getItem('jwtToken')
        this.username = localStorage.getItem('username')
        this.isLogin = !!this.jwt;
        this.feedbackIsSent = !!sessionStorage.getItem('message') && !!sessionStorage.getItem('feedbackType');
        makeObservable(this, {
            jwt: observable,
            username: observable,
            isLogin: observable,
            feedbackIsSent: observable,
            login: action,
            feedbackSent: action,
            logout: action,
        });
    }
    login(jwt, username) {
        this.jwt = jwt;
        this.username = username;
        this.isLogin = !!jwt && !!username;
    }

    feedbackSent(message, feedbackType) {
        this.message = message;
        this.feedbackType = feedbackType;
        this.feedbackIsSent = !!message && !!feedbackType;
    }

    logout() {
        this.jwt = undefined;
        this.username = undefined;
    }
}

const userStore = new UserStore();

export default userStore;
