import { makeAutoObservable } from 'mobx'
import Stores from '../../stores/Stores'


class AuthStore {

    email = ''
    password = ''

    constructor() {
        makeAutoObservable(this)
    }

    updateEmail = (email: string): void => {
        this.email = email
    }

    updatePassword = (password: string): void => {
        this.password = password
    }

    signIn = (): void => {
        if (this.email === 'admin@ggnft.box' && this.password === 'root') {
            Stores.appBar.authorize()
        }
    }

}

export default AuthStore