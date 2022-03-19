import { Token } from '../entities/Token'
import { makeAutoObservable } from 'mobx'


export class TokenStore {
    token?: Token

    constructor() {
        makeAutoObservable(this)
    }

    updateToken(token: Token) {
        localStorage.setItem('accessToken', token.token)
        this.token = token
    }
}
