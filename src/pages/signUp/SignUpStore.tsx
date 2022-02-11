import { makeAutoObservable } from 'mobx'


class SignUpStore {

    constructor() {
        makeAutoObservable(this)
    }
}