import { makeAutoObservable } from 'mobx'


class AppBarStore {

    isAuthorized = false

    constructor() {
        makeAutoObservable(this)
    }

    authorize = () => {
        this.isAuthorized = true
    }

    logout = () => this.isAuthorized = false
}


export default AppBarStore

