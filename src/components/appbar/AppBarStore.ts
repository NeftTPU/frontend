import { makeAutoObservable } from 'mobx'
import { TokenStore } from '../../stores/TokenStore'


class AppBarStore {

    isAuthorized

    constructor(private tokenStore: TokenStore) {
        makeAutoObservable(this)
        this.isAuthorized = tokenStore.hasToken
    }

    authorize = () => {
        this.isAuthorized = true
    }

    logout = () => {
        this.isAuthorized = false
    }
}


export default AppBarStore

