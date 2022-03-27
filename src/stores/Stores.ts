import MainStore from '../pages/main/MainStore'
import AppBarStore from '../components/appbar/AppBarStore'
import AuthStore from '../pages/auth/AuthStore'
import SignUpStore from '../pages/signUp/SignUpStore'
import ResetPasswordStore from '../pages/resetPassword/ResetPasswordStore'
import CollectionsStore from '../pages/collection/CollectionsStore'
import { UserStore } from './UserStore'
import { TokenStore } from './TokenStore'


class Stores {
    readonly main = new MainStore()
    readonly token = new TokenStore()
    readonly user = new UserStore(this.token)
    readonly appBar = new AppBarStore(this.token)
    readonly auth = new AuthStore()
    readonly signUp = new SignUpStore()
    readonly resetPassword = new ResetPasswordStore()
    readonly collections = new CollectionsStore(this.token)
}


const stores = new Stores()
export default stores
