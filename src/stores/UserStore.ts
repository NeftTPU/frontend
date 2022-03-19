import { User } from '../entities/User'
import { makeAutoObservable } from 'mobx'


export class UserStore {
    user?: User

    constructor() {
        makeAutoObservable(this)
    }

    updateUser(user: User) {
        console.log(user, 'asdsad')
        this.user = user
    }
}
