import { Expose, Type } from 'class-transformer'


export class Collection {
    @Expose()
    id: string

    @Expose()
    title: string

    @Expose()
    is_generated: boolean

    @Expose()
    @Type(() => Date)
    date_created: Date
}
