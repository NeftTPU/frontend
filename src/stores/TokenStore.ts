import { Token } from '../entities/Token'
import { makeAutoObservable } from 'mobx'
import { plainToInstance } from 'class-transformer'


export class TokenStore {
    token?: Token

    constructor() {
        makeAutoObservable(this)
        const expiry = localStorage.getItem('expiry')
        if (expiry) {
            const expDate = new Date(expiry)
            const today = new Date()
            if (today < expDate) {
                const accessToken = localStorage.getItem('accessToken')
                if (accessToken) {
                    this.token = plainToInstance(Token, { token: accessToken, expiry: expDate })
                }
            } else {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('expiry')
            }
        }
    }

    updateToken(token: Token) {
        localStorage.setItem('accessToken', token.token)
        const expiry = token.expiry
        if (expiry) {
            localStorage.setItem('expiry', expiry.toString())
        }
        this.token = token
    }

    clearToken() {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('expiry')
        this.token = undefined
    }

    get hasToken(): boolean {
        return !!this.token
    }
}
