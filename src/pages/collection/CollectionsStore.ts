import { makeAutoObservable, runInAction } from 'mobx'
import { http } from '../../utils/http'
import { COLLECTION_URL } from '../../utils/consts'
import { plainToInstance } from 'class-transformer'
import { Collection } from '../../entities/Collection'
import { TokenStore } from '../../stores/TokenStore'
import CollectionDialogStore from './CollectionDialogStore'


class CollectionsStore {

    collections: Collection[] = []

    constructor(
        private readonly tokenStore: TokenStore,
        private readonly dialogStore: CollectionDialogStore,
    ) {
        makeAutoObservable(this)
    }

    open(collectionId: number) {
        void this.dialogStore.setCollectionAndOpenDialog(collectionId)
    }

    async getCollections() {
        if (!this.tokenStore.hasToken) {
            return
        }
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
