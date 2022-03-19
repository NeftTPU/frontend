import { makeAutoObservable, runInAction } from 'mobx'
import { REGISTER_URL } from '../../utils/consts'
import { User } from '../../entities/User'
import { Token } from '../../entities/Token'
import { plainToInstance } from 'class-transformer'
import stores from '../../stores/Stores'
import { Status } from '../../utils/enums'
import { http } from '../../utils/http'


class SignUpStore {

    login = ''
    email = ''
    password = ''
    repeatPassword = ''

    status: Status = 'none'

    constructor() {
        makeAutoObservable(this)
    }

    async register() {
        this.status = 'pending'
        const registerDto = {
            email: this.email,
            username: this.login,
            password: this.password,
        }
        try {
            const data = await http.post<User & Token>(REGISTER_URL, registerDto)
            runInAction(() => {
                const u = plainToInstance(User, data.data, { excludeExtraneousValues: true })
                const t = plainToInstance(Token, data.data, { excludeExtraneousValues: true })

                stores.user.updateUser(u)
                stores.token.updateToken(t)

                this.status = 'success'
            })
        } catch (e) {
            runInAction(() => {
                this.status = 'error'
                console.error(e)
            })
        }
    }

    updateLogin = (login: string): void => {
        this.login = login
    }

    updateEmail = (email: string): void => {
        this.email = email
    }

    updatePassword = (password: string): void => {
        this.password = password
    }

    updateRepeatPassword = (repeatPassword: string): void => {
        this.repeatPassword = repeatPassword
    }

}


export default SignUpStore
