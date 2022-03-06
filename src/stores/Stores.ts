import MainStore from '../pages/main/MainStore'
import AppBarStore from '../components/appbar/AppBarStore'
import AuthStore from '../pages/auth/AuthStore'
import SignUpStore from '../pages/signUp/SignUpStore'
import ResetPasswordStore from '../pages/resetPassword/ResetPasswordStore'


export class Stores {
    readonly main = new MainStore()
    readonly appBar = new AppBarStore()
    readonly auth = new AuthStore()
    readonly signUp = new SignUpStore()
    readonly resetPassword = new ResetPasswordStore()
}


const rootStore = new Stores()
export default rootStore