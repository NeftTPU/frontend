import { makeAutoObservable, runInAction } from 'mobx'
import { http } from '../../utils/http'
import { COLLECTION_URL } from '../../utils/consts'
import { plainToInstance } from 'class-transformer'
import { Collection } from '../../entities/Collection'
import { TokenStore } from '../../stores/TokenStore'


class CollectionsStore {

    collections: Collection[] = []

    constructor(private readonly tokenStore: TokenStore) {
        makeAutoObservable(this)
        void this.getCollections()
    }

    private async getCollections() {
        console.log('101010')
        if (!this.tokenStore.hasToken) {
            return
        }
        console.log('202')
        try {
            let { data } = await http.get<Collection[]>(COLLECTION_URL)
            runInAction(() => {
                data = data.filter((x) => x.is_generated)
                console.log(data)
                this.collections = plainToInstance(Collection, data, { excludeExtraneousValues: true })
            })
        } catch (e) {
            runInAction(() => {
                console.error(e)
            })
        }
    }

}


export default CollectionsStore
