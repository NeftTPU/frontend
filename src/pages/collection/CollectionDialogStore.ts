import { action, makeAutoObservable, observable, runInAction } from 'mobx'
import { http } from '../../utils/http'
import { COLLECTION_URL } from '../../utils/consts'
import { plainToInstance } from 'class-transformer'
import { isInt } from 'class-validator'
import { CollectionWithImage } from '../../entities/CollectionWithImage'


class CollectionDialogStore {

    open = false
    collection: CollectionWithImage | undefined = undefined

    constructor() {
        makeAutoObservable(this, {
            collection: observable,
            closeDialog: action.bound
        })
    }

    openDialog() {
        this.open = true
    }

    closeDialog() {
        this.open = false
    }

    async setCollectionAndOpenDialog(collectionId: number) {
        if (!isInt(collectionId)) {
            return
        }
        try {
            let { data } = await http.get<CollectionWithImage>(COLLECTION_URL + collectionId)
            runInAction(() => {
                console.log(data)
                this.collection = plainToInstance(CollectionWithImage, data, { excludeExtraneousValues: true })
                this.openDialog()
            })
        } catch (e) {
            runInAction(() => {
                console.error(e)
            })
        }
    }
}


export default CollectionDialogStore
