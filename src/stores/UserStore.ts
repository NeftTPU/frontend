import { User } from '../entities/User'
import { makeAutoObservable, runInAction } from 'mobx'
import { http } from '../utils/http'
import { REGISTER_URL } from '../utils/consts'
import { plainToInstance } from 'class-transformer'


export class UserStore {
    user?: User

    constructor() {
        makeAutoObservable(this)
        void this.getUser()
    }

    updateUser(user: User) {
        this.user = user
    }

    private async getUser() {
        if (!localStorage.getItem('accessToken')) {
            return
        }
        try {
            const data = await http.get<User>(REGISTER_URL)
            runInAction(() => {
                this.user = plainToInstance(User, data.data, { excludeExtraneousValues: true })
            })
        } catch (e) {
            runInAction(() => {
                console.error(e)
            })
        }
    }
}
