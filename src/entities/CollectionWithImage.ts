import { Expose, Type } from 'class-transformer'


export class CollectionWithImage {
    @Expose()
    @Type(() => Number)
    id: number

    @Expose()
    title: string

    @Expose()
    @Type(() => Date)
    date_created: Date

    @Expose()
    @Type(() => CollectionImage)
    images: CollectionImage[]
}


export class CollectionImage {
    @Expose()
    id: number

    @Expose()
    file: string
}
