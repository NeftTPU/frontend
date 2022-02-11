import MainStore from '../pages/main/MainStore'
import AppBarStore from '../components/appbar/AppBarStore'


export class RootStore {
    readonly mainStore = new MainStore()
    readonly appBarStore = new AppBarStore()
}


const rootStore = new RootStore()
export default rootStore