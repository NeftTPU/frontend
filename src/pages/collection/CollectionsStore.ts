import { makeAutoObservable } from 'mobx'


export interface Collection {
    id: string
    name: string
}


class CollectionsStore {

    collections: Collection[] = [
        {
            id: '1',
            name: 'Коллекция 1',
        },
        {
            id: '2',
            name: 'Коллекция 2',
        },
    ]

    constructor() {
        makeAutoObservable(this)
    }

    remove = (id: string): void => {
        this.collections = this.collections.filter((v) => v.id !== id)
    }

    add = (collection: Collection): void => {
        this.collections.push(collection)
    }

}


export default CollectionsStore
