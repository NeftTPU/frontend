import { Expose, Type } from 'class-transformer'


export class Token {
    @Expose()
    token: string

    @Expose()
    @Type(() => Date)
    expiry?: Date
}
