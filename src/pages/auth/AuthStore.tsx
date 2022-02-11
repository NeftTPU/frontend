import { makeAutoObservable } from 'mobx'


class AuthStore {

    constructor() {
        makeAutoObservable(this)
    }

}