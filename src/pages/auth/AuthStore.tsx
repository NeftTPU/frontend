import { makeAutoObservable, runInAction } from 'mobx'
import stores from '../../stores/Stores'
import { LOGIN_URL } from '../../utils/consts'
import { plainToInstance } from 'class-transformer'
import { Token } from '../../entities/Token'
import { Status } from '../../utils/enums'
import { http } from '../../utils/http'


class AuthStore {

    login = ''
    password = ''
    status: Status = 'none'

    constructor() {
        makeAutoObservable(this)
    }

    updateLogin = (login: string): void => {
        this.login = login
    }

    updatePassword = (password: string): void => {
        this.password = password
    }

    async auth() {
        this.status = 'pending'
        const authDto = {
            username: this.login,
            password: this.password,
        }

        try {
            const data = await http.post<Token>(LOGIN_URL, authDto)
            console.log(data)
            runInAction(() => {
                const t = plainToInstance(Token, data.data, { excludeExtraneousValues: true })
                stores.token.updateToken(t)
                stores.appBar.authorize()
                this.status = 'success'
            })
        } catch (e) {
            runInAction(() => {
                alert('Ошибка авторизации')
                console.error(e)
                this.status = 'error'
            })
        }
    }
}


export default AuthStore
