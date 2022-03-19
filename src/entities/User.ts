import { Expose } from 'class-transformer'


export class User {
    @Expose()
    email: string
    @Expose()
    id: number
    @Expose()
    username: string
}
