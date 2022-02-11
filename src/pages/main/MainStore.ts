import { makeAutoObservable } from 'mobx'


class MainStore {

    constructor() {
        makeAutoObservable(this)
    }
}


export default MainStore
