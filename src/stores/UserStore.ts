import { User } from '../entities/User'
import { makeAutoObservable, runInAction } from 'mobx'
import { http } from '../utils/http'
import { AUTH_USER_URL } from '../utils/consts'
import { plainToInstance } from 'class-transformer'
import { TokenStore } from './TokenStore'


export class UserStore {
    user?: User

    constructor(private tokenStore: TokenStore) {
        makeAutoObservable(this)
        void this.getUser()
    }

    updateUser(user: User) {
        this.user = user
    }

    private async getUser() {
        if (!this.tokenStore.hasToken) {
            return
        }
        try {
            const data = await http.get<User>(AUTH_USER_URL)
            runInAction(() => {
                console.log(data.data)
                this.user = plainToInstance(User, data.data, { excludeExtraneousValues: true })
            })
        } catch (e) {
            runInAction(() => {
                console.error(e)
            })
        }
    }
}
